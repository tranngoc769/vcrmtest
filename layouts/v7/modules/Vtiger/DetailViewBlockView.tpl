{*+**********************************************************************************
* The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*************************************************************************************}

{strip}
   
    {$basic = array('firstname','lastname','phone','account_id','title','department','birthday','assigned_user_id','createdtime','notify_owner','modifiedtime')}
    {$contact = array('contact_no','mobile','homephone','otherphone','fax','secondaryemail','emailoptout','email','assistantphone','assistant')}
    {$moreInfo = array('reference','contact_id','description','portal','support_start_date','support_end_date','isconvertedfromlead','source','donotcall','leadsource')}
    {$address = array('mailingstreet','otherstreet','mailingpobox','otherpobox','mailingcity','othercity','mailingstate','otherstate','mailingzip','otherzip','mailingcountry','othercountry')}
	{if !empty($PICKIST_DEPENDENCY_DATASOURCE)}
		<input type="hidden" name="picklistDependency" value='{Vtiger_Util_Helper::toSafeHTML($PICKIST_DEPENDENCY_DATASOURCE)}' />
	{/if}

	{foreach key=BLOCK_LABEL_KEY item=FIELD_MODEL_LIST from=$RECORD_STRUCTURE}
		{assign var=BLOCK value=$BLOCK_LIST[$BLOCK_LABEL_KEY]}
		{if $BLOCK eq null or $FIELD_MODEL_LIST|@count lte 0}{continue}{/if}
		<div class="block block_{$BLOCK_LABEL_KEY}" data-block="{$BLOCK_LABEL_KEY}" data-blockid="{$BLOCK_LIST[$BLOCK_LABEL_KEY]->get('id')}">
			{assign var=IS_HIDDEN value=$BLOCK->isHidden()}
			{assign var=WIDTHTYPE value=$USER_MODEL->get('rowheight')}
			<input type=hidden name="timeFormatOptions" data-value='{$DAY_STARTS}' />
			<div>
				<h4 class="textOverflowEllipsis maxWidth50">
					<img class="cursorPointer alignMiddle blockToggle {if !($IS_HIDDEN)} hide {/if}" src="{vimage_path('arrowRight.png')}" data-mode="hide" data-id={$BLOCK_LIST[$BLOCK_LABEL_KEY]->get('id')}>
					<img class="cursorPointer alignMiddle blockToggle {if ($IS_HIDDEN)} hide {/if}" src="{vimage_path('arrowdown.png')}" data-mode="show" data-id={$BLOCK_LIST[$BLOCK_LABEL_KEY]->get('id')}>&nbsp;
					{vtranslate({$BLOCK_LABEL_KEY},{$MODULE_NAME})}
				</h4>
			</div>
			<hr>
			<div class="blockData">
				<table class="table detailview-table no-border">
					<tbody {if $IS_HIDDEN} class="hide" {/if}>
						{assign var=COUNTER value=0}
						<tr>
							{foreach item=FIELD_MODEL key=FIELD_NAME from=$FIELD_MODEL_LIST}
								{assign var=fieldDataType value=$FIELD_MODEL->getFieldDataType()}
								{if !$FIELD_MODEL->isViewableInDetailView()}
									{continue}
								{/if}
								{if $FIELD_MODEL->get('uitype') eq "83"}
									{foreach item=tax key=count from=$TAXCLASS_DETAILS}
										{if $COUNTER eq 2}
											</tr><tr>
											{assign var="COUNTER" value=1}
										{else}
											{assign var="COUNTER" value=$COUNTER+1}
										{/if}
										<td class="fieldLabel {$WIDTHTYPE}">
											<span class='muted'>{vtranslate($tax.taxlabel, $MODULE)}(%)</span>
										</td>
										<td class="fieldValue {$WIDTHTYPE}">
											<span class="value textOverflowEllipsis" data-field-type="{$FIELD_MODEL->getFieldDataType()}" >
												{if $tax.check_value eq 1}
													{$tax.percentage}
												{else}
													0
												{/if} 
											</span>
										</td>
									{/foreach}
								{else if $FIELD_MODEL->get('uitype') eq "69" || $FIELD_MODEL->get('uitype') eq "105"}
									{if $COUNTER neq 0}
										{if $COUNTER eq 2}
											</tr><tr>
											{assign var=COUNTER value=0}
										{/if}
									{/if}
									<td class="fieldLabel {$WIDTHTYPE}"><span class="muted">{vtranslate({$FIELD_MODEL->get('label')},{$MODULE_NAME})}</span></td>
									<td class="fieldValue {$WIDTHTYPE}">
										<ul id="imageContainer">
											{foreach key=ITER item=IMAGE_INFO from=$IMAGE_DETAILS}
												{if !empty($IMAGE_INFO.url) && !empty({$IMAGE_INFO.orgname})}
													<li><img src="{$IMAGE_INFO.url}" title="{$IMAGE_INFO.orgname}" width="400" height="300" /></li>
												{/if}
											{/foreach}
										</ul>
									</td>
									{assign var=COUNTER value=$COUNTER+1}
								{else}
									{if $FIELD_MODEL->get('uitype') eq "20" or $FIELD_MODEL->get('uitype') eq "19" or $fieldDataType eq 'reminder' or $fieldDataType eq 'recurrence'}
										{if $COUNTER eq '1'}
											<td class="fieldLabel {$WIDTHTYPE}"></td><td class="{$WIDTHTYPE}"></td></tr><tr>
											{assign var=COUNTER value=0}
										{/if}
									{/if}
									{if $COUNTER eq 2}
										</tr><tr>
										{assign var=COUNTER value=1}
									{else}
										{assign var=COUNTER value=$COUNTER+1}
									{/if}
									<td class="fieldLabel textOverflowEllipsis {$WIDTHTYPE}" id="{$MODULE_NAME}_detailView_fieldLabel_{$FIELD_MODEL->getName()}" {if $FIELD_MODEL->getName() eq 'description' or $FIELD_MODEL->get('uitype') eq '69'} style='width:8%'{/if}>
										<span class="muted">
											{if $MODULE_NAME eq 'Documents' && $FIELD_MODEL->get('label') eq "File Name" && $RECORD->get('filelocationtype') eq 'E'}
												{vtranslate("LBL_FILE_URL",{$MODULE_NAME})}
											{else}
												{vtranslate({$FIELD_MODEL->get('label')},{$MODULE_NAME})}
											{/if}
											{if ($FIELD_MODEL->get('uitype') eq '72') && ($FIELD_MODEL->getName() eq 'unit_price')}
												({$BASE_CURRENCY_SYMBOL})
											{/if}
										</span>
									</td>
									<td class="fieldValue {$WIDTHTYPE}" id="{$MODULE_NAME}_detailView_fieldValue_{$FIELD_MODEL->getName()}" {if $FIELD_MODEL->get('uitype') eq '19' or $fieldDataType eq 'reminder' or $fieldDataType eq 'recurrence'} colspan="3" {assign var=COUNTER value=$COUNTER+1} {/if}>
										{assign var=FIELD_VALUE value=$FIELD_MODEL->get('fieldvalue')}
										{if $fieldDataType eq 'multipicklist'}
											{assign var=FIELD_DISPLAY_VALUE value=$FIELD_MODEL->getDisplayValue($FIELD_MODEL->get('fieldvalue'))}
										{else}
											{assign var=FIELD_DISPLAY_VALUE value=Vtiger_Util_Helper::toSafeHTML($FIELD_MODEL->getDisplayValue($FIELD_MODEL->get('fieldvalue')))}
										{/if}

										<span class="value" data-field-type="{$FIELD_MODEL->getFieldDataType()}" {if $FIELD_MODEL->get('uitype') eq '19' or $FIELD_MODEL->get('uitype') eq '21'} style="white-space:normal;" {/if}>
											{include file=vtemplate_path($FIELD_MODEL->getUITypeModel()->getDetailViewTemplateName(),$MODULE_NAME) FIELD_MODEL=$FIELD_MODEL USER_MODEL=$USER_MODEL MODULE=$MODULE_NAME RECORD=$RECORD}
										</span>
										{if $IS_AJAX_ENABLED && $FIELD_MODEL->isEditable() eq 'true' && $FIELD_MODEL->isAjaxEditable() eq 'true'}
											<span class="hide edit pull-left">
												{if $fieldDataType eq 'multipicklist'}
													<input type="hidden" class="fieldBasicData" data-name='{$FIELD_MODEL->get('name')}[]' data-type="{$fieldDataType}" data-displayvalue='{$FIELD_DISPLAY_VALUE}' data-value="{$FIELD_VALUE}" />
												{else}
													<input type="hidden" class="fieldBasicData" data-name='{$FIELD_MODEL->get('name')}' data-type="{$fieldDataType}" data-displayvalue='{$FIELD_DISPLAY_VALUE}' data-value="{$FIELD_VALUE}" />
												{/if}
											</span>
											{if $fieldDataType eq 'phone' && $FIELD_VALUE != ""}
												<a id="callBtn" href="#" onclick="call(false,0);" class="fa fa-phone" style="margin-left: 5px;"></a>
											{/if}
											<span class="action pull-right"><a href="#" onclick="return false;" class="editAction fa fa-pencil"></a></span>
										{/if}
									</td>
								{/if}

								{if $FIELD_MODEL_LIST|@count eq 1 and $FIELD_MODEL->get('uitype') neq "19" and $FIELD_MODEL->get('uitype') neq "20" and $FIELD_MODEL->get('uitype') neq "30" and $FIELD_MODEL->get('name') neq "recurringtype" and $FIELD_MODEL->get('uitype') neq "69" and $FIELD_MODEL->get('uitype') neq "105"}
									<td class="fieldLabel {$WIDTHTYPE}"></td><td class="{$WIDTHTYPE}"></td>
								{/if}
							{/foreach}
							{* adding additional column for odd number of fields in a block *}
							{if $FIELD_MODEL_LIST|@end eq true and $FIELD_MODEL_LIST|@count neq 1 and $COUNTER eq 1}
								<td class="fieldLabel {$WIDTHTYPE}"></td><td class="{$WIDTHTYPE}"></td>
							{/if}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<br>
	{/foreach}
{/strip}

