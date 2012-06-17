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


}





