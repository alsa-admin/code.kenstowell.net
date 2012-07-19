<?php

class SidePanelController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
		//so it doesn't mess with the ajax stuff
		$this->_helper->layout()->disableLayout();
    }

    /**
     * LOGIN
     *
	 * @desc: uses Zend_Auth to check login information with information contained in the users table.
	 *
     */
    public function loginAction()
    {
		//so it doesn't mess with the ajax stuff
		$this->_helper->layout()->disableLayout();

		//data from
		$data = $_POST;

		//set up auth adapter
		$db = Zend_Db_Table::getDefaultAdapter();
		$authAdapter = new Zend_Auth_Adapter_DbTable($db, 'users', 'name', 'password');
		$authAdapter->setIdentity($data['user']);
		$authAdapter->setCredential(md5($data['password']));

		//authenticate
		$result = $authAdapter->authenticate();
		if($result->isValid()){
			$auth = Zend_Auth::getInstance();
			$storage = $auth->getStorage();
			$storage->write($authAdapter->getResultRowObject(
				array('name', 'role')));

			$user = $auth->getStorage()->read();
			//If the requesting url in the admin/login section
			if($user->role === 'admin'){
				echo json_encode('admin');
			} elseif ($user->role === 'user') {
				echo json_encode('user');
			} else {
				echo json_encode('guest');
			}
		} else {
			echo json_encode("couldn't log in");
		}
    }

    /**
     * LOGOUT
     *
	 * @desc: clears a user's session.
     */
    public function logoutAction()
    {
		$this->_helper->layout()->disableLayout();

        $auth = Zend_Auth::getInstance();
		$auth->clearIdentity();

		if ($auth->hasIdentity()) {
			echo json_encode(false);
		} else {
			echo json_encode(true);
		}
    }

	/**
	 * SIGN UP
	 *
	 * @desc: creates a row in the users table.
	 */
    public function signUpAction()
    {
		//disable layout
		$this->_helper->layout()->disableLayout();

		//Request Params
		$data = $_POST;

		$user_model = new Model_Users();
		//create the user
		$new_user = $user_model->add_user($data['username'], $data['display_name'], $data['email'], $data['password'], $data['avatar'], $data['reason'], $data['bio']);

		if($new_user) {

			$auth_model = new Model_Auth();

			$user_id = $user_model->get_complete_user_info('email_address', $data['email']);

			// build the token
			$num = md5(rand(0, 999999));
			$token = $auth_model->create_token($num, $user_id[0]['id']);

			$build_email = new Language_Email();
			$email_content = $build_email->new_user($data['email'], $num, $user_id[0]['id'], $type='new_user');
			$email_subject = "Kenstowell.net User Account Creation";
			$send_mail = $this->sendEmail($email_content, $email_subject, $data['email']);

			echo json_encode(true);
		} else {
			echo json_encode(false);
		}
    }

	/**
	 * CHECK AVAILABILITY
	 *
	 * @desc: Checks the username avaiability when the user focuses out of th eusername box.
	 */
    public function checkAvailabilityAction()
    {
        $this->_helper->layout()->disableLayout();

		$data = $_POST;
		$user_model = new Model_Users();
		$name = $user_model->get_user_by_name($data['username']);

		if ($name == null) {
			echo json_encode(true);
		} else {
			echo json_encode(false);
		}

    }

	/**
	 * RECOVER LOGIN
	 *
	 * @desc: Method for email user with applicable data upon request.
	 */
	public function recoverLoginAction()
	{
		$this->_helper->layout()->disableLayout();

		$data = $_POST;
		$user_model = new Model_Users();
		$auth_model = new Model_Auth();

		if($data['type']== 'username') {

			$email = $_POST['email'];
			$username = $user_model->get_complete_user_info('email_address', $email);

			$build_email = new Language_Email();
			$email_content = $build_email->forgot_username_email($email, $username[0]['name']);
			$email_subject = "Kenstowell.net username Recovery";

			$send_mail = $this->sendEmail($email_content, $email_subject, $username[0]['email_address']);

			//TODO: implement true/false return statements
		} else {
			//user info
			$email = $_POST['email'];
			$username = $user_model->get_complete_user_info('email_address', $email);
			$user_id = $user_model->get_complete_user_info('email_address', $email);

			// build the token
			$num = md5(rand(0, 999999));
			$token = $auth_model->create_token($num, $user_id[0]['id']);

			if($token) {
				$build_email = new Language_Email();
				$email_content = $build_email->forgot_password_email($email, $num, $user_id[0]['id'], $type='password');
				$email_subject = "Kenstowell.net Password Recovery";
				$send_mail = $this->sendEmail($email_content, $email_subject, $username[0]['email_address']);
				//TODO: implement true/false return statements
			} else {
				echo json_encode(false);
			}
		}
	}

	/**
	 * SEND EMAIL
	 *
	 * @desc: Builds and sends an email for login recovery purposes.
	 * @param $email
	 * @param $name
	 */
	public function sendEmail($email_content, $email_subject, $email)
	{
		//Send to Sunny Rose emil
		$mail = new Zend_Mail();

		//Set up smtp params
		$config = array(
			'auth'       =>  'login',
			'ssl'		 =>	 'ssl',
			'port'       =>  '465',
			'username'   =>  'stowell.kt@gmail.com',
			'password'   =>  'Koohoy0x'
		);

		//Set up transport
		$transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);

		$mail->setBodyHtml($email_content);
		$mail->setSubject($email_subject)
			->addTo($email);
		$mail->setFrom('Kenstowell.net', 'Ken Stowell');
		$mail->setReplyTo('ktstowell@kenstowell.net');
		$mail->send($transport);

	}

	/**
	 * CONFIRM PASSWORD
	 */
	public function confirmPasswordAction()
	{
		$this->_helper->layout()->disableLayout();
		$user_model = new Model_Users();

		$password = md5($_POST['password']);

		$query = $user_model->get_user_password_by_name($_POST['name']);

		if ($query === $password ) {
			echo json_encode(true);
		} else {
			echo json_encode(false);
		}

	}

	/**
	 * UPDATE PASSWORD
	 */
	public function updatePasswordAction()
	{
		$this->_helper->layout()->disableLayout();

		$param = $this->_request->getParams();

		$user_model = new Model_Users();
		$auth_model = new Model_Auth();

		$update_password = $user_model->update_password($_POST['id'], $_POST['new_password']);

		if($update_password) {
			$delete_token = $auth_model->delete_row_by_token($_POST['token']);

			if($delete_token) {
				echo json_encode(true);
			} else {
				echo json_encode(false);
			}
		}
	}

	/**
	 * UPDATE USER INFO
	 */
	public function updateUserInfoAction()
	{
		$this->_helper->layout()->disableLayout();

		//user model
		$user_model = new Model_Users();

		$data = array(
			'name'       	=> $_POST['name'],
			'display_name'	=> $_POST['display_name'],
			'email_address' => $_POST['email_address'],
			'password'		=> $_POST['password'],
			'avatar_url'	=> $_POST['avatar_url'],
			'bio'			=> $_POST['bio']
		);

		//insert new values - return true is successful - return old values if not.
		$update = $user_model->update_user_info($_POST['credential'], $data);
		if($update[0] == true) {
			echo json_encode($update);
		} else {
			echo json_encode($update);
		}
	}

	/**
	 * @param $email
	 */
	public function buildAvatarUrlAction()
	{
		$this->_helper->layout()->disableLayout();

		$email = $_POST['email'];
		$default = 'http://code.kenstowell.local/images/_admin/avatar-blank.jpg';
		$size = 80;
		//form gravatar url
		$avatar_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;

		echo json_encode($avatar_url);
	}
}









