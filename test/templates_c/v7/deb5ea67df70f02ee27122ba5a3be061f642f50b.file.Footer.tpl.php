<?php /* Smarty version Smarty-3.1.7, created on 2020-09-12 09:08:47
         compiled from "/home/tranngoc/Desktop/vtigercrm/includes/runtime/../../layouts/v7/modules/Vtiger/Footer.tpl" */ ?>
<?php /*%%SmartyHeaderCode:533253135f5c901fcdda90-94839810%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'deb5ea67df70f02ee27122ba5a3be061f642f50b' => 
    array (
      0 => '/home/tranngoc/Desktop/vtigercrm/includes/runtime/../../layouts/v7/modules/Vtiger/Footer.tpl',
      1 => 1599898245,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '533253135f5c901fcdda90-94839810',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'LANGUAGE_STRINGS' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_5f5c901fd887a',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5f5c901fd887a')) {function content_5f5c901fd887a($_smarty_tpl) {?>

<footer class="app-footer">
<div class="dial-container">
        <button id="dial-icon" class="dial-icon"></button>
        <div id="pad" class="pad hide">
            <div class="close-dial">
                <a class="fa fa-chevron-down" aria-hidden="true"></a>
            </div>
            <div class="dial-pad">
                <div class="contact">
                    <div class="avatar">
                    </div>
                    <div class="contact-info">
                        <div class="contact-name">Contact Name</div>
                        <div class="contact-position">Position</div>
                        <div class="contact-number">
                            (123) 456 7890
                        </div>
                    </div>
                    <div class="contact-buttons">
                        <button class="icon-callnow"></button>
                    </div>
                </div>
                <div class="phoneString">
                    <input type="text" disabled="">
                </div>
                <div class="digits">
                    <div class="dig pound number-dig" name="1">1</div>
                    <div class="dig number-dig" name="2">2
                        <div class="sub-dig">ABC</div>
                    </div>
                    <div class="dig number-dig" name="3">3
                        <div class="sub-dig">DEF</div>
                    </div>
                    <div class="dig number-dig" name="4">4
                        <div class="sub-dig">GHI</div>
                    </div>
                    <div class="dig number-dig" name="5">5
                        <div class="sub-dig">JKL</div>
                    </div>
                    <div class="dig number-dig" name="6">6
                        <div class="sub-dig">MNO</div>
                    </div>
                    <div class="dig number-dig" name="7">7
                        <div class="sub-dig">PQRS</div>
                    </div>
                    <div class="dig number-dig" name="8">8
                        <div class="sub-dig">TUV</div>
                    </div>
                    <div class="dig number-dig" name="9">9
                        <div class="sub-dig">WXYZ</div>
                    </div>
                    <div class="dig number-dig astrisk" name="*">*</div>
                    <div class="dig number-dig pound" name="0">0</div>
                    <div class="dig number-dig pound" name="#">#</div>
                </div>
                <div class="digits">
                    <div class="dig addPerson action-dig"></div>
                    <div class="dig-spacer"></div>
                    <div class="dig goBack action-dig"></div>
                </div>
            </div>
            <div class="call-pad">
                <div class="pulsate">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="ca-avatar">
                </div>
                <div class="ca-name"></div>
                <div class="ca-number"></div>
                <div class="ca-status" data-dots="...">Calling</div>
                <div>
                    <div id="dial-pad-incall" class="digits dial-pad-incall hide">
                        <div class="dig pound number-dig" name="1">1</div>
                        <div class="dig number-dig" name="2">2
                            <div class="sub-dig">ABC</div>
                        </div>
                        <div class="dig number-dig" name="3">3
                            <div class="sub-dig">DEF</div>
                        </div>
                        <div class="dig number-dig" name="4">4
                            <div class="sub-dig">GHI</div>
                        </div>
                        <div class="dig number-dig" name="5">5
                            <div class="sub-dig">JKL</div>
                        </div>
                        <div class="dig number-dig" name="6">6
                            <div class="sub-dig">MNO</div>
                        </div>
                        <div class="dig number-dig" name="7">7
                            <div class="sub-dig">PQRS</div>
                        </div>
                        <div class="dig number-dig" name="8">8
                            <div class="sub-dig">TUV</div>
                        </div>
                        <div class="dig number-dig" name="9">9
                            <div class="sub-dig">WXYZ</div>
                        </div>
                        <div class="dig number-dig astrisk" name="*">*</div>
                        <div class="dig number-dig pound" name="0">0</div>
                        <div class="dig number-dig pound" name="#">#</div>
                    </div>
                </div>
                
                <div class="ca-buttons">
                    <div class="ca-b-single add-contact" data-label="Add Contact">
                    </div>
                    <div class="ca-b-single mute" data-label="Mute">
                    </div>
                    <div class="ca-b-single speaker" data-label="Speaker"></div>
                    <div class="ca-b-single other" data-label="SomeThing">
                    </div>
                    <div class="ca-b-single chat" data-label="Chat">
                    </div>
                    <div class="ca-b-single keypad" data-label="Keypad">
                    </div>
                </div>
            </div>
            <div class="call action-dig">
                <div class="call-change"><span></span></div>
                <div class="call-icon"></div>
            </div>
        </div>

    </div>
	<p>
		Trung tâm đào tạo Viễn thông và Công nghệ thông tin TEL4VN
	</p>
</footer>
</div>
<div id='overlayPage'>
	<!-- arrow is added to point arrow to the clicked element (Ex:- TaskManagement), 
	any one can use this by adding "show" class to it -->
	<div class='arrow'></div>
	<div class='data'>
	</div>
</div>
<div id='helpPageOverlay'></div>
<div id="js_strings" class="hide noprint"><?php echo Zend_Json::encode($_smarty_tpl->tpl_vars['LANGUAGE_STRINGS']->value);?>
</div>
<div class="modal myModal fade"></div>
<?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('JSResources.tpl'), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

<script src="<?php echo vresource_url('layouts/v7/lib/jssip/views.js');?>
"></script>
<script src="<?php echo vresource_url('layouts/v7/lib/jssip/jsconfig.js');?>
"></script>
<script src="<?php echo vresource_url('layouts/v7/lib/jssip/modal.js');?>
"></script>

<script src="<?php echo vresource_url('layouts/v7/skins/dialpad/js/dial.js');?>
"></script>

</body>

</html><?php }} ?>