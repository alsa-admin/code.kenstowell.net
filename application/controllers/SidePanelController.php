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
     *
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
		$authAdapter->setCredential($data['password']);

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
	 */
    public function logoutAction()
    {
        $auth = Zend_Auth::getInstance();
		if($auth->clearIdentity()) {
			echo json_encode('success');
		} else {
			echo json_encode('failed');
		}
    }


}







