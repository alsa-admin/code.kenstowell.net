<?php
	class Language_Email
	{
		/**
		 * FORGOT USERNAME EMAIL
		 * @desc language entry for username recovery
		 */
		public function forgot_username_email($email, $username)
		{
			$email_body = '
				<body>
					<div style="width:360px; height: 520px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/concrete_wall_2.png) repeat;
					margin: 0 auto 0 auto; text-align: center;">
							<div id="content-wrapper" style="background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_footer_bg.png) no-repeat 0 100%;
							height:100%; width:100%;">
								<div id="header"
								style="width: 100%; height:48px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_header_bg.png) no-repeat 0 0; font-family: helvetica;
								font-size:10px; text-align: center; margin: 0; padding: 0;">
									<p style="padding-top:35px">kenstowell.net username recovery</p>
								</div>
								<div id="email_body" style="padding:10px; margin:35px 0 0 0; text-align: left; color: #a89a8a; font-family: helvetica;">
									<div id="email_title">
										<h1 style="font-size:1.5em; text-align:center;">'.$email.'</h1>
									</div>
								<div id="forgot-username-copy" style="font-family: helvetica; margin: 50px 0 0 0; font-size: 13px;">
									<p>You are receiving this email because you forgot your username.  The username associated with this email is:</p>
								</div>
								<div id="username" style="color:#4b4b4b; text-align: center; margin: 50px 0 0 0;">
									<h1><a href="http://code.kenstowell.local/" style="color:#4b4b4b;">'.$username.'</a></h1>
								</div>
								<div id="forgot-username-footer-copy" style="margin:50px 0 0 0; font-family: helvetica; font-size: 13px; text-align: center;">
									<p>Thanks for using my site and I hope you continue to do so! In the mean time, here are some links you might find helpful:</p>
									<a href="http://www.puritan.com/ginkgo-biloba-052/ginkgo-biloba-120-mg-capsules-004544" target="_blank" style="display: block;">Ginko Biloba</a>
									<a href="http://www.helpguide.org/life/improving_memory.htm" style="display: block;">Memory enhancement</a>
									<p>;)</p>
								</div>
							</div>
						</div>
					</div>
				</body>';

			return $email_body;
		}

		public function forgot_password_email($email, $token, $id, $type)
		{
			$email_body = '
				<body>
					<div style="width:360px; height: 520px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/concrete_wall_2.png) repeat;
					margin: 0 auto 0 auto; text-align: center;">
							<div id="content-wrapper" style="background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_footer_bg.png) no-repeat 0 100%;
							height:100%; width:100%;">
								<div id="header"
								style="width: 100%; height:48px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_header_bg.png) no-repeat 0 0; font-family: helvetica;
								font-size:10px; text-align: center; margin: 0; padding: 0;">
									<p style="padding-top:35px">kenstowell.net password recovery</p>
								</div>
								<div id="email_body" style="padding:10px; margin:35px 0 0 0; text-align: left; color: #a89a8a; font-family: helvetica;">
									<div id="email_title">
										<h1 style="font-size:1.5em; text-align:center;">'.$email.'</h1>
									</div>
								<div id="forgot-password-copy" style="font-family: helvetica; margin: 50px 0 0 0; font-size: 13px; text-align:center;">
									<p>You are receiving this email because you forgot your password.  To change your password, please follow the link below:</p>
								</div>
								<div id="password" style="color:#4b4b4b; width:315px; height:50px; text-align: center; margin: 30px 0 0 0;">
									<a href="http://code.kenstowell.local/index/auth-router/token/'.$token.'/id/'.$id.'/type/'.$type.'" style="color:#4b4b4b; font-size:13px;">http://code.kenstowell.local/index/auth-router/token/'.$token.'/id/'.$id.'</a>
								</div>
								<div id="forgot-password-footer-copy" style="margin:30px 0 0 0; font-family: helvetica; font-size: 13px; text-align: center;">
								<p>The link is no longer valid after Midnight (pst), so use it before then!</p>
									<p>Thanks for using my site and I hope you continue to do so! In the mean time, here are some links you might find helpful:</p>
									<a href="http://www.puritan.com/ginkgo-biloba-052/ginkgo-biloba-120-mg-capsules-004544" target="_blank" style="display: block;">Ginko Biloba</a>
									<a href="http://www.helpguide.org/life/improving_memory.htm" style="display: block;">Memory enhancement</a>
									<p>;)</p>
								</div>
							</div>
						</div>
					</div>
				</body>';

			return $email_body;
		}

		public function new_user($email, $token, $id, $type)
		{
			$email_body = '
				<body>
					<div style="width:360px; height: 520px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/concrete_wall_2.png) repeat;
					margin: 0 auto 0 auto; text-align: center;">
							<div id="content-wrapper" style="background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_footer_bg.png) no-repeat 0 100%;
							height:520px; width:100%;">
								<div id="header"
								style="width: 100%; height:48px; background: url(http://i1170.photobucket.com/albums/r538/alsa-admin/email_header_bg.png) no-repeat 0 0; font-family: helvetica;
								font-size:10px; text-align: center; margin: 0; padding: 0;">
									<p style="padding-top:35px">kenstowell.net user account creation</p>
								</div>
								<div id="email_body" style="padding:10px; margin:35px 0 0 0; text-align: left; color: #a89a8a; font-family: helvetica;">
									<div id="email_title">
										<h1 style="font-size:1.5em; text-align:center;">'.$email.'</h1>
									</div>
								<div id="new-user-copy" style="font-family: helvetica; margin: 50px 0 0 0; font-size: 13px; text-align:center;">
									<p>You are receiving this email because you recently created an account on www.kenstowell.net.  To confirm this account, please follow the link:</p>
								</div>
								<div id="password" style="color:#4b4b4b; width:315px; height:50px; text-align: center; margin: 30px 0 0 0;">
									<a href="http://code.kenstowell.local/index/auth-router/token/'.$token.'/id/'.$id.'/type/'.$type.'" style="color:#4b4b4b; font-size:13px;">http://code.kenstowell.local/index/auth-router/token/'.$token.'/id/'.$id.'/type/'.$type.'</a>
								</div>
								<div id="forgot-password-footer-copy" style="margin:30px 0 0 0; font-family: helvetica; font-size: 13px; text-align: center;">
								<p>The link is only valid for 24 hours, so use it before then!</p>
								</div>
							</div>
						</div>
					</div>
				</body>';

			return $email_body;
		}
	}
?>