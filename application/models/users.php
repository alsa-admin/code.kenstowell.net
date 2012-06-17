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
	public function add_user($username, $display_name, $email, $password, $avatar, $reason, $bio)
	{
		if($this->get_user_by_name($username) == null) {

			$row = $this->createRow();

			if($row) {
				$row->name = $username;
				$row->display_name = $display_name;
				$row->email_address = $email;
				$row->password = md5($password);
				$row->avatar_url = $avatar;
				$row->reason = $reason;
				$row->bio = $bio;
				$row->role = 'user';
				$row->save();

				return 'user successfully created';
			}
		} else {
			return false;
		}
	}

/* ----------------------------------------
 * READ METHODS
 * ----------------------------------------
 */

	/**
	 *  DOES USER EXIST
	 *  @desc: simple truthy/falsy check to see if a db entry with that user exists
	 *  @return: $result
	 */
	public function get_user_by_name($name)
	{
		$row = $this->select()->from('users')->where('name = ?', $name);
		$query = $row->query();
		$obj = $query->fetchObject();
		$result = $obj->name;
		return $result;
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

	/**
	 * GET USER EMAIL
	 * @desc: get the provided user's email
	 * @param $name
	 * @return mixed
	 */
	public function get_user_by_email($name)
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

	/**
	 * GET USER BIO
	 *
	 * @desc: get the user's bio.
	 * @param $name
	 * @return mixed
	 */
	public function get_user_bio($name)
	{
		//build the query
		$row = $this->select()->from('users')->where('name = ?', $name);

		//execute the query
		$query = $row->query();
		$obj = $query->fetchObject();
		$result = $obj->bio;

		return $result;
	}
}

