<?php

class Model_Users extends Zend_Db_Table_Abstract
{
	protected $_name = 'users'; //db table name


/* ----------------------------------------
 * CREATE METHODS
 * ----------------------------------------
 */

	/**ADD USER
	 *
	 * @param $username
	 * @param $display_name
	 * @param $email
	 * @param $password
	 * @param $avatar
	 * @param $reason
	 * @param $bio
	 * @return bool
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
				$row->is_confirmed = 0;
				$row->save();

				return true;
			}
		} else {
			return false;
		}
	}

	/**
	 * CREATE TOKEN
	 *
	 * @param $token
	 * @return bool
	 */
	public function create_token($email, $token)
	{
		$response = '';

		$row = $this->fetchRow($this->select()->where('email_address = ?', $email));

		if($row){
			$row->token = $token;
			$row->save();

			$response['pass'] = true;
			$response['token'] = $token;
			return $response;
		} else {
			$response['pass'] = false;
			$response['token'] = null;
			return $response;
		}
	}

/* ----------------------------------------
 * READ METHODS
 * ----------------------------------------
 */

	/**
	 * GET COMPLETE USER INFO
	 *
	 * @param $field
	 * @param $data
	 * @return array
	 */
	public function get_complete_user_info($field, $data)
	{


		$row = $this->select()->from('users')->where($field.'= ?', $data);
		$query = $row->query();
		$data_set = $query->fetchAll();

		return $data_set;

	}

	/**
	 *  DOES USER EXIST
	 *
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
	 *
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
	 *
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

	public function get_user_avatar($name)
	{
		//form the query
		$row = $this->select()->where('name = ?', $name);

		//execute the query
		$query = $row->query();
		$obj = $query->fetchObject();
		//grab display name column
		$result = $obj->avatar_url;

		//send it back to the controller
		return $result;
	}

	/**
	 * GET USER TOKEN
	 *
	 * @desc: get the provided user's info by the auth token
	 * @param $token
	 * @return mixed
	 */
	public function get_user_data_by_token($token)
	{
		//form the query
		$row = $this->select()->from('users')->where('token = ?', $token);

		if($row) {
			//execute the query
			$query = $row->query();
			if($query) {
				$result = $query->fetchAll();
				return $result;
			} else {
				return false;
			}
		} else {
			throw new Zend_Exception();
		}
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

	/**
	 * GET USER PASSWORD BY NAME
	 *
	 * @param $name
	 * @return mixed
	 */
	public function get_user_password_by_name ($name)
	{
		$row = $this->select()->where('name = ?', $name);
		$query = $row->query();
		$obj = $query->fetchObject();
		$result = $obj->password;

		return $result;

	}
/* ----------------------------------------
 * UPDATE METHODS
 * ----------------------------------------
 */

	/**
	 * UPDATE PASSWORD
	 *
	 * @param $id
	 * @param $password
	 * @return bool|mixed
	 */
	public function update_password($id, $password)
	{
		$row = $this->fetchRow($this->select()->where('id = ?', $id));

		if($row) {
			$row->password = md5($password);
			$row->save();
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @param null $name
	 * @param null $display_name
	 * @param null $email
	 * @param null $password
	 * @param null $avatar
	 * @param null $bio
	 */
	public function update_user_info($credential, $data)
	{
		$row = $this->fetchRow($this->select()->where('name = ?', $credential));

		//same as record
		$updated_response = array();

		if($row) {
			//query to get existing values
			$current_user_data = $this->get_complete_user_info('name', $credential);

			//loop through each param and compare values
			foreach ($data as $key => $value)
			{
				//since we send the entire object each time (admin scripts: 87, 116) - check for empty values first
				if ($value !== 'null')
				{
					//now loop through the existing records and compare
					foreach ($current_user_data[0] as $idx => $item)
					{
						//since we're pulling every field from the db - first check only those ones that share the key name
						if($key == $idx)
						{
							// if the values are the same - do something here
							if ($value == $item)
							{

							} else {
								// The password needs to be hashed
								if ($key == 'password')
								{
									// add field to response object
									$updated_response[$key] = $value;
									//insert into db
									$row->$key = md5($value);
								} else {
									// add field to response object
									$updated_response[$key] = $value;
									//insert into db
									$row->$key = $value;
								}
							}
						} else {
							//do something
						}
					}
				} else {
					// TODO: null value processing if needed
				}
			}

			//save the inserts
			$row->save();

			$response = array();
			$response[0] = true;
			$response[1] = $updated_response;
			return $response;

		} else {
			$response = array();
			$response[0] = false;
			return $response;
		}
	}

	/**
	 * CONFIRM USER
	 *
	 * @param $name
	 * @return bool
	 *
	 */
	public function confirm_user($id)
	{
		$row = $this->fetchRow($this->select()->where('id = ?', $id));

		if($row) {
			$row->is_confirmed = 1;
			$row->save();
			return true;
		} else {
			return false;
		}
	}
}

