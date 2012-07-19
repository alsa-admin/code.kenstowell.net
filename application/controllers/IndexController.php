<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
    }

    public function indexAction()
    {

    }

	/**
	 * CHECK IDENTITY
	 * @desc: runs every page refresh to check if the user is logged in
	 *        to be able to process side-panel content
	 */
    public function checkIdentityAction()
    {
        $this->_helper->layout()->disableLayout();

		//check for identity
		$auth = Zend_Auth::getInstance();
		if($auth->hasIdentity()) {
			$user = $auth->getStorage()->read();
			//send different login info based on creds
			if($user->role === 'admin') {
				echo json_encode('admin');
			} elseif($user->role === 'user') {
				echo json_encode('user');
			} else {
				echo json_encode('guest');
			}
		}
    }

	/**
	 * AUTH ROUTER
	 */
	public function authRouterAction()
	{

		$user_model = new Model_Users();
		$auth_model = new Model_Auth();


		$this->view->headScript()->appendFile('/scripts/index/scripts.auth-router.js');

		$token = $this->_request->getParam('token');
		$id = $this->_request->getParam('id');
		$type = $this->_request->getParam('type');

		if($token == null) {
			$this->_helper->redirector->gotoRoute(array(
				'controller' => 'index',
				'action' => 'index'
			), null, true);
		} else {
			if ($type === 'password') {
				//check auth table to see if token exists
				$tokens = $auth_model->get_token_by_user_id($id);
				if($tokens) {
					$this->view->password_content = true;
					$this->view->token = $token;
					$this->view->id = $id;
				} else {
					$this->_helper->redirector->gotoRoute(array(
						'controller' => 'index',
						'action' => 'index'
					), null, true);
				}
			} elseif ($type === 'new_user') {
				$tokens = $auth_model->get_token_by_user_id($id);
				if($tokens) {
					$confirm = $user_model->confirm_user($id);
					if ($confirm) {
						$this->view->new_user_content = true;
						$this->view->token = $token;
						$this->view->id = $id;
						$auth_model->delete_row_by_token($token);
					}
				} else {
					$this->_helper->redirector->gotoRoute(array(
						'controller' => 'index',
						'action' => 'index'
					), null, true);
				}
			}
		}

	}
}





