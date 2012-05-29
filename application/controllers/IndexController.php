<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
    }

    public function indexAction()
    {

    }

    public function homeAction()
    {
		$this->_helper->layout->disableLayout();
    }


}



