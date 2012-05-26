<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
		$this->view->headLink()->appendStylesheet('/styles/index/styles.css');
		$this->view->headScript()->appendFile('/scripts/index/scripts.js');
    }

    public function indexAction()
    {
        // action body
    }


}

