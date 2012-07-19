<?php

class Model_Auth extends Zend_Db_Table_Abstract
{
	protected $_name = 'auth';

/* ----------------------------------------
 * CREATE METHODS
 * ----------------------------------------
 */
	/**
	 * CREATE TOKEN
	 *
	 * @param $token
	 * @param $id
	 * @return bool
	 */
	public function create_token($token, $id)
	{
		$row = $this->createRow();

		if($row) {
			$row->token = $token;
			$row->user_id = $id;
			$row->save();
			return true;
		} else {
			return false;
		}
	}

/* ----------------------------------------
 * READ METHODS
 * ----------------------------------------
 */
	/**
	 * GET TOKEN BY USER ID
	 *
	 * @param $id
	 * @return bool
	 */
	public function get_token_by_user_id($id)
	{
		$row = $this->select()->where('user_id = ?', $id);
		if($row) {
			$query = $row->query();
			$result = $query->fetchAll();

			return $result;
		} else {
			return false;
		}
	}
/* ----------------------------------------
 * UPDATE METHODS
 * ----------------------------------------
 */

/* ----------------------------------------
 * DELETE METHODS
 * ----------------------------------------
 */
	public function delete_row_by_token($token) {
		$delete = $this->delete(array('token = ?' => $token));

		if($delete > 0) {
			return true;
		} else {
			return false;
		}
	}
}