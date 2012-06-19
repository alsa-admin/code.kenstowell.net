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
	 */
    public function signUpAction()
    {
		//disable layout
		$this->_helper->layout()->disableLayout();

		$data = $_POST;

		$user_model = new Model_Users();
		$new_user = $user_model->add_user($data['username'], $data['display_name'], $data['email'], $data['password'], $data['avatar'], $data['reason'], $data['bio']);

		echo json_encode($new_user);

    }

	/**
	 * CHECK AVAILABILITY
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
	 *
	 */
	public function recoverLoginAction($type)
	{
		$user_model = new Model_Users();

		if($type == 'username') {
			$email = $_POST['email'];
			$username = $user_model->get_complete_user_info('email', $email);
			json_encode($username);

		}
	}

	public function sendEmail($email, $data)
	{

	}
}









