<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	/**
	 *
	 * @var unknown_type
	 */
	protected $_logger;

	/**
	 *
	 */
	protected function _initSession()
	{
		return Zend_Session::start();
	}

	/**
	 *
	 */
	protected function _initLogging()
	{
		$this->bootstrap('frontController');
		$logger = new Zend_Log();
		$writer = 'production' == $this->getEnvironment() ?
			new Zend_Log_Writer_Stream(APPLICATION_PATH
				.'/../docs/logs/app.log') :
			new Zend_Log_Writer_Firebug();
		$logger->addWriter($writer);

		if('production' == $this->getEnvironment()) {
			//     		$filter = new Zend_Log_Filter_Priority(Zend_Log::ERR);
			//     		$logger->addFilter($filter);
		}
		$this->_logger = $logger;
		Zend_Registry::set('log', $logger);
	}

	/**
	 *
	 */
	protected function _initAutoload()
	{
		$this->_logger->info('Bootstrap ' . __METHOD__);

		// Add autoloader empty namespace
		$autoLoader = Zend_Loader_Autoloader::getInstance();
		$autoLoader->registerNamespace('KTS_');
		$resourceLoader = new Zend_Loader_Autoloader_Resource(array(
			'basePath' => APPLICATION_PATH,
			'namespace' => '',
			'resourceTypes' => array(
				'form' => array(
					'path' => 'forms/',
					'namespace' => 'Form_'
				),
				'model' => array(
					'path' => 'models/',
					'namespace' => 'Model_'
				)
			)
		));
		// Return it so that it can be stored by the bootstrap
		return $autoLoader;
	}

	/**
	 *
	 */
	protected function _initLocale()
	{
		$this->_logger->info('Bootstrap ' . __METHOD__);

		$locale = new Zend_Locale('en_US');
		Zend_Registry::set('Zend_Locale', $locale);
	}

	/**
	 * Sets various DOM info.
	 */
	protected function _initDoctype()
	{
		$this->_logger->info('Bootstrap ' . __METHOD__);

		//init the view
		$this->bootstrap('view');
		$view = $this->getResource('view');
		$view->doctype('HTML5');

		//Set title and separator
		$view->headTitle('Ken Stowell - Visual Developer')
			->setSeparator(' | ');

		//Load global stylesheets
		$view->headLink()->appendStylesheet('/styles/styles.kenstowell.net.css')
			->headlink()->appendStylesheet('/scripts/jquery-ui-1.8.17/themes/base/jquery-ui.css');

		//Load Scripts
		$view->headScript()->appendFile('/scripts/jquery-1.7.1/jquery-1.7.1.js')
			->headScript()->appendFile('/scripts/jquery-ui-1.8.17/ui/minified/jquery-ui.min.js')
			->headScript()->appendFile('/scripts/crosshairs.js')
			->headScript()->appendFile('/scripts/scripts.kenstowell.net.js')
			->headScript()->appendFile('/scripts/epicHelp.js');
	}

	/**
	 * Sets up access control
	 */
	protected function _initAcl()
	{
		Zend_Registry::set('acl', $acl = new Zend_Acl());

		$guest_role = new Zend_Acl_role('guest');
		$admin_role = new Zend_Acl_role('admin');
		$user_role = new Zend_Acl_role('user');

		$acl->addRole($guest_role);
		$acl->addRole($user_role);
		$acl->addRole($admin_role, $guest_role);

		$acl->addResource('default:');
		$acl->addResource('admin:');
		$acl->addResource('user:');

		$acl->allow('admin','admin:');
		$acl->deny(array('guest', 'user'), 'admin:');
		$acl->allow(array('admin', 'user'),'user:');
		$acl->deny('guest', 'user:');

		// by default, the public module is allowed. Any eceptions need explicitly denied.
		$acl->allow(array('guest', 'user', 'admin'), 'default:');

		// setup FC plugin to run the check
		$acl_plugin = new KTS_Plugins_Acl($acl);
		$fc = Zend_Controller_Front::getInstance();
		$fc->registerPlugin($acl_plugin);
	}
}