{*  *}
<div class="main-body">
    <div class="call-min-panel"></div>
    <div id="call-modal" class="modal">
        <div class="container customer-info">
            <div class="modal-control">
                <p id = "calling_title" class="item left"></p>
                <p id = "calling_number" class="item callnumber"></p>
                <img id="closeButton" class="item" src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/close.png">
                <img id="minimizeButton" class="item minimize" src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/min.png">
            </div>
            <div class="call-row">
                <div class="col-md-3 call-keypad">
                    <div class="numpad">
                            <div class="keypad-row">
                            <img src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/logo.png" alt="TEL4VN">
                            </div>
                            <div class="keypad-row">
                                <input class="numpad-input" id="numpad-input"></input>
                            </div>
                            <div class="keypad-row">
                                <a class="number effect-shine" href="#">1</a>
                                <a class="number effect-shine" href="#">2</a>
                                <a class="number effect-shine" href="#">3</a>
                            </div>
                            <div class="keypad-row">
                                <a class="number effect-shine" href="#">4</a>
                                <a class="number effect-shine" href="#">5</a>
                                <a class="number effect-shine" href="#">6</a>
                            </div>
                            <div class="keypad-row">
                                <a class="number effect-shine" href="#">7</a>
                                <a class="number effect-shine" href="#">8</a>
                                <a class="number effect-shine" href="#">9</a>
                            </div>
                            <div class="keypad-row">
                                <a class="number effect-shine" href="#">*</a>
                                <a class="number effect-shine" href="#">0</a>
                                <a class="number effect-shine" href="#">#</a>
                            </div>
                            <div class="keypad-row">
                                <div class="number calltime effect-shine" id="ob-time-value">
                                    00:00:00
                                </div>
                            </div>
                        </div>
                </div>
                    <div class="col-md-9 customer-information">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#basic-information" role="tab" aria-controls="home" aria-selected="true">Basic</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#contact-information" role="tab" aria-controls="profile" aria-selected="false">Contact</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#address-detail" role="tab" aria-controls="profile" aria-selected="false">Address</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#des-detail" role="tab" aria-controls="profile" aria-selected="false">More</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="basic-information" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="customer-info-heading">Basic Infomation</h3>
                                <div class="call-row info-panel">
                                {foreach key=BLOCK_LABEL_KEY item=FIELD_MODEL_LIST from=$RECORD_STRUCTURE}
				                    {foreach item=FIELD_MODEL key=FIELD_NAME from=$FIELD_MODEL_LIST}
                                        {if in_array($FIELD_MODEL->getName(), $basic) }
                                        <div class="col-md-6">
                                        <div class="detail-info">
                                            <label class="detail-header">{$FIELD_MODEL->get('label')}</label>
                                            <label class="detail-value">
                                            {if $FIELD_MODEL->get('fieldvalue')=="None" or $FIELD_MODEL->get('fieldvalue')==null}
                                                None
                                            {else if $FIELD_MODEL->get('fieldvalue')==0 or $FIELD_MODEL->get('fieldvalue')=="0"}
                                                No
                                            {else if $FIELD_MODEL->get('fieldvalue')== 1 or $FIELD_MODEL->get('fieldvalue')=="1"}
                                                Yes
                                            {else}
                                                {$FIELD_MODEL->get('fieldvalue')}
                                            {/if}
                                            </label>
                                        </div>
                                        </div>
                                        {/if}
                                    {/foreach}
                                {/foreach}
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="contact-information" role="tabpanel" aria-labelledby="profile-tab">
                                <h3 class="customer-info-heading">More Information</h3>
                                <div class="call-row info-panel">
                                {foreach key=BLOCK_LABEL_KEY item=FIELD_MODEL_LIST from=$RECORD_STRUCTURE}
				                    {foreach item=FIELD_MODEL key=FIELD_NAME from=$FIELD_MODEL_LIST}
                                        {if in_array($FIELD_MODEL->getName(), $moreInfo) }
                                        <div class="col-md-6">
                                        <div class="detail-info">
                                            <label class="detail-header">{$FIELD_MODEL->get('label')}</label>
                                            <label class="detail-value">
                                            {if $FIELD_MODEL->get('fieldvalue')=="None" or $FIELD_MODEL->get('fieldvalue')==null}
                                                None
                                            {else if $FIELD_MODEL->get('fieldvalue')==0 or $FIELD_MODEL->get('fieldvalue')=="0"}
                                                No
                                            {else if $FIELD_MODEL->get('fieldvalue')== 1 or $FIELD_MODEL->get('fieldvalue')=="1"}
                                                Yes
                                            {else}
                                                {$FIELD_MODEL->get('fieldvalue')}
                                            {/if}
                                            </label>
                                        </div>
                                        </div>
                                        {/if}
                                    {/foreach}
                                {/foreach}
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="address-detail" role="tabpanel" aria-labelledby="profile-tab">
                                <h3 class="customer-info-heading">Portal Detail</h3>
                                <div class="call-row info-panel">
                                {foreach key=BLOCK_LABEL_KEY item=FIELD_MODEL_LIST from=$RECORD_STRUCTURE}
				                    {foreach item=FIELD_MODEL key=FIELD_NAME from=$FIELD_MODEL_LIST}
                                        {if in_array($FIELD_MODEL->getName(), $contact) }
                                        <div class="col-md-6">
                                        <div class="detail-info">
                                            <label class="detail-header">{$FIELD_MODEL->get('label')}</label>
                                            <label class="detail-value">
                                            {if $FIELD_MODEL->get('fieldvalue')=="None" or $FIELD_MODEL->get('fieldvalue')==null}
                                                None
                                            {else if $FIELD_MODEL->get('fieldvalue')==0 or $FIELD_MODEL->get('fieldvalue')=="0"}
                                                No
                                            {else if $FIELD_MODEL->get('fieldvalue')== 1 or $FIELD_MODEL->get('fieldvalue')=="1"}
                                                Yes
                                            {else}
                                                {$FIELD_MODEL->get('fieldvalue')}
                                            {/if}
                                            </label>
                                        </div>
                                        </div>
                                        {/if}
                                    {/foreach}
                                {/foreach}
                                
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="des-detail" role="tabpanel" aria-labelledby="profile-tab">
                                <h3 class="customer-info-heading">Customer Address</h3>
                                <div class="call-row info-panel">
                                {foreach key=BLOCK_LABEL_KEY item=FIELD_MODEL_LIST from=$RECORD_STRUCTURE}
				                    {foreach item=FIELD_MODEL key=FIELD_NAME from=$FIELD_MODEL_LIST}
                                        {if in_array($FIELD_MODEL->getName(), $address) }
                                        <div class="col-md-6">
                                        <div class="detail-info">
                                            <label class="detail-header">{$FIELD_MODEL->get('label')}</label>
                                            <label class="detail-value">
                                            {if $FIELD_MODEL->get('fieldvalue')=="None" or $FIELD_MODEL->get('fieldvalue')==null}
                                                None
                                            {else if $FIELD_MODEL->get('fieldvalue')==0 or $FIELD_MODEL->get('fieldvalue')=="0"}
                                                No
                                            {else if $FIELD_MODEL->get('fieldvalue')== 1 or $FIELD_MODEL->get('fieldvalue')=="1"}
                                                Yes
                                            {else}
                                                {$FIELD_MODEL->get('fieldvalue')}
                                            {/if}
                                            </label>
                                        </div>
                                        </div>
                                        {/if}
                                    {/foreach}
                                {/foreach}
                                </div>
                            </div>
                            <div class="call-control-panel" id = "call-control-panel">
                                <button class="callingCtlBtn">
                                    <img src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/hangup.png" onclick="terminate();">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>