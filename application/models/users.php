<?php

class Model_Users extends Zend_Db_Table_Abstract
{
	protected $_name = 'users'; //db table name


/* ----------------------------------------
 * CREATE METHODS
 * ----------------------------------------
 */

	/**
	 *  ADD USER
	 */
	public function add_user($user, $display_name, $email, $password)
	{
		if($this->does_user_exist($user) === true)
		{

		} else {
			return "that one's been taken, laddy";
		}
	}

/* ----------------------------------------
 * READ METHODS
 * ----------------------------------------
 */

	/**
	 *  DOES USER EXIST
	 *  @desc: simple truthy/falsy check to see if a db entry with that user exists
	 */
	public function does_user_exist($user)
	{
		//query for the user name
		if($this->select()->from('users')->where('name = ?', $user))
		{
			return true;
		} else {
			return false;
		}
	}

	/**
	 * GET USER BY DISPLAY NAME
	 * @desc: gets user from Zend Auth and returns the display name
	 * @param $user_name
	 */
	public function get_user_by_display_name($name)
	{
		//form the query
		$row = $this->select()->from('users')->where('name = ?', $name);

		//execute the query
		$query = $row->query();
		$obj = $query->fetchObject();
		//grab display name column
		$result = $obj->display_name;

		//send it back to the controller
		return $result;
	}

	public function get_user_email($name)
	{
		//form the query
		$row = $this->select()->from('users')->where('name = ?', $name);

		//execute the query
		$query = $row->query();
		$obj = $query->fetchObject();
		//grab display name column
		$result = $obj->email_address;

		//send it back to the controller
		return $result;
	}
}

