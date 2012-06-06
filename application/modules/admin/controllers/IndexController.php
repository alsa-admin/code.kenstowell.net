<?php

class Admin_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
		//don't process entire layout upon request
        $this->_helper->layout()->disableLayout();

		//load the user model
		$user_model = new Model_Users();

		//now process user data is an indetity is found
		$auth = Zend_Auth::getInstance();
		if($auth->hasIdentity())
		{
			//get user name
			$user = $auth->getStorage()->read();
			$this->view->user = $user_model->get_user_by_display_name($user->name);

			//get user gravatar
			$email = $user_model->get_user_email($user->name);
			$default = 'http://code.kenstowell.local/images/_admin/avatar-blank.jpg';
			$size = 80;

			//form gravatar url
			$this->view->grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;
		}
    }

    public function loginAction()
    {
        // action body
    }


}



