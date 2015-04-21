/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
/*jQuery.sap.require("sap.collaboration.components.fiori.feed.Component");
jQuery.sap.require("sap.collaboration.components.fiori.feed.dialog.Component");
jQuery.sap.require("sap.collaboration.components.fiori.sharing.Component");
jQuery.sap.require("sap.collaboration.components.fiori.sharing.dialog.Component");*/

jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.ca.ui.quickoverview.CompanyLaunch");
jQuery.sap.require("sap.m.MessageBox");

jQuery.sap.require("sap.ca.ui.model.type.FileSize");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");

sap.ca.scfld.md.controller.BaseDetailController
		.extend(
				"cus.crm.opportunity.view.S3",
				{
					SalesStages : [],
					Priorities : [],
					UserStatuses : [],
					Currencies : [],
					ContactCollection : [],
					EmployeeCollection : [],
					prospect_number : "",
					response : [],
					opportunity_number : "",
					bAppLaunched : true,
					guid : undefined,
					partnerFunctionMap : {},
					mPartnerImgSrc : {},
					partnerDeterminationMap : {},
					accountListItemTemplate : new sap.m.ObjectListItem(	{title : '{json>name1}'})
					.addAttribute(new sap.m.ObjectAttribute ({text : '{json>accountID}'}))
					.addCustomData(new sap.ui.core.CustomData({key : 'ID', value : '{json>accountID}'})),
				    
				    
				    contactListItemTemplate : new sap.m.ObjectListItem({title : '{json>fullName}'})
					.addAttribute(new sap.m.ObjectAttribute ({text : '{json>contactID}'}))
					.addCustomData(new sap.ui.core.CustomData({key : 'ID', value : '{json>contactID}'})),
					
				    
				
					employeeListItemTemplate : new sap.m.ObjectListItem({title : '{json>fullName}'})
					.addAttribute(new sap.m.ObjectAttribute ({text : '{json>employeeID}'}))
					.addCustomData(new sap.ui.core.CustomData({key : 'ID', value : '{json>employeeID}'})),
					
					
					onInit : function() {

						 this.fullScreenMode = false;
						
						
						// execute the onInit for the base class
						// BaseDetailController

						sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit
								.call(this);
						
		

						// this.getView().getModel('controllers').getData().s3Controller
						// = this;
						this.oModel = this.getView().getModel();
						
						//i18n models and resource bundles
						this.oI18nModel = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel;
						this.oResourceBundle = this.oI18nModel.getResourceBundle();
						
						
						//initialize account information
						this.sProspectNumber = "";
						this.sProspectImageSrc = "";
						
						jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath(
								"cus.crm.opportunity.css.Opportunity", ".css"),
								"sap-ui-theme-sap.crm");
						this.contactF4Fragment = new sap.ui.xmlfragment(this
								.createId("contact_F4_S3"),
								'cus.crm.opportunity.view.ContactF4', this);
						this.changeLogFragment = new sap.ui.xmlfragment(this
								.createId("change_Log_S3"),
								'cus.crm.opportunity.view.ChangeLog', this);
						this.changeLogFragment
								.setModel(new sap.ui.model.json.JSONModel());
						this.changeLogFragment
								.setModel(this.oI18nModel, 'i18n');

						// setting named json models - for individual tabs of
						// icon tab filter - salesteam, info, products & header
						this.byId('salesTeam').setModel(
								new sap.ui.model.json.JSONModel(), "json");
						this.byId('info').setModel(
								new sap.ui.model.json.JSONModel(), "json");
						this.byId('Product_Tab').setModel(
								new sap.ui.model.json.JSONModel(), "json");
						this.byId('S3_Header').setModel(
								new sap.ui.model.json.JSONModel(), "json");

						
						this.byId('Sales_Team').addCustomData(new sap.ui.core.CustomData({key : 'controller', value :this}));
						/*
						 * this.byId('ChangeLog').setModel(new
						 * sap.ui.model.json.JSONModel(),"json");
						 */
						// setting a named json model
						this.getView().setModel(
								new sap.ui.model.json.JSONModel(), "json");

						this.oRouter.attachRouteMatched(
								this.detailRouteMatched, this);

						// Footer options are now handled in the controller
						var that = this;
						this.oHeaderFooterOptions = {};


							
						
						this.oHeaderFooterOptions3UI = {


								oEditBtn : {
									sI18nBtnTxt : "EDIT",
									onBtnPressed : function(evt) {
										that.onEdit();
									},
									bEnabled : true, // default true
								},

								buttonList : [
																										

							    //Follow_Up button in Opportunity footer		    
//							    { sI18nBtnTxt : "FOLLOW_UP",
//							    	visible : false,
//							    	  	onBtnPressed: function(evt) {
//							    		that.handleOpen(evt);
//							    	},
//							    },
							 ],
							 

								oJamOptions : {
									// to get share on JAM
									oShareSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetShareSettings : function() {
										var description = that.byId('info')
												.getModel('json').getData().Description;
										var url = document.URL;
										return {

											object : {
												id : url,
												share : "Opportunity:"
														+ description,
												display : that._getShareDisplay(),

											}
										};
									},

									// Discuss on JAM
									oDiscussSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetDiscussSettings : function() {
										var oppr_id = that.byId('info').getModel(
												'json').getData().Id;
										var url = document.URL;
										return {
											oDataServiceUrl : "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
											feedType : "object",
											object : {
												id : that._getDiscussID(),
												type : that._getDiscussType(),
												name : "OpportunityID:" + oppr_id,
												ui_url : url
											// "http://ldcigm6.wdf.sap.corp:50033/sap/bc/ui5_ui5/sap/crm_opprtnty/noShellIndex.html#/detail/Opportunities(guid'"
											// + headerGuid + "')"
											},
										};
									},
								},
							};
						
						this.oHeaderFooterOptionsForAccount =  {

							
								oEditBtn : {
									sI18nBtnTxt : "EDIT",
									onBtnPressed : function(evt) {
										that.onEdit();
									},
									bEnabled : true, // default true
								},

								

								oJamOptions : {
									// to get share on JAM
									oShareSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetShareSettings : function() {
										var description = that.byId('info')
												.getModel('json').getData().Description;
										var url = document.URL;
										return {

											object : {
												id : url,
												share : "Opportunity:"
														+ description,
												display : that._getShareDisplay(),

											}
										};
									},

									// Discuss on JAM
									oDiscussSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetDiscussSettings : function() {
										var oppr_id = that.byId('info').getModel(
												'json').getData().Id;
										var url = document.URL;
										return {
											oDataServiceUrl : "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
											feedType : "object",
											object : {
												id : that._getDiscussID(),
												type : that._getDiscussType(),
												name : "OpportunityID:" + oppr_id,
												ui_url : url
											// "http://ldcigm6.wdf.sap.corp:50033/sap/bc/ui5_ui5/sap/crm_opprtnty/noShellIndex.html#/detail/Opportunities(guid'"
											// + headerGuid + "')"
											},
										};
									},
								},
							};
						
						this.oHeaderFooterOptions4UI = {

							
								oEditBtn : {
									sI18nBtnTxt : "EDIT",
									onBtnPressed : function(evt) {
										that.onEdit();
									},
									bEnabled : true, // default true
								},

								
								buttonList : [
																										

							    //Follow_Up button in Opportunity footer		    
							    { sI18nBtnTxt : "FOLLOW_UP",
							    	visible : false,
							    	  	onBtnPressed: function(evt) {
							    		that.handleOpen(evt);
							    	},
							    },
							 ],
							 

								oJamOptions : {
									// to get share on JAM
									oShareSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetShareSettings : function() {
										var description = that.byId('info')
												.getModel('json').getData().Description;
										var url = document.URL;
										return {

											object : {
												id : url,
												share : "Opportunity:"
														+ description,
												display : that._getShareDisplay(),

											}
										};
									},

									// Discuss on JAM
									oDiscussSettings : {
										object : {
											id : "",
											share : ""
										}
									},
									fGetDiscussSettings : function() {
										var oppr_id = that.byId('info').getModel(
												'json').getData().Id;
										var url = document.URL;
										return {
											oDataServiceUrl : "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
											feedType : "object",
											object : {
												id : that._getDiscussID(),
												type : that._getDiscussType(),
												name : "OpportunityID:" + oppr_id,
												ui_url : url
											// "http://ldcigm6.wdf.sap.corp:50033/sap/bc/ui5_ui5/sap/crm_opprtnty/noShellIndex.html#/detail/Opportunities(guid'"
											// + headerGuid + "')"
											},
										};
									},
								},
							};
						//TODO : interoperability  	
						 this.sBackendVersion = cus.crm.opportunity.util.schema
							._getServiceSchemaVersion(this.oModel,
							"Opportunity");
						 
						this.oVersioningModel = new sap.ui.model.json.JSONModel({});
						this._loadVersionSpecificUI(this.sBackendVersion);
						
						var oFileUpload = this.byId('fileupload');
						var sUrlParams = this.getView().getModel().sUrlParams;
						//if upload enabled, must set xsrf token
						//and the base64 encodingUrl service for IE9 support!
						if (oFileUpload.getUploadEnabled()) {
						oFileUpload.setXsrfToken(this.getXsrfToken());
						oFileUpload.setEncodeUrl("/sap/bc/ui2/encode_file" + (sUrlParams ? '?' + sUrlParams
						: ''));
						}
						
						//set empty account icon to place holder 
						this.mPartnerImgSrc[""]  = "sap-icon://person-placeholder";
					},
					
					/**
					* gets the Xsrf token if it exists, if not, request it explicitly
					**/
					getXsrfToken: function() {
					var sToken = this.getView().getModel().getHeaders()['x-csrf-token'];
					if (!sToken) {
					this.getView().getModel().refreshSecurityToken(
					function(e, o) {
					sToken = o.headers['x-csrf-token'];
					},
					function() {
					sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message: 'Could not get XSRF token',
					details: ''
					});
					},
					false);
					
					}
					
					return sToken;
					},
					
					_getBackFunction: function(){
						if (this.fullScreenMode)
							return function(){window.history.back(1);};
						else
							return undefined;
					},

					onBeforeRendering : function() {

						this.getView().getModel("controllers").getData().s3Controller = this;
					},

					
					 _loadVersionSpecificUI : function(sBackendVersion){	
							
							if(parseFloat(sBackendVersion) >= 2){
								 this._loadWave4UI();
								 if(!this.fullScreenMode)
								 this.oHeaderFooterOptions=this.oHeaderFooterOptions4UI;
								 else 
							     this.oHeaderFooterOptions = this.oHeaderFooterOptionsForAccount;
									
							}
							 	
							else{
							  	 this._loadWave3UI();
								 this.oHeaderFooterOptions=this.oHeaderFooterOptions3UI;
						 	 }
								
					},	
						 	
					_loadWave3UI : function(){	

						// i18n text key for sales team
						this.oVersioningModel.getData().sParticipantsNoDataTextKey  = 'NO_CONTACTS';	
						this.oVersioningModel.getData().setHeaderTextForParticipants = jQuery.proxy(function(response) {},this);	
						// sales team tab - add contact button that allows to add contacts to the
						// sales team
						this.byId('salesTeam').insertContent(new sap.m.Button({	
							text : "{i18n>ADDCONTACT}",	
							icon : "sap-icon://add",	
							press : jQuery.proxy(this.addContact,this),	
							type : "Transparent",}),0);	
					},	
						    	
					_loadWave4UI : function(){	

						// i18n text key for participants
						this.oVersioningModel.getData().sParticipantsNoDataTextKey  = 'NO_PARTICIPANTS1';	
						this.oVersioningModel.getData().setHeaderTextForParticipants = jQuery.proxy(
								function(response)  {	
									this.byId('Sales_Team').getHeaderToolbar().getContent()[0].setText(this.oResourceBundle.getText('PARTICIPANTS',[response.data.SalesTeam.results.length]));	

								},this);	
						// employee responsible to be added at the object header
						this.byId('opportunityHeader').addAggregation("attributes",new  sap.m.ObjectAttribute(	
								{  text : "{json>/EmployeeResponsibleName}",	
									active : true,	
									press :  jQuery.proxy(this.onEmpBusCardLaunch,this),	
									customData : [new sap.ui.core.CustomData({key : "PartnerNumber", value : "{json>/EmployeeResponsibleNumber}"
									}),	

									new sap.ui.core.CustomData({key : "PartnerFunctionCode", value : "00000014"}),	

									new sap.ui.core.CustomData({key : "Image", value : "{json>/ContactImgSrc}"}),	

									new sap.ui.core.CustomData({key : "Imager", value : "{json>/ImgSrc}"}),	

									]	                }));	

						// participants tab - add contact button now becomes the add participants -
						// a title "Participants (count)" gets added
						this.byId('Sales_Team').setHeaderToolbar(new sap.m.Toolbar({	
							content : [new sap.m.Label(),	
							           new sap.m.ToolbarSpacer(),	
							           new sap.m.Button({	
							        	   text : "",	
							        	   icon : "sap-icon://add",	
							        	   type : "Transparent",	
							        	   press : jQuery.proxy(this.showParticipantsF4,this)	
							           })]	
						}));	


					},
  // Displays Follow up action sheet when click on Follow Up button
				    
				    handleOpen : function(oEvent) {
				    	
				    	this.appointmentFlag = false;
				    	this.oppFlag = false;
				    	this.taskFlag = false;
				    
				    		  var that=this;
				       	      this._actionSheet = new sap.m.ActionSheet({
				    	      title: "Choose Your Action",
				    	      showCancelButton: true,
				    	      placement: sap.m.PlacementType.Top,
				    	      
				    	  // Adding create an appointment / task buttons
				    	      
				    	      buttons: [
				    	        new sap.m.Button({
				    	        text : this
				    			.getView().getModel("i18n")
				    			.getProperty("CREATE_APPOINTMENT"),
				    	        press: function(evt) {
				    				
				    	     	        that.navToAppointmentDialog(evt);
				    	     	        
				    			},
				    	        
				    	        }),
				    	        new sap.m.Button({
				    	         text: this
				    			.getView().getModel("i18n")
				    			.getProperty("CREATE_TASK"),
				    			  press: function(evt) {
				      				
				    				  	that.navToTaskDialog(evt);
				  			},
				    	        
				    	        }),
				    	        
				    	        new sap.m.Button({
					    	         text: this
						    			.getView().getModel("i18n")
						    			.getProperty("CREATE_OPPORTUNITY"),
					    			  press: function(evt) {
					    				  that.navToOpptDialog(evt);
					    				 
										
					  			},
					    	        
					    	        }),
				    	      
				    	      ]
				    	       
				    	    });
				    	     
				       	  //EXTENSION POINT to be able to extend follow up action list
								/**
								 * @ControllerHook extHookHandleOpen is the controller hook that provides for extension of newly added follow up buttons.
								 *                                   
								 * @callback cus.crm.opportunity.S3.controller~extHookHandleOpen
								 * @param {object}
								 *           oControlEvent
								 * @return {void}
								 */
								if (this.extHookHandleOpen){
									this.extHookHandleOpen(oEvent);
								}
				    	
				    	 this._actionSheet.openBy(oEvent.getSource());
				    	
				    	 
				    	 
				    	 
				    	 
			  },
				    
				    
				 // Appointment Process Type Dialog when click on create an appointment
				    
				    navToAppointmentDialog : function(oEvent) {
				    	
						 var oModel = this.getView().getModel();
						 var oHeader = this.oModel.getContext("/" + this.sPath).getObject();
						// this.headerGuid = oHeader.Guid;
						// this.transactionType = oHeader.ProcessType;
						
						 var oGuid = this.byId('info').getModel('json').getData().Guid;
						 var oTransType = this.byId('info').getModel('json').getData().ProcessType;
						var data1;
						oModel.read("AppFollowupTransTypes?Guid='"+ oGuid + "'&TransactionType='"+oTransType+"'",null,null,false,function(oData,resp) //[ "$filter=ProcessType eq '" + pType+ "'" ]
						{ 
				             data1 = {
				            		 ProcessTypes : resp.data.results
						    };
				            
						});
						this.appointmentFlag=true;
						if(data1.ProcessTypes.length == 0)
						{ this.appointmentFlag=false;
							 sap.ca.ui.message.showMessageBox({
						            type: sap.ca.ui.message.Type.ERROR,
						            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPERROR"),
						            details: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPDETAILERROR")
						        });
						
						}
						else if(data1.ProcessTypes.length==1)
							{
							this.onlyOneAppointmentProcessType=true;
							this.processType = data1.ProcessTypes[0].ProcessTypeCode;
							this.processTypeDesc = data1.ProcessTypes[0].Description;
							this.privateFlag = data1.ProcessTypes[0].PrivateFlag;
							this.selectProcess();
							
							}
						else
							{
							this.oActionSheet = sap.ui.xmlfragment(
									"cus.crm.opportunity.view.ProcessTypeDialog",
							
									this);
							this.oActionSheet.setModel(this.getView().getModel(
							"i18n"), "i18n");
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(data1);
					        this.oActionSheet.setModel(jsonModel,"json");
					     
					     
							this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
							this.oActionSheet._list.setGrowingScrollToLoad(true);
							
						
							this.oActionSheet._dialog.setVerticalScrolling(true);
						
							this.oActionSheet.open();
							}
						
						
						
					// setting appointment flag to navigate to Appointment application	
						
						
				    },
					
				    //search in process type dialog
					searchProcess : function(oEvent){
						var sValue = oEvent.getParameter("value");
						if (sValue !== undefined) {
							// apply the filter to the bound items, and the Select Dialog will update
							oEvent.getParameter("itemsBinding").filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sValue)]);
						}
					},
					
					 navToOpptDialog : function(oEvent) {
					    	
							var oModel = this.getView().getModel();
							 var oGuid = this.byId('info').getModel('json').getData().Guid;
							 var oTransType = this.byId('info').getModel('json').getData().ProcessType;
							var data1 = null;
							oModel.read("OpptFollowupTransTypes?Guid=guid'"+ oGuid + "'&TransactionType='"+oTransType+"'",null,null,false,function(oData,resp) //[ "$filter=ProcessType eq '" + pType+ "'" ]
							{ 
	                             data1 = {
											ProcessTypes : resp.data.results
							    };
	                            
							});
							this.oppFlag = true;
							if(data1.ProcessTypes.length == 0)
							{  this.oppFlag=false;
								 sap.ca.ui.message.showMessageBox({
							            type: sap.ca.ui.message.Type.ERROR,
							            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPERROR"),
							            details: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPDETAILERROR")
							        });
							
							}
							else if(data1.ProcessTypes.length==1)
							{
							this.onlyOneProcessType=true;
							this.processType = data1.ProcessTypes[0].ProcessTypeCode;
							this.processTypeDesc = data1.ProcessTypes[0].Description;
							this.selectProcess();
							
							}
						else
							{
							
							
							this.oActionSheet = sap.ui.xmlfragment(
									"cus.crm.opportunity.view.ProcessTypeDialog",
							
									this);
							this.oActionSheet.setModel(this.getView().getModel(
							"i18n"), "i18n");
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(data1);
	                        this.oActionSheet.setModel(jsonModel,"json");
							this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
							this.oActionSheet._list.setGrowingScrollToLoad(true);
							this.oActionSheet._dialog.setVerticalScrolling(true);
							this.oActionSheet.open();
							
							}
				    },
					
					// Task Process Type Dialog when click on create a task button
				    
				    navToTaskDialog : function(oEvent) {
				    	
						 var oModel = this.getView().getModel();
						 
						 
						 var oGuid = this.byId('info').getModel('json').getData().Guid;
						 var oTransType = this.byId('info').getModel('json').getData().ProcessType;
						var data1;
						oModel.read("TaskFollowupTransTypes?Guid='"+ oGuid + "'&TransactionType='"+oTransType+"'",null,null,false,function(oData,resp) //[ "$filter=ProcessType eq '" + pType+ "'" ]
						{ 
				             data1 = {
				            		 ProcessTypes : resp.data.results
						    };
				            
						}); 
						 
				
						
						
						this.taskFlag=true;
						if(data1.ProcessTypes.length == 0)
						{ this.taskFlag=false;
							 sap.ca.ui.message.showMessageBox({
						            type: sap.ca.ui.message.Type.ERROR,
						            message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPERROR"),
						            details: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("FOLLOWUPDETAILERROR")
						        });
						
						}
						else if(data1.ProcessTypes.length==1)
						{
							this.onlyOneTaskProcessType=true;
							this.processType = data1.ProcessTypes[0].ProcessTypeCode;
							this.processTypeDesc = data1.ProcessTypes[0].Description;
							this.selectProcess();
						}
						else
						{
							/*this.oActionSheet = sap.ui.xmlfragment(
									"cus.crm.opportunity.view.ProcessTypeDialog",
							
									this);
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(data1);
				        this.oActionSheet.setModel(jsonModel,"json");
				     
				     
						this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
						this.oActionSheet._list.setGrowingScrollToLoad(true);
						
					
						this.oActionSheet._dialog.setVerticalScrolling(true);
					
						this.oActionSheet.open();*/

							this.oActionSheet = sap.ui.xmlfragment(
									"cus.crm.opportunity.view.ProcessTypeDialog",
							
									this);
							this.oActionSheet.setModel(this.getView().getModel(
							"i18n"), "i18n");
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(data1);
	                        this.oActionSheet.setModel(jsonModel,"json");
							this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
							this.oActionSheet._list.setGrowingScrollToLoad(true);
							this.oActionSheet._dialog.setVerticalScrolling(true);
							this.oActionSheet.open();
							
						
					// setting appointment flag to navigate to Appointment application	
						
						
						}
				    },
					
					
					selectProcess : function(oEvent) {
						
						//  Getting context path
						
						var headerGuid = this.byId('info').getModel('json').getData().Guid;
						var sPath = "/Opportunities(guid'" + headerGuid + "')";
						
									
						
						 // common parameters from opportunity to appointment
						//console.log("title="+this.byId('opportunityHeader').getModel('json').getData().Description);
						var opportunityId = this.byId('info').getModel('json').getData().Id;
						var status = this.byId('info').getModel('json').getData().UserStatusText;
						var StartDate = this.byId('info').getModel('json').getData().StartDate;
						var AccountId = this.byId('opportunityHeader').getModel('json').getData().ProspectNumber;
						var AccountName = this.byId('opportunityHeader').getModel('json').getData().ProspectName;
						var ContactId = this.byId('opportunityHeader').getModel('json').getData().MainContactId;
						var ContactName = this.byId('opportunityHeader').getModel('json').getData().MainContactName;
						var title=this.byId('opportunityHeader').getModel('json').getData().Description;
						var previousGuid = this.byId('opportunityHeader').getModel('json').getData().Guid ; 
						var EmpName = this.byId('opportunityHeader').getModel('json').getData().EmployeeResponsibleName ;
						var EmpNumber = this.byId('opportunityHeader').getModel('json').getData().EmployeeResponsibleNumber ;
						//var processTypeDescription = this.byId('opportunityHeader').getModel('json').getData().ProcessTypeDescription ;

						//console.log("AccountName"+AccountName+ "ContactName"+ContactName+"opportunity_id"+opportunityId+"status"+status+"StartDate"+StartDate+"ClosingDate"+ClosingDate);
						if(!(this.onlyOneAppointmentProcessType || this.onlyOneTaskProcessType||this.onlyOneProcessType) )
							
								{
								var selectedItem = oEvent.getParameter("selectedItem");
								if (selectedItem) {
									this.processType= selectedItem.data("ProcessTypeCode");
									this.processTypeDesc = selectedItem.data("ProcessTypeDescription");
									this.privateFlag = selectedItem.data("PrivateFlag");
								}
								}
						
					
						//	console.log("window location" + this.processType);
					//	console.log("window location" + oEvent);
				   
						//	var aItemPaths = this.getView().getBindingContext().sPath.substr(1);      
						
						

				    	// *XNav* (1) obtain cross app navigation interface         
				    	var fgetService =  sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;         
				    	this.oCrossAppNavigator = fgetService && fgetService("CrossApplicationNavigation");           
				    	//console.log("window location" +this.appointmentFlag);
				    
				        if(this.oppFlag)
				        	{
				        	 var ctx = this.byId('info').getModel('json').getData().Guid;
								this.oRouter.navTo("createFollowup", {
									contextPath : ctx,
									processType : this.processType,
									
								}, !jQuery.device.is.phone);
				        	
								this.oppFlag=false;
								/*var message = sap.ca.scfld.md.app.Application
								.getImpl().getResourceBundle()
								.getText(
								"followupsuccess");
							     sap.m.MessageToast.show(message, {
								   closeOnBrowserNavigation : false
							});*/
				        	}
				    	
				    	
				    	
				        else if(this.appointmentFlag){
				    		
				       	// *XNav (2) generate cross application link         
				    	var toApp = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({ 
				    		target: { 
				    		//	semanticObject : "Appointment", 
				    		//action: "myAppointments"
				    			semanticObject : "Appointment", 
				    			action: "myAppointments"
				    		},
				    		// TODO
				    		// appSpecificRoute : ""
				    		params : { 
				    			"createFromOppt" : "X",
				    			"AccountName" : AccountName,
				    			"ContactName" : ContactName,
				    			"processType"  	 : this.processType,
				    			"selectprocess_oEvent" : oEvent,
				    			"opportunityId":opportunityId,
				    			"StartDate":StartDate,
				    			"title":title,               
				    			"prevGuid" : previousGuid,
				    			"processTypeDescription" : this.processTypeDesc , 
				    			"AccountID" : AccountId,
			        			"ContactID" : ContactId,
			        			"EmpID"    : EmpNumber , 
			        			"EmpName" : EmpName,
			        			"privateFlag" : this.privateFlag
				    			
				    			// "itemPaths" : aItemPaths
				    		}
				    	}) || "";           
				    	
				    	this.appointmentFlag=false;
				    	this.onlyOneAppointmentProcessType=false;
				    	//Navigate to the target         
				    	window.location = toApp ;
				    	/*var message = sap.ca.scfld.md.app.Application
						.getImpl().getResourceBundle()
						.getText(
						"followupsuccess");
					     sap.m.MessageToast.show(message, {
						   closeOnBrowserNavigation : false
					});*/
							    	
				    	}
				    		
				    	else if(this.taskFlag)
				    		{
				    		// *XNav (2) generate cross application link         
				        	var toApp = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({ 
				        		target: { 
				        			//semanticObject : "Appointment", 
				        			//action: "myAppointments"
				        			semanticObject : "Task", 
				        			action: "manageTasks"
				        		},                                                                                                     
				        		params : { 
				        			"createFromOppt" : "X",
				        			"AccountId" : AccountId,
				        			"AccountName" : AccountName,
				        			"ContactId" : ContactId,
				        			"ContactName" : ContactName,
				        			"processType"  	 : this.processType,
				        			"opportunityId":opportunityId,
				        			"title":title,
				        			"opportunityGuid" : previousGuid,
				        			"ProcessTypeDescription" : this.processTypeDesc
				        			// "itemPaths" : aItemPaths
				        		},
				        		appSpecificRoute : [ "&",
														"newTask",
														this.processType ]
														.join("/")
				        	}) || "";           
				        	
				        	this.taskFlag=false;
				        	this.onlyOneTaskProcessType=false;
				        	//Navigate to the target         
				        	window.location = toApp ; 
				        	//
				        	/*var message = sap.ca.scfld.md.app.Application
							.getImpl().getResourceBundle()
							.getText(
							"followupsuccess");
						     sap.m.MessageToast.show(message, {
							   closeOnBrowserNavigation : false
						});*/
				    		
				    		}
				 
				    },
					

					
					
					/*navToTasks : function(oEvent) {
						// var aItemPaths = this._getSelectedItemPaths();

						// *XNav* (1) obtain cross app navigation interface
						var fgetService = sap.ushell && sap.ushell.Container
								&& sap.ushell.Container.getService;
						this.oCrossAppNavigator = fgetService
								&& fgetService("CrossApplicationNavigation");

						// *XNav (2) generate cross application link
						var toApp = this.oCrossAppNavigator
								&& this.oCrossAppNavigator.hrefForExternal({
									target : {
										semanticObject : "Task",
										action : "manageTasks"
									},
									params : {
										"createFromNote" : "X",

									}
								}) || "";

						// Navigate to the target
						window.location = toApp;
					},

					navToAppointments : function(oEvent) {
						var headerGuid = this.byId('info').getModel('json')
								.getData().Guid
						var sPath = "/Opportunities(guid'" + headerGuid + "')";
						// var aItemPaths =
						// this.getView().getBindingContext().sPath.substr(1);

						// *XNav* (1) obtain cross app navigation interface
						var fgetService = sap.ushell && sap.ushell.Container
								&& sap.ushell.Container.getService;
						this.oCrossAppNavigator = fgetService
								&& fgetService("CrossApplicationNavigation");

						// *XNav (2) generate cross application link
						var toApp = this.oCrossAppNavigator
								&& this.oCrossAppNavigator.hrefForExternal({
									target : {
										semanticObject : "Appointment",
										action : "myAppointments"
									},
									params : {
										"createFromNote" : "X",
									// "itemPaths" : aItemPaths
									}
								}) || "";

						// Navigate to the target
						window.location = toApp;
					},
*/
					getS4Controller : function() {
						
						return this.getView().getModel('controllers').getData().s4Controller;

					},

					setDefaultTabToInfo : function() {
						// always default the tab to info whenever the s3 view
						// loads
						var oTabContainer = this.byId('icntab');
						if (oTabContainer
								&& oTabContainer.getItems().length > 0) {
							if (oTabContainer.getSelectedKey() !== "info")
								oTabContainer.setSelectedKey("Info");
							oTabContainer.setExpanded(true);
						}
					},

					isMainScreen : function() {
						return false;
					},

					_getDiscussID : function() {
						var url = document.createElement('a');
						url.href = this.getView().getModel().sServiceUrl;
						var headerGuid = this.byId('info').getModel('json')
								.getData().Guid;
						var sPath = "/Opportunities(guid'" + headerGuid + "')";
						return url.pathname + sPath;
					},

					_getDiscussType : function() {
						var url = document.createElement('a');
						url.href = this.getView().getModel().sServiceUrl;
						return url.pathname + "/$metadata#Opportunities";
					},

					_getShareDisplay : function() {
						var desc = this.byId('info').getModel('json').getData().Description;
						var volume = this.byId('info').getModel('json')
								.getData().ExpectedSalesVolume;
						var currencyCode = this.byId('info').getModel('json')
								.getData().CurrencyCode;
						var prospectname = this.byId('info').getModel('json')
								.getData().ProspectName;
						var clDate = cus.crm.opportunity.util.Formatter
								.dateFormatter(this.byId('info').getModel(
										'json').getData().ClosingDate);
						var usertext = this.byId('info').getModel('json')
								.getData().UserStatusText;
						var object = new sap.m.ObjectListItem({
							title : desc,
							number : volume,
							numberUnit : currencyCode,
							attributes : [ new sap.m.ObjectAttribute({
								text : prospectname
							}), new sap.m.ObjectAttribute({
								text : clDate
							}) ],
							firstStatus : new sap.m.ObjectStatus({
								text : usertext
							}),
						});
						return object;

					},

					/*
					 * Initialize scaffolding buttons
					 */
					getHeaderFooterOptions : function() {
						if (
								 this.oRouter._oRouter._prevMatchedRequest
										.indexOf('detailonly/') > -1
								&& sap.ui.core.routing.History.getInstance()._iHistoryPosition > 0) {
							this.oHeaderFooterOptions.onBack = jQuery.proxy(
									function(oEvent) {
										this._navBack();
									}, this);
						}
						
						//add bookmark settings (Save as Tile)
						this.oHeaderFooterOptions.oAddBookmarkSettings = {
								icon : "sap-icon://Fiori2/F0004"
						};
						if(jQuery.device.is.phone && !this.fullScreenMode)
							this.oHeaderFooterOptions.onBack =  this._getBackFunction();
						else 
							if(jQuery.device.is.phone && this.fullScreenMode)
								this.oHeaderFooterOptions.onBack = this._getBackFunction();
							else if(!jQuery.device.is.phone && this.fullScreenMode)
								this.oHeaderFooterOptions.onBack = this._getBackFunction();
							else 
								this.oHeaderFooterOptions.onBack = null;
						
						
						
						//this.oHeaderFooterOptions.onBack = (jQuery.device.is.phone || this.fullScreenMode) ?  this._getBackFunction() : null  ;
						this.extendHeaderFooterOptions(this.oHeaderFooterOptions);
						return this.oHeaderFooterOptions;
					},

					extendHeaderFooterOptions : function(oHeaderFooterOptions) {
					},

					navToSubview : function() {
						
						this.oRouter.navTo("subDetail",
								{
									contextPath : this.getView()
											.getBindingContext().sPath
											.substr(1)
								}, !jQuery.device.is.phone);
						
						
						
					},
					navToEmpty : function() {
						this.oRouter.navTo("noData", {
							viewTitle : "DETAIL_TITLE",
							languageKey : "NO_ITEMS_AVAILABLE"
						});
					},

					/* Calling Expand based on selected tab */
					selectedTab : function(oControlEvent) {
						var oModel = this.getView().getModel();
						var tab_selection = oControlEvent.getSource().getSelectedKey();
						if (this.byId('info').getModel('json'))
							var headerGuid = this.byId('info').getModel('json')
									.getData().Guid;
						var sPath = "/Opportunities(guid'" + headerGuid + "')";

						/* When Note tab is selected */
						if (tab_selection == "Notes") {
							;
							var that = this;
							oModel
									.read(
											sPath,
											null,
											[ "$expand=Notes" ],
											true,
											function(odata, response) {
												var tab = that.getView().byId(
														"notesList");
												var jsonModel = new sap.ui.model.json.JSONModel();
												var data1 = {
													OpportunityNotesSet : response.data.Notes.results
												};
												jsonModel.setData(data1);
												tab.setModel(jsonModel, "json");

											});

						}
						/* When Sales team tab is selected */
						if (tab_selection == "Parties Involved") {
							var data1;
							var oLogo = [];
							var that = this;
							this.byId("Sales_Team").setNoDataText((this.oResourceBundle.getText('LOADING_TEXT')));
						if(parseFloat(this.sBackendVersion) >= 2.0)	{
							this.partnerFunctionMap = {};
							//this.transactionType = this.oModel.getContext("/" + this.sPath).getObject().ProcessType;
							var s3Header = this.byId('S3_Header');
							this.transactionType = s3Header.getModel('json').getData().ProcessType;
							if(!this.partnerDeterminationMap[this.transactionType]){
								
								
								this.oModel.read("OpptPartnerFctTypes",null,["TransactionType='" + this.transactionType +"'"],false,jQuery.proxy(function(odata,response){
				            			
				            		this.partnerDeterminationMap[this.transactionType] = response.data.results;
				            	},this),jQuery.proxy(function(oError){},this));
							
							}
						}
							oModel
									.read(
											sPath,
											null,
											[ "$expand=SalesTeam" ],
											true,
											function(odata, response) {
												var tab = that.getView().byId(
														"Sales_Team");
												var jsonModel = new sap.ui.model.json.JSONModel();
												// NLUN - CodeScan Changes -
												// Global variables
												that.oVersioningModel.getData().setHeaderTextForParticipants(response);
												data1 = {
													OpportunitySalesTeamSet : response.data.SalesTeam.results
												};
												
												that.oVersioningModel.getData().setHeaderTextForParticipants(response);

												if (data1.OpportunitySalesTeamSet.length == 0) {
													that.byId("Sales_Team").setNoDataText
													(that.oResourceBundle.getText(that.oVersioningModel.getData().sParticipantsNoDataTextKey));
													}

												var aBatchReads = [];

												for ( var i = 0; i < data1.OpportunitySalesTeamSet.length; i++) {
													var partnerID = data1.OpportunitySalesTeamSet[i].PartnerNumber;
													var sPath = "/AccountCollection('"
															+ partnerID
															+ "')?$expand=Logo";
													oLogo[i] = "sap-icon://person-placeholder";
													aBatchReads
															.push(oModel
																	.createBatchOperation(
																			sPath,
																			"GET"));
												}
												;
												oModel
														.addBatchReadOperations(aBatchReads);
												oModel
														.submitBatch(
																jQuery
																		.proxy(
																				function(
																						oResponses) {
																					for ( var j = 0; j < data1.OpportunitySalesTeamSet.length; j++) {
																						if(!oResponses.__batchResponses[j].hasOwnProperty("data")){
																							oLogo[j] = "sap-icon://person-placeholder";
																						}
																						else{
																						if (oResponses.__batchResponses[j].data) {
																							if (oResponses.__batchResponses[j].data.Logo
																									&& oResponses.__batchResponses[j].data.Logo.__metadata.media_src) {
																								var oMetadata = oResponses.__batchResponses[j].data.Logo.__metadata.media_src ? oResponses.__batchResponses[j].data.Logo.__metadata.media_src
																										: "sap-icon://person-placeholder";
																								var URl = oMetadata;
																								oLogo[j] = URl
																										.toString();
																							}
																						}
																						}
																						data1.OpportunitySalesTeamSet[j].ImgSrc = oLogo[j];
																						that.mPartnerImgSrc[data1.OpportunitySalesTeamSet[j].PartnerNumber] = oLogo[j];
																					}

																					jsonModel
																							.setData(data1);
																					tab
																							.setModel(
																									jsonModel,
																									"json");

																				},
																				this),
																jQuery
																		.proxy(
																				function(
																						oError) {
																					sap.m.MessageToast
																							.show(sap.ca.scfld.md.app.Application
																									.getImpl()
																									.getResourceBundle()
																									.getText(
																											'ERROR'));
																				},
																				this),
																true);

											});
						}
						/* When Sales team tab is selected */
						if (tab_selection == "Competitors") {

							var data1;
							var oLogo = [];
							var that = this;
							this.byId("competitors").setNoDataText(
									sap.ca.scfld.md.app.Application.getImpl()
											.getResourceBundle().getText(
													'LOADING_TEXT'));
							oModel
									.read(
											sPath,
											null,
											[ "$expand=Competitors" ],
											true,
											function(odata, response) {
												var tab = that.getView().byId(
														"competitors");
												var jsonModel = new sap.ui.model.json.JSONModel();
												// NLUN - CodeScan Changes -
												// Global variables
												data1 = {
													OpportunityCompetitors : response.data.Competitors.results
												};

												if (data1.OpportunityCompetitors.length == 0) {
													that
															.byId("competitors")
															.setNoDataText(
																	sap.ca.scfld.md.app.Application
																			.getImpl()
																			.getResourceBundle()
																			.getText(
																					'NOCOMPETITORS'));
												}

												for ( var i = 0; i < data1.OpportunityCompetitors.length; i++) {
													var accountID = data1.OpportunityCompetitors[i].PartnerNumber;
													var sPath = "/AccountCollection('"
															+ accountID + "')";
													oLogo[i] = "sap-icon://person-placeholder";
													oModel
															.read(
																	sPath,
																	null,
																	[ "$expand=Logo" ],
																	false,
																	function(
																			odata,
																			response) {
																		jQuery.sap.log
																				.info("oData account response");
																		if (odata.Logo
																				&& odata.Logo.__metadata) {
																			// defaul
																			// account
																			// log
																			// tbd
																			var oMetadata = odata.Logo.__metadata.media_src ? odata.Logo.__metadata.media_src
																					: "sap-icon://person-placeholder";
																			// oLogo
																			// =
																			// cus.crm.opportunity.util.Formatter.urlConverter(oMetadata);
																			var URl = oMetadata;
																			oLogo[i] = URl
																					.toString();
																		}
																	});
													data1.OpportunityCompetitors[i].ImgSrc = oLogo[i];
												}
												;

												jsonModel.setData(data1);
												tab.setModel(jsonModel, "json");
											});
						}

						/* When attachemnt tab is selected */
						if (tab_selection == "Attachments") {
							var info = this.getView().byId('info');

							// get the list to set the post url param
							var that = this.getView();
							var file = that.byId("fileupload");
							if (file.getEditMode() === true)
								file.setEditMode(false);
							// refresh to get xcsrf Token
							oModel.refreshSecurityToken();
							// get token
							var oModelHeaders = oModel.getHeaders();
							file.setXsrfToken(oModelHeaders['x-csrf-token']);

							// remove - from guid
							var nheaderGuid = headerGuid.replace(/-/g, '');
							// set custom header
							file.setCustomHeader("slug", nheaderGuid);

							oModel
									.read(
											sPath,
											null,
											[ "$expand=Attachments" ],
											true,
											function(odata, response) {
												var data = {
													OpportunityAttachments : []
												};
												var length = response.data.Attachments.results.length;
												// NLUN - CodeScan Changes -
												// Global variables
												for ( var i = 0; i < length; i++) {
													
													var value = response.data.Attachments.results[i];
													var attachmentUrl = response.data.Attachments.results[i].Url;
													var URL = value.__metadata.media_src;
													// URL =
													// URL.replace(/^https:\/\//i,
													// 'http://');
													var o = {
														name : value.Name,
														size : value.fileSize,
														url :  (attachmentUrl === "") ? URL : attachmentUrl,
														uploadedDate : 
																value.CreatedAt,
														contributor : value.CreatedBy,
														fileExtension : cus.crm.opportunity.util.Formatter
																.mimeTypeFormatter(value.MimeType),
														fileId : value.DocumentId,
														media_src : value.__metadata.media_src

													};
													data.OpportunityAttachments
															.push(o);
												}

												that
														.byId('fileupload')
														.setModel(
																new sap.ui.model.json.JSONModel(
																		data));

											});

						}
						//EXTENSION POINT to be able to extend added tabs
						/**
						 * @ControllerHook extHookSelectedTab is the controller hook that provides for extension of newly added custom tabs.
						 *                                   
						 * @callback cus.crm.opportunity.S3.controller~extHookSelectedTab
						 * @param {object}
						 *           oControlEvent
						 * @return {void}
						 */
						if (this.extHookSelectedTab){
							this.extHookSelectedTab(oControlEvent);
						}
					},

					/* Add Note handling */
					_handleAddNote : function(oEvent) {
						var that = this;
						var sText = oEvent.getParameter("value");
						if (sText) {
							var oModel = this.getView().getModel();
							// get header guid
							var headerGuid = this.byId('info').getModel('json')
									.getData().Guid;
							var oEntry = {
								HeaderGuid : headerGuid,
								Content : sText,
							};
							oModel.refreshSecurityToken();
							oModel
									.create(
											'/OpportunityNotesSet',
											oEntry,
											null,
											function() {
											},
											function(oMessage) {
												that
														.displayResponseErrorMessage(
																oMessage,
																sap.ca.scfld.md.app.Application
																		.getImpl()
																		.getResourceBundle()
																		.getText(
																				'SAVE_FAILED'));
											});
							// oModel.refresh(); //did not bring the new note
							// Calling expand again to get the new note
							var that = this;
							var sPath = "/Opportunities(guid'" + headerGuid
									+ "')";
							oModel
									.read(
											sPath,
											null,
											[ "$expand=Notes" ],
											true,
											function(odata, response) {
												var tab = that.getView().byId(
														"notesList");
												var jsonModel = new sap.ui.model.json.JSONModel();
												// NLUN - CodeScan Changes -
												// Global variables
												var data1 = {
													OpportunityNotesSet : response.data.Notes.results
												};
												jsonModel.setData(data1);
												tab.setModel(jsonModel, "json");

											});

						}
					},

					displayResponseErrorMessage : function(oMessage,
							sDefaultMessage) {
						var sMessage;
						if (oMessage.response) {
							sMessage = jQuery.parseJSON(oMessage.response.body).error.message.value;
						}
						sap.m.MessageBox.alert(sMessage || sDefaultMessage);
					},

					
					onFileUploadFailed : function(e) {
						
						 var responseString = e.mParameters.response.jqXHR.responseText;
						 var json = JSON.parse(responseString);
						 
				        sap.ca.ui.message.showMessageBox({
				            type: sap.ca.ui.message.Type.ERROR,
				            message: json.error.message.value
				            
				        });
				   },

					// Handle the response once file is uploaded
					onUploadFile : function(oResponse) {
						// get uloaded data
						var oFile ;
						if (oResponse.getParameters() && oResponse.getParameters().d)
							oFile = oResponse.getParameters().d;
							else
							oFile= oResponse.getParameters();
					//	var oFile = oResponse.getParameter("d");
						// in url replace https to http
						var URL;
						if(oFile.__metadata.media_src)
						 URL = oFile.__metadata.media_src;
						else 
							URL = oFile.url;

						// date in correct formate
						var date = parseInt((oFile.CreatedAt).substr(6));

						var fName = decodeURIComponent(oFile.Name);
						// set the object
						// NLUN - CodeScan Changes - Global Variables
						var object = {

							"fileExtension" : cus.crm.opportunity.util.Formatter
									.mimeTypeFormatter(oFile.MimeType),
							"contributor" : oFile.CreatedBy,
							"uploadedDate" : 
									new Date(date),
							"name" : fName,
							"url" : URL,
							"size" : oFile.fileSize,
							"fileId" : oFile.DocumentId,
							"media_src" : oFile.__metadata.media_src,
						};

						// commit change
						this.byId('fileupload').commitFileUpload(object);
					},

					changeToString : function(val) {
						// val=val.replace(/\+/g, '%20');
						var str = val.split("%");
						var cval = str[0];
						for ( var i = 1; i < str.length; i++) {
							cval += String.fromCharCode(parseInt(str[i]
									.substring(0, 2), 16))
									+ str[i].substring(2);
						}
						return cval;
					},

					// On click of Edit
					onEdit : function() {
						var ctx1 = this.byId('info').getModel('json').getData().Guid;
						var ctx = "Opportunities(guid'" + ctx1 + "')" ;
						
						var that = this;
						
						var oModel = this.oModel;
						
						this.sBackendVersion = cus.crm.opportunity.util.schema._getServiceSchemaVersion(this.oModel,"Opportunity");
						
						if(parseFloat(this.sBackendVersion) >= 3){
						oModel.read("EditAuthorizationCheck", null, {
							ObjectGuid :oModel.formatValue(ctx1,
							"Edm.Guid")},
								false, function(oData, resp){
									if(resp.data.EditAuthorizationCheck.ActionSuccessful == "X"){
										if(!that.fullScreenMode)
										{
										  that.oRouter.navTo("subDetail", {
										   contextPath : ctx
									     }, !jQuery.device.is.phone);}
								         else 
										{
								        	that.oRouter.navTo("edit", {
											contextPath : ctx
										}, !jQuery.device.is.phone);								
										} 
									}
									else{
										sap.ca.ui.message.showMessageBox({
											type : sap.ca.ui.message.Type.ERROR,
											message : resp.data.EditAuthorizationCheck.Message,
											details : null
										});
									}		
								},null);
						}
						else{
							if(!that.fullScreenMode)
							{
							  that.oRouter.navTo("subDetail", {
							   contextPath : ctx
						     }, !jQuery.device.is.phone);}
					         else 
							{
					        	that.oRouter.navTo("edit", {
								contextPath : ctx
							}, !jQuery.device.is.phone);								
							} 
						}
						
					},

					// On Log Change
					onLogChange : function(oEvent) {
						var oModel = this.getView().getModel();
						var data;
						var headerGuid = this.byId('info').getModel('json')
								.getData().Guid;
						var sPath = "/Opportunities(guid'" + headerGuid + "')";
						this.changeLogFragment.getContent()[0]
								.setNoDataText(sap.ca.scfld.md.app.Application
										.getImpl().getResourceBundle().getText(
												'LOG_CHANGE'));
						this.changeLogFragment.setModel(oEvent.getSource()
								.getModel("i18n"), "i18n");
						this.changeLogFragment.getModel().setData({
							OpportunitySalesTeamSet : []
						});
						var that = this;
						oModel
								.read(
										sPath,
										null,
										[ "$expand=ChangeDocs" ],
										true,
										function(odata, response) {

											data = {
												OpportunityChangeDocs : response.data.ChangeDocs.results
											};
											that.changeLogFragment.getModel()
													.setData(data);
											if (data.OpportunityChangeDocs.length == 0) {
												that.changeLogFragment
														.getContent()[0]
														.setNoDataText(sap.ca.scfld.md.app.Application
																.getImpl()
																.getResourceBundle()
																.getText(
																		'NOLOGCHANGE'));
											}

										});

						this.changeLogFragment.open(oEvent);

					},

					// Cancel of change log
					onCancelLogChange : function(oEvent) {
						this.changeLogFragment.close();

					},
					
					onEmpBusCardLaunch : function(oEvt){

						if (oEvt.oSource.data("PartnerNumber") !== '') {
							var sPath = "/EmployeeCollection('" + oEvt.oSource.data("PartnerNumber") + "')";
							var sURLparameters = "$expand=WorkAddress,Company,Photo";
							var oSource = oEvt.getSource();
							var that = this;
							this.oModel.read(sPath, null, [sURLparameters], true, function(odata, response) {
								jQuery.sap.log.info("oData employee response");

								// initializing the attributes used for the business card
								var oTitle = that.oResourceBundle.getText("EMPLOYEE");
								var oEmployeeMobile = "";
								var oEmployeePhone = "";
								var oEmployeeEmail = "";
								var oEmployeeDepartment = "";
								var oCompanyAddress = "";
								var oCompanyName = "";
								var oEmployeeName = "";
								var oPhoto = "";

								if (odata.WorkAddress) {
									oEmployeeMobile = odata.WorkAddress.mobilePhone;
									oEmployeePhone = odata.WorkAddress.phone;
									oEmployeeEmail = odata.WorkAddress.email;
									oEmployeeDepartment = odata.WorkAddress.department;
									oCompanyAddress = odata.WorkAddress.address;
								}
								// get company name
								if (odata.Company && odata.Company.name1) {
									oCompanyName = odata.Company.name1;
								}
								if (odata.fullName && odata.fullName !== "") {
									oEmployeeName = odata.fullName;
								}
								// get employee photo
								if (odata.Photo && odata.Photo.__metadata) {
									var oMetadata = cus.crm.opportunity.util.Formatter.formatPhotoUrl(odata.Photo.__metadata.media_src);
									oPhoto = cus.crm.opportunity.util.Formatter.urlConverter(oMetadata);
								}
								var oEmpConfig = {
									title : oTitle,
									name : oEmployeeName,
									imgurl : oPhoto,
									department : oEmployeeDepartment,
									contactmobile : oEmployeeMobile,
									contactphone : oEmployeePhone,
									contactemail : oEmployeeEmail,
									contactemailsubj : "",
									companyname : oCompanyName,
									companyaddress : oCompanyAddress
								};
								// call 'Business Card' reuse component
								var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(oEmpConfig);
								oEmployeeLaunch.openBy(oSource);
							}, function(oError) {
								jQuery.sap.log.error("oData request for employee failed");
							});
						}
						
					
					},

					onEmployeeLaunchheader : function(oEvent) {
						var contactId = oEvent.oSource.data("PartnerNumber");
						var sPath = "/AccountCollection('" + contactId + "')";
						var oLogo = "sap-icon://person-placeholder";

						var oModel2 = this.getView().getModel();
						oModel2
								.read(
										sPath,
										null,
										[ "$expand=Logo" ],
										false,
										function(odata, response) {
											jQuery.sap.log
													.info("oData account response");
											if (odata.Logo
													&& odata.Logo.__metadata) {
												var oMetadata = odata.Logo.__metadata.media_src ? odata.Logo.__metadata.media_src
														: "sap-icon://person-placeholder";
												//var URl = oMetadata.replace(
												//		/^https:\/\//i,
													//	'http://');
												oLogo = oMetadata.toString();
											}

										});

						var oModel = this.getView().getModel();
						var accountId = this.byId('info').getModel('json')
								.getData().ProspectNumber;
						var event = oEvent.getSource();
						var PartnerFunctionCode = oEvent.oSource 
								.data("PartnerFunctionCode");
						var Image = oLogo;

						if (accountId && contactId) {

							this.AccountId = accountId;
							this.ContactId = contactId;

							var sPath = "/ContactCollection(accountID='"
									+ accountId
									+ "',contactID='"
									+ contactId
									+ "')?$expand=WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress" ;

							var aBatchReads = [];

							aBatchReads.push(oModel.createBatchOperation(sPath,
									"GET"));

							oModel.addBatchReadOperations(aBatchReads);

							oModel
									.submitBatch(
											jQuery
													.proxy(
															function(oResponses) {

																var data = {
																	Value : ""
																};
																data.Value = oResponses.__batchResponses[0].data;

																var fnCallbackNavPara = jQuery
																		.proxy(
																				function(
																						oEvent) {

																					var oNavConfig = {};
																					oNavConfig.target = {};
																					oNavConfig.target.semanticObject = "ContactPerson";
																					oNavConfig.target.action = "MyContacts";
																					oNavConfig.params = {
																						accountID : this.AccountId,
																						contactID : this.ContactId,
																					};
																					this.navToOtherApp = false;

																					return oNavConfig;

																				},
																				this);

																if (data.Value.Account) {
																	if (data.Value.Account.MainContact) {
																		if (data.Value.Account.MainContact.WorkAddress) {
																			if (data.Value.WorkAddress) {
																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : Image,
																							companyphone : data.Value.Account.MainAddress.phone,
																							maincontactname : data.Value.Account.MainContact.fullName,
																							maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																							maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																							maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// Only
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																							maincontactname : data.Value.Account.MainContact.fullName,
																							maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																							maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																							maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(oEvent
																									.getSource());
																				}
																			}
																			// work
																			// address
																			// is
																			// null
																			// and
																			// check
																			// main
																			// address
																			else {

																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",
																							companyphone : data.Value.Account.MainAddress.phone,
																							maincontactname : data.Value.Account.MainContact.fullName,
																							maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																							maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																							maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// work
																				// address
																				// and
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,

																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,

																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																							maincontactname : data.Value.Account.MainContact.fullName,
																							maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																							maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																							maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}

																			}

																		}
																		// main
																		// contact's
																		// work
																		// address
																		// is
																		// null
																		// and
																		// check
																		// work
																		// address
																		// and
																		// main
																		// address
																		else {
																			if (data.Value.WorkAddress) {

																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",
																							companyphone : data.Value.Account.MainAddress.phone,
																							maincontactname : data.Value.Account.MainContact.fullName,

																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// main
																				// contact's
																				// work
																				// address
																				// is
																				// null
																				// and
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,

																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																							maincontactname : data.Value.Account.MainContact.fullName,

																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}

																			}
																			// work
																			// address
																			// is
																			// null
																			// and
																			// main
																			// contacts
																			// work
																			// address
																			// is
																			// also
																			// null
																			// ,
																			// check
																			// for
																			// main
																			// address
																			else {
																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",
																							companyphone : data.Value.Account.MainAddress.phone,
																							maincontactname : data.Value.Account.MainContact.fullName,

																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// main
																				// contacts
																				// work
																				// address
																				// is
																				// null
																				// and
																				// work
																				// address
																				// and
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,

																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,

																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																							maincontactname : data.Value.Account.MainContact.fullName,

																							maincontactemailsubj : "Automatic Mail for Maincontact",
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}

																			}
																		}

																	}
																	// account
																	// != null
																	// and
																	// maincontact
																	// is null
																	// and so is
																	// main
																	// contact's
																	// work
																	// address
																	// and work
																	// address
																	// and main
																	// address

																	// main
																	// contact's
																	// work
																	// address
																	// is null
																	// and check
																	// work
																	// address
																	// and main
																	// address
																	else {
																		if (data.Value.WorkAddress) {

																			if (data.Value.Account.MainAddress) {
																				var oEmpConfig = {
																					title : "Contact",
																					name : data.Value.fullName,
																					imgurl : Image,
																					department : data.Value.department,
																					contactmobile : data.Value.WorkAddress.mobilePhone,
																					contactphone : data.Value.WorkAddress.phone,
																					contactemail : data.Value.WorkAddress.email,
																					contactemailsubj : "App Genrated Mail",
																					companyname : data.Value.Account.name1,
																					companyaddress : data.Value.Account.MainAddress.address,
																					beforeExtNav : fnCallbackNavPara,
																					// optional:
																					// if
																					// the
																					// following
																					// attributes
																					// are
																					// provided
																					// - a
																					// link
																					// to
																					// company
																					// card
																					// is
																					// available
																					companycard : {
																						title : "Account",
																						imgurl : "sap-icon://person-placeholder",
																						companyphone : data.Value.Account.MainAddress.phone,
																					}
																				};

																				// call
																				// 'Business
																				// Card'
																				// reuse
																				// component
																				var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																						oEmpConfig);
																				oEmployeeLaunch
																						.openBy(event);
																			}
																			// Only
																			// Mainaddress
																			// is
																			// null
																			else {
																				var oEmpConfig = {
																					title : "Contact",
																					name : data.Value.fullName,
																					imgurl : Image,
																					department : data.Value.department,
																					contactmobile : data.Value.WorkAddress.mobilePhone,
																					contactphone : data.Value.WorkAddress.phone,
																					contactemail : data.Value.WorkAddress.email,
																					contactemailsubj : "App Genrated Mail",
																					companyname : data.Value.Account.name1,
																					beforeExtNav : fnCallbackNavPara,

																					// optional:
																					// if
																					// the
																					// following
																					// attributes
																					// are
																					// provided
																					// - a
																					// link
																					// to
																					// company
																					// card
																					// is
																					// available
																					companycard : {
																						title : "Account",
																						imgurl : "sap-icon://person-placeholder",

																					}
																				};

																				// call
																				// 'Business
																				// Card'
																				// reuse
																				// component
																				var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																						oEmpConfig);
																				oEmployeeLaunch
																						.openBy(event);
																			}

																		}
																		//
																		else {
																			if (data.Value.Account.MainAddress) {
																				var oEmpConfig = {
																					title : "Contact",
																					name : data.Value.fullName,
																					imgurl : Image,
																					department : data.Value.department,
																					contactemailsubj : "App Genrated Mail",
																					companyname : data.Value.Account.name1,
																					companyaddress : data.Value.Account.MainAddress.address,
																					beforeExtNav : fnCallbackNavPara,
																					// optional:
																					// if
																					// the
																					// following
																					// attributes
																					// are
																					// provided
																					// - a
																					// link
																					// to
																					// company
																					// card
																					// is
																					// available
																					companycard : {
																						title : "Account",
																						imgurl : "sap-icon://person-placeholder",
																						companyphone : data.Value.Account.MainAddress.phone,

																					}
																				};

																				// call
																				// 'Business
																				// Card'
																				// reuse
																				// component
																				var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																						oEmpConfig);
																				oEmployeeLaunch
																						.openBy(event);
																			}
																			// work
																			// address
																			// and
																			// Mainaddress
																			// is
																			// null
																			else {
																				var oEmpConfig = {
																					title : "Contact",
																					name : data.Value.fullName,
																					imgurl : Image,
																					department : data.Value.department,

																					contactemailsubj : "App Genrated Mail",
																					companyname : data.Value.Account.name1,
																					beforeExtNav : fnCallbackNavPara,

																					// optional:
																					// if
																					// the
																					// following
																					// attributes
																					// are
																					// provided
																					// - a
																					// link
																					// to
																					// company
																					// card
																					// is
																					// available
																					companycard : {
																						title : "Account",
																						imgurl : "sap-icon://person-placeholder",

																					}
																				};

																				// call
																				// 'Business
																				// Card'
																				// reuse
																				// component
																				var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																						oEmpConfig);
																				oEmployeeLaunch
																						.openBy(event);
																			}
																		}
																	}

																} else {
																	sap.m.MessageToast
																			.show(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NOT_IN_MAIN_CONTACT'));
																}
															}, this),
											jQuery
													.proxy(
															function(oError) {
																sap.m.MessageToast
																		.show(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NOT_IN_MAIN_CONTACT'));
															}, this), true);
						}

						else {
							sap.m.MessageToast
									.show(sap.ca.scfld.md.app.Application
											.getImpl().getResourceBundle()
											.getText('NOT_IN_MAIN_CONTACT'));
						}
					},

					onEmployeeLaunch : function(oEvent) {
						var oModel = this.getView().getModel();
						var accountId = this.byId('info').getModel('json')
								.getData().ProspectNumber;
						var event = oEvent.getSource();
						var contactId = oEvent.oSource.data("PartnerNumber");
						var PartnerFunctionCode = oEvent.oSource
								.data("PartnerFunctionCode");
						var Image = oEvent.oSource.data("Image");
						if (PartnerFunctionCode == "00000015") {
							var data;
							if (accountId && contactId) {
								this.AccountId = accountId;
								this.ContactId = contactId;

								var sPath = "/ContactCollection(accountID='" + accountId + "',contactID='"+ contactId+"')?$expand=" +
										"WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress";

								var aBatchReads = [];

								aBatchReads.push(oModel.createBatchOperation(
										sPath, "GET"));

								oModel.addBatchReadOperations(aBatchReads);

								oModel
										.submitBatch(
												jQuery
														.proxy(
																function(
																		oResponses) {

																	var data = {
																		Value : ""
																	};
																	data.Value = oResponses.__batchResponses[0].data;

																	var fnCallbackNavPara = jQuery
																			.proxy(
																					function(
																							oEvent) {

																						var oNavConfig = {};
																						oNavConfig.target = {};
																						oNavConfig.target.semanticObject = "ContactPerson";
																						oNavConfig.target.action = "MyContacts";
																						oNavConfig.params = {
																							accountID : this.AccountId,
																							contactID : this.ContactId,
																						};
																						this.navToOtherApp = true;

																						this.oRouter
																								.detachRouteMatched(
																										this.detailRouteMatched,
																										this);
																						return oNavConfig;

																					},
																					this);

																	if (data.Value.Account) {
																		if (data.Value.Account.MainContact) {
																			if (data.Value.Account.MainContact.WorkAddress) {
																				if (data.Value.WorkAddress) {
																					if (data.Value.Account.MainAddress) {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactmobile : data.Value.WorkAddress.mobilePhone,
																							contactphone : data.Value.WorkAddress.phone,
																							contactemail : data.Value.WorkAddress.email,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							companyaddress : data.Value.Account.MainAddress.address,
																							beforeExtNav : fnCallbackNavPara,
																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : Image,
																								companyphone : data.Value.Account.MainAddress.phone,
																								maincontactname : data.Value.Account.MainContact.fullName,
																								maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																								maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																								maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																					// Only
																					// Mainaddress
																					// is
																					// null
																					else {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactmobile : data.Value.WorkAddress.mobilePhone,
																							contactphone : data.Value.WorkAddress.phone,
																							contactemail : data.Value.WorkAddress.email,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							beforeExtNav : fnCallbackNavPara,

																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",

																								maincontactname : data.Value.Account.MainContact.fullName,
																								maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																								maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																								maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(oEvent
																										.getSource());
																					}
																				}
																				// work
																				// address
																				// is
																				// null
																				// and
																				// check
																				// main
																				// address
																				else {

																					if (data.Value.Account.MainAddress) {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							companyaddress : data.Value.Account.MainAddress.address,
																							beforeExtNav : fnCallbackNavPara,
																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",
																								companyphone : data.Value.Account.MainAddress.phone,
																								maincontactname : data.Value.Account.MainContact.fullName,
																								maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																								maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																								maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																					// work
																					// address
																					// and
																					// Mainaddress
																					// is
																					// null
																					else {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,

																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							beforeExtNav : fnCallbackNavPara,

																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",

																								maincontactname : data.Value.Account.MainContact.fullName,
																								maincontactmobile : data.Value.Account.MainContact.WorkAddress.mobilePhone,
																								maincontactphone : data.Value.Account.MainContact.WorkAddress.phone,
																								maincontactemail : data.Value.Account.MainContact.WorkAddress.email,
																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																				}
																			}
																			// main
																			// contact's
																			// work
																			// address
																			// is
																			// null
																			// and
																			// check
																			// work
																			// address
																			// and
																			// main
																			// address
																			else {
																				if (data.Value.WorkAddress) {

																					if (data.Value.Account.MainAddress) {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactmobile : data.Value.WorkAddress.mobilePhone,
																							contactphone : data.Value.WorkAddress.phone,
																							contactemail : data.Value.WorkAddress.email,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							companyaddress : data.Value.Account.MainAddress.address,
																							beforeExtNav : fnCallbackNavPara,
																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",
																								companyphone : data.Value.Account.MainAddress.phone,
																								maincontactname : data.Value.Account.MainContact.fullName,

																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																					// main
																					// contact's
																					// work
																					// address
																					// is
																					// null
																					// and
																					// Mainaddress
																					// is
																					// null
																					else {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactmobile : data.Value.WorkAddress.mobilePhone,
																							contactphone : data.Value.WorkAddress.phone,
																							contactemail : data.Value.WorkAddress.email,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							beforeExtNav : fnCallbackNavPara,

																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",

																								maincontactname : data.Value.Account.MainContact.fullName,

																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}

																				}
																				// work
																				// address
																				// is
																				// null
																				// and
																				// main
																				// contacts
																				// work
																				// address
																				// is
																				// also
																				// null
																				// ,
																				// check
																				// for
																				// main
																				// address
																				else {

																					if (data.Value.Account.MainAddress) {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,
																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							companyaddress : data.Value.Account.MainAddress.address,
																							beforeExtNav : fnCallbackNavPara,
																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",
																								companyphone : data.Value.Account.MainAddress.phone,
																								maincontactname : data.Value.Account.MainContact.fullName,

																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																					// main
																					// contacts
																					// work
																					// address
																					// is
																					// null
																					// and
																					// work
																					// address
																					// and
																					// Mainaddress
																					// is
																					// null
																					else {
																						var oEmpConfig = {
																							title : "Contact",
																							name : data.Value.fullName,
																							imgurl : Image,
																							department : data.Value.department,

																							contactemailsubj : "App Genrated Mail",
																							companyname : data.Value.Account.name1,
																							beforeExtNav : fnCallbackNavPara,

																							// optional:
																							// if
																							// the
																							// following
																							// attributes
																							// are
																							// provided
																							// - a
																							// link
																							// to
																							// company
																							// card
																							// is
																							// available
																							companycard : {
																								title : "Account",
																								imgurl : "sap-icon://person-placeholder",

																								maincontactname : data.Value.Account.MainContact.fullName,

																								maincontactemailsubj : "Automatic Mail for Maincontact",
																							}
																						};

																						// call
																						// 'Business
																						// Card'
																						// reuse
																						// component
																						var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																								oEmpConfig);
																						oEmployeeLaunch
																								.openBy(event);
																					}
																				}
																			}

																		}
																		// account
																		// !=
																		// null
																		// and
																		// maincontact
																		// is
																		// null
																		// and
																		// so is
																		// main
																		// contact's
																		// work
																		// address
																		// and
																		// work
																		// address
																		// and
																		// main
																		// address

																		// main
																		// contact's
																		// work
																		// address
																		// is
																		// null
																		// and
																		// check
																		// work
																		// address
																		// and
																		// main
																		// address
																		else {
																			if (data.Value.WorkAddress) {

																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",
																							companyphone : data.Value.Account.MainAddress.phone,
																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// Only
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactmobile : data.Value.WorkAddress.mobilePhone,
																						contactphone : data.Value.WorkAddress.phone,
																						contactemail : data.Value.WorkAddress.email,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,

																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}

																			}
																			//
																			else {

																				if (data.Value.Account.MainAddress) {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,
																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						companyaddress : data.Value.Account.MainAddress.address,
																						beforeExtNav : fnCallbackNavPara,
																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",
																							companyphone : data.Value.Account.MainAddress.phone,

																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}
																				// work
																				// address
																				// and
																				// Mainaddress
																				// is
																				// null
																				else {
																					var oEmpConfig = {
																						title : "Contact",
																						name : data.Value.fullName,
																						imgurl : Image,
																						department : data.Value.department,

																						contactemailsubj : "App Genrated Mail",
																						companyname : data.Value.Account.name1,
																						beforeExtNav : fnCallbackNavPara,

																						// optional:
																						// if
																						// the
																						// following
																						// attributes
																						// are
																						// provided
																						// - a
																						// link
																						// to
																						// company
																						// card
																						// is
																						// available
																						companycard : {
																							title : "Account",
																							imgurl : "sap-icon://person-placeholder",

																						}
																					};

																					// call
																					// 'Business
																					// Card'
																					// reuse
																					// component
																					var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(
																							oEmpConfig);
																					oEmployeeLaunch
																							.openBy(event);
																				}

																			}
																		}

																	} else {
																		sap.m.MessageToast
																				.show(sap.ca.scfld.md.app.Application
																						.getImpl()
																						.getResourceBundle()
																						.getText(
																								'NOT_IN_MAIN_CONTACT'));
																	}

																}, this),
												jQuery
														.proxy(
																function(oError) {

																	sap.m.MessageToast
																			.show(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NOT_IN_MAIN_CONTACT'));

																}, this), true);

							}

							else {
								sap.m.MessageToast
										.show(sap.ca.scfld.md.app.Application
												.getImpl().getResourceBundle()
												.getText('NOT_IN_MAIN_CONTACT'));

							}

						}

						else if (PartnerFunctionCode == "00000021") {
							this.accountNum = accountId;
							if (accountId) {
								var sPath = "AccountCollection(accountID='"
										+ accountId
										+ "')?$expand=MainAddress,MainContact/WorkAddress,MainContact";

								var aBatchReads = [];
								var that = this;

								aBatchReads.push(oModel.createBatchOperation(
										sPath, "GET"));

								oModel.addBatchReadOperations(aBatchReads);

								oModel
										.submitBatch(
												jQuery
														.proxy(
																function(
																		oResponses) {

																	var oMainContact = {
																		Value : ""
																	};
																	oMainContact.Value = oResponses.__batchResponses[0].data;

																	var fnCallbackNavParaComp = jQuery
																			.proxy(
																					function(
																							oEvent) {

																						var oNavConfig = {};
																						oNavConfig.target = {};
																						oNavConfig.target.semanticObject = "Account";
																						oNavConfig.target.action = "MyAccounts&/detail/AccountCollection('" + this.accountNum + "')";
//																						oNavConfig.params = {
//																							accountID : this.accountNum
//																						};
																						this.navToOtherApp = true;
																						this.oRouter
																								.detachRouteMatched(
																										this.detailRouteMatched,
																										this);

																						return oNavConfig;

																					},
																					this);

																	if (oMainContact.Value.MainContact) {
																		if (oMainContact.Value.MainContact.WorkAddress)

																		{
																			if (oMainContact.Value.MainAddress) {

																				var oCompanycard = {
																					title : "Account",
																					imgurl : Image,
																					companyname : oMainContact.Value.name1,
																					companyphone : oMainContact.Value.MainAddress.phone,
																					companyaddress : oMainContact.Value.MainAddress.address,
																					maincontactname : oMainContact.Value.MainContact.fullName,
																					maincontactmobile : oMainContact.Value.MainContact.WorkAddress.mobilePhone,
																					maincontactphone : oMainContact.Value.MainContact.WorkAddress.phone,
																					maincontactemail : oMainContact.Value.MainContact.WorkAddress.email,
																					maincontactemailsubj : "Automatic Mail for Maincontact",
																					beforeExtNav : fnCallbackNavParaComp,
																				};

																				var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																						oCompanycard);
																				oCompanyLaunch
																						.openBy(event);
																			}

																			else {

																				var oCompanycard = {
																					title : "Account",
																					imgurl : Image,
																					companyname : oMainContact.Value.name1,

																					maincontactname : oMainContact.Value.MainContact.fullName,
																					maincontactmobile : oMainContact.Value.MainContact.WorkAddress.mobilePhone,
																					maincontactphone : oMainContact.Value.MainContact.WorkAddress.phone,
																					maincontactemail : oMainContact.Value.MainContact.WorkAddress.email,
																					maincontactemailsubj : "Automatic Mail for Maincontact",
																					beforeExtNav : fnCallbackNavParaComp,
																				};
																				var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																						oCompanycard);
																				oCompanyLaunch
																						.openBy(event);

																			}

																		}

																		else {
																			if (oMainContact.Value.MainAddress) {
																				var oCompanycard = {
																					title : "Account",
																					imgurl : Image,
																					companyname : oMainContact.Value.name1,
																					companyphone : oMainContact.Value.MainAddress.phone,
																					companyaddress : oMainContact.Value.MainAddress.address,
																					maincontactname : oMainContact.Value.MainContact.fullName,
																					beforeExtNav : fnCallbackNavParaComp,
																				};

																				var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																						oCompanycard);
																				oCompanyLaunch
																						.openBy(event);
																			} else {
																				var oCompanycard = {
																					title : "Account",
																					imgurl : Image,
																					companyname : oMainContact.Value.name1,
																					maincontactname : oMainContact.Value.MainContact.fullName,
																					beforeExtNav : fnCallbackNavParaComp,
																				};
																				var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																						oCompanycard);
																				oCompanyLaunch
																						.openBy(event);
																			}
																		}

																	} else {
																		if (oMainContact.Value.MainAddress) {
																			var oCompanycard = {
																				title : "Account",
																				imgurl : Image,
																				companyname : oMainContact.Value.name1,
																				companyphone : oMainContact.Value.MainAddress.phone,
																				companyaddress : oMainContact.Value.MainAddress.address,
																				beforeExtNav : fnCallbackNavParaComp,
																			};
																			var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																					oCompanycard);
																			oCompanyLaunch
																					.openBy(event);
																		} else {
																			var oCompanycard = {
																				title : "Account",
																				imgurl : Image,
																				companyname : oMainContact.Value.name1,
																				beforeExtNav : fnCallbackNavParaComp,
																			};
																			var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
																					oCompanycard);
																			oCompanyLaunch
																					.openBy(event);
																		}
																	}

																}, this),
												jQuery
														.proxy(
																function(oError) {
																	sap.m.MessageToast
																			.show(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'ERROR'));
																}, this), true);
							} else {
								sap.m.MessageToast
										.show(sap.ca.scfld.md.app.Application
												.getImpl().getResourceBundle()
												.getText('ACCOUNT_IS_NULL'));
							}
						}

						// Nither a contact or account
						else {
							sap.m.MessageToast
									.show(sap.ca.scfld.md.app.Application
											.getImpl().getResourceBundle()
											.getText('NOT_CONTACT_OR_ACCOUNT'));
						}
					},

					/* Open the Attachment in browser */
					onAttachmentSelected : function(oEvent) {
						var selectedAttachment = oEvent
								.getParameter('listItem').getBindingContext()
								.getObject();
						var win = window.open(
								selectedAttachment.__metadata.media_src,
								'_blank');
						win.focus();

					},
					
					getRuleForPartnerFunction : function(sPartnerFunctionCode){
						
						for(var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++){
						if(this.partnerDeterminationMap[this.transactionType][i].PartnerFunctionCode === sPartnerFunctionCode){
								return this.partnerDeterminationMap[this.transactionType][i];
							}
						}
						return null;
					},
					getCountForPartnerFunction : function(sPartnerFunctionCode){
						
						var count = 0;
						var participantsCollection  = this.byId('Sales_Team').getModel('json').getData().OpportunitySalesTeamSet;
						
						for(var i = 0; i<participantsCollection.length;i++){
							if(participantsCollection[i].PartnerFunctionCode === sPartnerFunctionCode){
								count++;
							}
							
						}
						
						return count;
					},
					checkMinMaxRules : function(oEvent) {
						 
						//to check if a participant of specific participant type is already added
		                var currentPartnerFunctionCode = this.participantsF4Fragment.getContent()[0].getSelectedItem().getBindingContext('json').getObject().PartnerFunctionCode;
		                var currentPartnerFunctionName= this.participantsF4Fragment.getContent()[0].getSelectedItem().getBindingContext('json').getObject().PartnerFunctionName;
		                var oldItems = this.byId('Sales_Team').getModel('json').oData.OpportunitySalesTeamSet;
		               
		                if(oEvent){
		                       var selectedItemName = oEvent.getParameters().listItem.getTitle();
		                    var selectedItem=oEvent.getParameters().listItem.data("ID");
		                                
		                for ( var i = 0; i < oldItems.length; i++)
		                {
		                if (oldItems[i].PartnerNumber == selectedItem && oldItems[i].PartnerFunctionCode == currentPartnerFunctionCode)
		                {
		                       sap.m.MessageToast.show(this.oResourceBundle.getText('PARTICIPANT_EXISTS',[selectedItemName,currentPartnerFunctionName]),{
		                              duration : 3500});
		                       oEvent.getParameters().listItem.setSelected(false);
		                       return;
		                }
		                }
		                   
		                }
						
						var selectParticipants = this.participantsF4Fragment
                                      .getContent()[0];
                        var index = selectParticipants
                                      .indexOfItem(selectParticipants
                                                    .getSelectedItem());
                        var selectedPartnerFunction = this.participantsF4Fragment
                                      .getModel('json').getData().PartnerFunctions[index];
                        var PartnerFunctionCode = selectedPartnerFunction.PartnerFunctionCode;
                      
                        var CountHigh = selectedPartnerFunction.CountHigh;
                        var CountLow = selectedPartnerFunction.CountLow;
                        var numberOfSelecteditems = this.participantsF4Fragment
                                      .getContent()[2].getSelectedItems().length;

                        var numberInParticipantsTab = this.getCountForPartnerFunction(PartnerFunctionCode);
                    	var participantsList =  this.participantsF4Fragment.getContent()[2];

                        if (numberOfSelecteditems + numberInParticipantsTab > CountHigh) {
                               // Too many participants for the current partner
                               // function
                        	if(oEvent){
                        	oEvent.getParameters().listItem.setSelected(false); 
                        	}
                        	if(CountHigh === 1){
                        		  sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_MANY_PARTICIPANTS_1',
                                          [CountHigh]),{
                        			  duration : 3500
                        		  });
                        	}
                        	else{
                               sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_MANY_PARTICIPANTS',
                                                                        [CountHigh]),{
                            	   duration : 3500
                               });
                        	}
                        	
                        	   this.enableAddParticipantsButton();
                               return;
                        }
                        if (numberOfSelecteditems + numberInParticipantsTab < CountLow) {
                               // Too few participants for the current partner
                               // function
                               if(CountLow === 1){
                            	   sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_FEW_PARTICIPANTS_1',[CountLow]),{
                            		   duration : 3500
                            	   });
                               }
                               else{
                               sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_FEW_PARTICIPANTS',[CountLow]),{
                            	   duration : 3500
                               });
                               }
                               
                               this.enableAddParticipantsButton();
                               return;

                        }
                        
                       this.enableAddParticipantsButton();

                 },
					
                 enableAddParticipantsButton : function(){
                	 
                	 var participantsList =  this.participantsF4Fragment.getContent()[2];
                	 if(participantsList.getSelectedItems().length > 0){
		            	   this.participantsF4Fragment.getBeginButton().setEnabled(true);
		               }
		               else{
		            	   this.participantsF4Fragment.getBeginButton().setEnabled(false);
		               }
                 },
					
					
					searchParticipants  : function(){
					    var selectParticipants = this.participantsF4Fragment.getContent()[0];
					    this.participantsF4Fragment.getBeginButton().setEnabled(false);
					    selectParticipants.fireChange({selectedItem : selectParticipants.getSelectedItem()});
					},
					onPartnerFunctionChange : function(oEvent){
						
					    this.checkMinMaxRules(null);
						var curPartnerFunctionCategory = oEvent.getParameter('selectedItem').getKey();
						var curPartnerFunctionName = oEvent.getParameter('selectedItem').getText();
						var searchText = this.participantsF4Fragment.getContent()[1].getValue();
						this.participantsF4Fragment.getBeginButton().setEnabled(false);
						this.participantsF4Fragment.getContent()[2].setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
						this.participantsF4Fragment.getContent()[1].setPlaceholder(this.oResourceBundle.getText('SEARCH_PARTICIPANTS'));
						switch(curPartnerFunctionCategory){
					
						case "0005" : 
						case "0008" :	 
					         //Employee Responsible partner function - fire Employees Collection 
							this.oModel.read("EmployeeCollection",null, ["$filter=substringof('" + searchText + "',fullName)" ],false,jQuery.proxy(function(odata,response){
								
								this.participantsF4Fragment.getModel('json').getData().Employees = response.data.results;
								this.participantsF4Fragment.getModel('json').updateBindings();
								this.participantsF4Fragment.getContent()[2].bindItems("json>/Employees",this.employeeListItemTemplate,null,[]);
							},this),jQuery.proxy(function(oError){},this));
							break;
							
						case "0007" : 
							//Contact partner function - fire Contact collection
			            this.oModel.read("ContactCollection",null, ["$filter=substringof('" + searchText + "',fullName)"],false,jQuery.proxy(function(odata,response){
								
								this.participantsF4Fragment.getModel('json').getData().Contacts = response.data.results;
								this.participantsF4Fragment.getModel('json').updateBindings();
								this.participantsF4Fragment.getContent()[2].bindItems("json>/Contacts",this.contactListItemTemplate,null,[]);
							},this),jQuery.proxy(function(oError){},this));
							break;
							
						default : 	
						  
							 //fire Account Collection 
			            this.oModel.read("AccountCollection",null, [ "$filter=substringof('" + searchText + "',name1)"],false,jQuery.proxy(function(odata,response){
								
								this.participantsF4Fragment.getModel('json').getData().Accounts = response.data.results;
								this.participantsF4Fragment.getModel('json').updateBindings();
								this.participantsF4Fragment.getContent()[2].bindItems("json>/Accounts",this.accountListItemTemplate,null,[]);
							},this),jQuery.proxy(function(oError){},this));
							break;
						}
						
						this.participantsF4Fragment.getContent()[2].setNoDataText(this.oResourceBundle.getText("NO_PARTICIPANTS"));
						
						
					
					},
					bindS3Header : function(data) {
						 
                        var s3Header = this.byId('opportunityHeader');
                        var sPath = "/AccountCollection('"
                                      + data.ProspectNumber + "')";
                        var oLogo = "sap-icon://person-placeholder";
                        var that = this;
                        if(this.sProspectNumber !== data.ProspectNumber || !this.mPartnerImgSrc[this.sProspectNumber]){
                        	
                        this.sProspectNumber = data.ProspectNumber;
                     
                        if(this.sProspectNumber !== ""){
                        this.oModel.read(sPath,null,[ "$expand=Logo" ],false,function(odata, response) {
                                                          jQuery.sap.log.info("oData account response");
                                                          if (odata.Logo&& odata.Logo.__metadata) {
                                                                 var oMetadata = odata.Logo.__metadata.media_src ? odata.Logo.__metadata.media_src: "sap-icon://person-placeholder";
                                                                        /* var URl = oMetadata.replace(/^https:\/\//i, 'http://');*/
                                                                 oLogo = oMetadata.toString();
                                                          }
                                                         
                                                         
                                                     
                                                    },
                                                    jQuery.proxy(this.handleErrors, this));
                        
                        }
                        data.ImgSrc = oLogo;
                        this.mPartnerImgSrc[this.sProspectNumber] = oLogo;
                       
                        }
                        else{
                            data.ImgSrc = this.mPartnerImgSrc[this.sProspectNumber];
                      }
                        if (s3Header&& s3Header.getModel('json')){
                            s3Header.getModel('json').setData(data);
                        }

                        
                 },

					getParticipants : function() {
						 
                        var data;
                        var oLogo = [];
                        var that = this;
                        this.partnerFunctionMap = {};
                        this.byId("Sales_Team").setNoDataText(
                                      sap.ca.scfld.md.app.Application.getImpl()
                                                    .getResourceBundle().getText(
                                                                 'LOADING_TEXT'));
                        this.byId('Sales_Team').getModel('json').setData({
                               OpportunitySalesTeamSet : []
                        });
                        this.oModel.read(this.sPath,null,[ "$expand=SalesTeam,Competitors" ],false,function(odata, response) {

                                                           that.bindS3Header(response.data);
                                                          var tab = that.getView().byId(
                                                                        "Sales_Team");
                                                          var jsonModel = new sap.ui.model.json.JSONModel();
                                                         
                                                          data = {
                                                                 OpportunitySalesTeamSet : response.data.SalesTeam.results
                                                          };
                                                          that.byId('Sales_Team').getHeaderToolbar().getContent()[0].setText(that.oResourceBundle.getText(
                                                                                                    'PARTICIPANTS',
                                                                                                    [ response.data.SalesTeam.results.length ]));
                                                          if (data.OpportunitySalesTeamSet.length == 0) {

                                                                 that.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application
                                                                                                           .getImpl()
                                                                                                           .getResourceBundle()
                                                                                                           .getText('NO_CONTACTS'));
                                                          }

                                                          var aBatchReads = [];
                                                          var mBatchIndexes = {};
                                                          var index = 0;
                                                          for ( var i = 0; i < data.OpportunitySalesTeamSet.length; i++) {
                                                                 var accountID = data.OpportunitySalesTeamSet[i].PartnerNumber;
                                                                
                                                                 var sPath = "/AccountCollection('"
                                                                               + accountID
                                                                               + "')?$expand=Logo";
                                                                 oLogo[i] = "sap-icon://person-placeholder";
                                                                 
                                                                 if(!that.mPartnerImgSrc[accountID] && accountID !== ""){
                                                                 aBatchReads.push(that.oModel
                                                                               .createBatchOperation(
                                                                                             sPath, "GET"));
                                                                 mBatchIndexes[index ] = i;
                                                                 index++;
                                                                 }
                                                                 else{
                                                                	 data.OpportunitySalesTeamSet[i].ImgSrc = that.mPartnerImgSrc[accountID];
                                                                 }
                                                          }
                                                          ;

                                                          that.oModel.addBatchReadOperations(aBatchReads);
                                                          that.oModel.submitBatch(jQuery.proxy(function(oResponses){
                                                       	   

                                                              for ( var j = 0; j < index; j++) {
                                                            	  if(!oResponses.__batchResponses[j].hasOwnProperty("data")){
                                                            		  oLogo[j] = "sap-icon://person-placesholder";
                                                            	  }
                                                            	  else{
                                                                     if (oResponses.__batchResponses[j].data && oResponses.__batchResponses[j].data.Logo
                                                                                   && oResponses.__batchResponses[j].data.Logo.__metadata.media_src) {
                                                                    	 
                                                                            var oMetadata = oResponses.__batchResponses[j].data.Logo.__metadata.media_src ? oResponses.__batchResponses[j].data.Logo.__metadata.media_src
                                                                                          : "sap-icon://person-placeholder";
                                                                            var URl = oMetadata;
                                                                            oLogo[j] = URl
                                                                                         .toString();
                                                                     }
                                                            	  }

                                                                     data.OpportunitySalesTeamSet[mBatchIndexes[j]].ImgSrc = oLogo[j];
                                                                     that.mPartnerImgSrc[data.OpportunitySalesTeamSet[mBatchIndexes[j]].PartnerNumber] = oLogo[j];
                                                              }

                                                              
                                                       	   
                                                          },this),jQuery.proxy(function(){},this),false);
                                                          
                                                          jsonModel.setData(data);
                                                          tab.setModel(jsonModel,"json");
                                                          
                                                          //also bind the competitors!
                                                          
                                                          if(response.data.Competitors && response.data.Competitors.results){
                                      						if (response.data.Competitors.results.length === 0){
                                      							that.byId('tab_competitor').setVisible(false);
                                      						}
                                      						else{
                                      							that.byId('tab_competitor').setVisible(true);
                                      						}
                                      						
                                      						var oModel = that.byId('competitors').getModel('json');
                                  							if(oModel){
                                  								oModel.oData.OpportunityCompetitors = response.data.Competitors.results;
                                  								oModel.updateBindings();
                                  								
                                  							}
                                  							else{
                                  								that.byId('competitors').setModel(new sap.ui.model.json.JSONModel({OpportunityCompetitors : response.data.Competitors.results}),'json');
                                  							}
                                  						
                                      						}
                                                         
                                                    });
                                                       
					},
					
					addParticipants : function() {
						 
                        this.oModel.clearBatch();
                        var changeSet = [];
                        var currentPartnerFunctionCode = this.participantsF4Fragment.getContent()[0].getSelectedItem().getBindingContext('json').getObject().PartnerFunctionCode;
                        var headerGuid = this.byId('info').getModel('json').getData().Guid;
                        var items = this.participantsF4Fragment.getContent()[2].getSelectedItems();
                        var oEntry;
                        
                        for ( var i = 0; i < items.length; i++) {
                               oEntry = {
                                      HeaderGuid : headerGuid,
                                      PartnerNumber : items[i].data("ID"),
                                      PartnerFunctionCode : currentPartnerFunctionCode
                               };
                               changeSet.push(this.oModel.createBatchOperation("OpportunitySalesTeamSet", "POST", oEntry,null));
                        }

                        if (changeSet.length > 0) {
                               this.oModel.addBatchChangeOperations(changeSet);
                               this.oModel.submitBatch(jQuery.proxy(function(oResponses) {
                                      this.getParticipants();
                                      this.participantsF4Fragment.getContent()[2].removeSelections();
                                      this.participantsF4Fragment.getContent()[1].clear();
                                      this.participantsF4Fragment.close();

                               }, this),
                               jQuery.proxy(function(oError) {
                                      this.handleErrors(oError);
                               }, this));
                        }
                 },

                
              onDeleteParticipant : function(oEvent){
	               
            	 var oCurrentPartner = oEvent.getSource().getBindingContext('json').getObject();
    	    	var oCurrentRule = this.getRuleForPartnerFunction(oCurrentPartner.PartnerFunctionCode);
    	    	if(this.getCountForPartnerFunction(oCurrentPartner.PartnerFunctionCode) - 1 < oCurrentRule.CountLow){
    	    		
    	    		if(oCurrentRule.CountLow === 1){
    	    		 sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText('MUST_HAVE_PARTICIPANTS_1',[oCurrentRule.CountLow]));
    	    		}
    	    		else{
    	    			 sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText('MUST_HAVE_PARTICIPANTS',[oCurrentRule.CountLow]));	
    	    		}
    	    		 return;
    	    	}
  				var headerGuid=this.byId('info').getModel('json').getData().Guid;
  				var sPath = ["OpportunitySalesTeamSet(HeaderGuid=guid'",headerGuid,"',PartnerNumber='",oCurrentPartner.PartnerNumber,"',PartnerFunctionCode='",oCurrentPartner.PartnerFunctionCode,"')"].join("");
  				
  				this.oModel.remove(sPath,null,jQuery.proxy(function(){
  					
  					this.getParticipants();
  					this.oModel.refresh();
  					
  				},this),jQuery.proxy(function(oError){
  					
  					this.handleErrors(oError);
  					
  				},this));
  				
  				
  			},
  			      getChangeable : function(sPartnerFunctionCode){
  			    	  
  			    	  for(var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++){
  			    		  
  			    		  if(this.partnerDeterminationMap[this.transactionType].PartnerFunctionCode === sPartnerFunctionCode){
  			    			  
  			    			  return this.partnerDeterminationMap[this.transactionType].ChangeableFlag;
  			    		  }
  			    		  
  			    	  }
  			    	  
  			    	  return true;
  			    	  
  			      },
					showParticipantsF4 : function(){

						var selectParticipants;
			            if(!this.participantsF4Fragment){
			            	this.participantsF4Fragment  =  new sap.ui.xmlfragment(this.createId("participantsF4_S3"), 'cus.crm.opportunity.view.ParticipantsF4', this);
							this.participantsF4Fragment.setModel(new sap.ui.model.json.JSONModel({}),"json");
							this.participantsF4Fragment.setModel(this.oI18nModel,'i18n');
							
							//attach change event 
							
							
							selectParticipants =   this.participantsF4Fragment.getContent()[0]; 
							selectParticipants.attachChange(null,this.onPartnerFunctionChange,this);
					   
			            }
			            
			         // the customizing of partner functions 
			            selectParticipants = this.participantsF4Fragment.getContent()[0];
						this.participantsF4Fragment.getModel('json').getData().PartnerFunctions = this.partnerDeterminationMap[this.transactionType];
	            		this.participantsF4Fragment.getModel('json').updateBindings();
	            		if(selectParticipants.getItems().length > 0){
	            		selectParticipants.setSelectedItem(selectParticipants.getSelectedItem());
	            		selectParticipants.fireChange({selectedItem : selectParticipants.getItems()[0]});	
	            		}
	            		
	            		this.participantsF4Fragment.getBeginButton().setEnabled(false);
						this.participantsF4Fragment.open();
						
					
					},
					closeParticipantsF4 : function(oEvent)
					{
						
						this.participantsF4Fragment.getContent()[1].clear();
						this.participantsF4Fragment.getContent()[2].removeSelections();
						this.participantsF4Fragment.close();
					},

					/* Contact F4 */
					addContact : function(oEvent) {
						var oModel = this.getView().getModel();
						this.contactF4Fragment.getContent()[0]
								.removeSelections();
						this.contactF4Fragment
								.setModel(new sap.ui.model.json.JSONModel());
						this.contactF4Fragment.setModel(this.getView()
								.getModel("i18n"), "i18n");
						this.contactF4Fragment.getContent()[0]
								.setNoDataText(sap.ca.scfld.md.app.Application
										.getImpl().getResourceBundle().getText(
												'LOADING_TEXT'));
						var toolbar = this.contactF4Fragment.getContent()[0]
								.getInfoToolbar();
						var toolbarLabel = toolbar.getContent()[0];
						toolbar.setVisible(false);
						this.contactF4Fragment.getSubHeader().getContentLeft()[0]
								.setValue("");
						var opportunity_Data = this.byId('info').getModel(
								'json').getData();
						this.opportunity_number = opportunity_Data.ProspectNumber;
						this.contactF4Fragment.open();
						var jsonModel = new sap.ui.model.json.JSONModel();
						this.contactF4Fragment.setModel(jsonModel, "json");
						if (this.opportunity_number != ""
								&& this.opportunity_number != undefined) {
							toolbar.setVisible(true);
							toolbarLabel
									.setText(sap.ca.scfld.md.app.Application
											.getImpl().getResourceBundle()
											.getText('FILTER')
											+ " "
											+ opportunity_Data.ProspectName);
							oModel
									.read(
											"/AccountCollection(accountID='"
													+ this.opportunity_number
													+ "')/Contacts",
											null,
											null,
											true,
											jQuery
													.proxy(
															function(odata,
																	response) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{
																					ContactCollection : response.data.results
																				});
																if (response.data.results.length === 0)
																	this.contactF4Fragment
																			.getContent()[0]
																			.setNoDataText(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NO_CONTACTS'));

															}, this),
											jQuery
													.proxy(
															function(oError) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{
																					ContactCollection : []
																				});
																this.contactF4Fragment
																		.getContent()[0]
																		.setNoDataText(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NO_CONTACTS'));
															}, this));

						} else {
							toolbar.setVisible(false);
							this.contactF4Fragment.getModel('json').setData({
								ContactCollection : []
							});
							this.contactF4Fragment.getContent()[0]
									.setNoDataText(sap.ca.scfld.md.app.Application
											.getImpl().getResourceBundle()
											.getText('LOADING_TEXT'));
							oModel
									.read(
											"ContactCollection",
											null,
											null,
											true,
											jQuery
													.proxy(
															function(odata,
																	response) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{
																					ContactCollection : response.data.results
																				});
																if (response.data.results.length === 0)
																	this.contactF4Fragment
																			.getContent()[0]
																			.setNoDataText(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NO_CONTACTS'));
															}, this),
											jQuery
													.proxy(
															function(oError) {
																this.contactF4Fragment
																		.getContent()[0]
																		.setNoDataText(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NO_CONTACTS'));

															}, this));
						}
					},

					/* Set contact to text field */
					setContact : function(oEvent) {
						var oModel = this.getView().getModel();
						this.oSelectedContact = oEvent.getSource()
								.getSelectedItem().getBindingContext("json")
								.getObject();
						var accountId = this.byId('info').getModel('json')
								.getData().ProspectNumber;
						var headerGuid = this.byId('info').getModel('json')
								.getData().Guid;
						var that = this;
						oModel.refreshSecurityToken();
						oModel
								.update(
										"OpportunitySalesTeamSet(PartnerNumber='"
												+ this.oSelectedContact.contactID
												+ "',PartnerFunctionCode='00000015',HeaderGuid=guid'"
												+ headerGuid + "')",
										{
											HeaderGuid : headerGuid,
											PartnerNumber : this.oSelectedContact.contactID,
											PartnerFunctionCode : '00000015'
										},
										{
											fnSuccess : jQuery.proxy(function(){
												this.getParticipants();
											},this),
											fnError : function(oError) {
												this.handleErrors(oError);
											},
											bMerge : true

										});
						this.contactF4Fragment.getContent()[0]
								.removeSelections();
						var jsonModel = new sap.ui.model.json.JSONModel();
						jsonModel.setData({
							ContactCollection : []
						});
						this.contactF4Fragment.setModel(jsonModel, "json");
						this.contactF4Fragment.close();

					},
					
					
					/*Closing toolbar in contact F4*/
					closeToolbar : function(oEvent) {
						var toolbar = this.contactF4Fragment.getContent()[0]
								.getInfoToolbar();
						var olist = this.contactF4Fragment.getContent()[0];
						toolbar.setVisible(false);
						olist.getBinding("items").aFilters = [];
						olist.getBinding("items").sFilterParams = "";
						olist.getBinding("items").refresh();
						this.contactF4Fragment.getModel('json').setData({
							ContactCollection : []
						});
						olist.setNoDataText(sap.ca.scfld.md.app.Application
								.getImpl().getResourceBundle().getText(
										'LOADING_TEXT'));
						this
								.getView()
								.getModel()
								.read(
										"ContactCollection",
										null,
										null,
										true,
										jQuery
												.proxy(
														function(odata,
																response) {
															this.contactF4Fragment
																	.getModel(
																			'json')
																	.setData(
																			{
																				ContactCollection : response.data.results
																			});
															if (response.data.results.length === 0)
																this.contactF4Fragment
																		.getContent()[0]
																		.setNoDataText(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NO_CONTACTS'));
														}, this),
										jQuery
												.proxy(
														function(oError) {
															this.contactF4Fragment
																	.getContent()[0]
																	.setNoDataText(sap.ca.scfld.md.app.Application
																			.getImpl()
																			.getResourceBundle()
																			.getText(
																					'NO_CONTACTS'));
														}, this));
					},
					
					onRenameFile : function(oEventData)
					{
						
						var newFileName = oEventData.mParameters.newFilename;
					    var fileId  = oEventData.mParameters.fileId;
					    var obj = {
					    		
					    		"newFileName" : newFileName + "",
					    		"fileId"  : fileId +""
					    		
					    };
					  
					    
					    var headerGuid = this.byId('info').getModel('json').getData().Guid;
					    var Parameters = oEventData.getParameters();
					    var URL;
					   if(Parameters.media_src)						
						 URL = Parameters.media_src;
					   else
						   URL = Parameters.url;
						var removStartVal = URL.split("(").pop();
						
						//var removStartVal = URL.split("(").pop();
						var sPath = "OpportunityAttachments(";
						var url = sPath + removStartVal;
						this.oModel.setHeaders(obj);
						this.oModel
						.addBatchChangeOperations([ this.oModel
								.createBatchOperation(
										url, "PUT",obj,null) ]);
						
								    
						
					},
					
					onSaveClicked : function() {
					      //save to server here and determine success
				var	 aBatch;
				
				
				this.oModel.submitBatch();
				
				  
					      var success = true;
					 
					      var fileUploadControl = this.byId("fileupload");
					 
					      if (success) {
					         fileUploadControl.commitPendingRenames();
					      } else {
					         fileUploadControl.abandonPendingRenames();
					      }
					  },
					
					


					closeContactF4 : function(oEvent) {
						var jsonModel = new sap.ui.model.json.JSONModel();
						jsonModel.setData({
							ContactCollection : []
						});
						this.contactF4Fragment.setModel(jsonModel, "json");
						this.contactF4Fragment.close();
					},

					searchContact : function(oEvent) {
						var sValue = oEvent.getParameter("query");
						this.contactF4Fragment.getContent()[0]
								.setNoDataText(sap.ca.scfld.md.app.Application
										.getImpl().getResourceBundle().getText(
												'LOADING_TEXT'));
						var toolbar = this.contactF4Fragment.getContent()[0]
								.getInfoToolbar();
						if (toolbar.getVisible() === false) {
							this
									.getView()
									.getModel()
									.read(
											"ContactCollection",
											null,
											[ "$filter=substringof('" + sValue
													+ "'" + ",fullName)" ],
											true,
											jQuery
													.proxy(
															function(odata,
																	response) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{
																					ContactCollection : response.data.results
																				});
																if (response.data.results.length === 0)
																	this.contactF4Fragment
																			.getContent()[0]
																			.setNoDataText(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NO_CONTACTS'));

															}, this),
											jQuery
													.proxy(
															function(oError) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{

																					ContactCollection : []
																				});
																this.contactF4Fragment
																		.getContent()[0]
																		.setNoDataText(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NO_CONTACTS'));

															}, this));
						} else {
							var accountId = this.byId('info').getModel('json')
									.getData().ProspectNumber;
							this
									.getView()
									.getModel()
									.read(
											"/AccountCollection(accountID='"
													+ accountId + "')/Contacts",
											null,
											[ "$filter=substringof('" + sValue
													+ "'" + ",fullName)" ],
											true,
											jQuery
													.proxy(
															function(odata,
																	response) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{
																					ContactCollection : response.data.results
																				});
																if (response.data.results.length === 0)
																	this.contactF4Fragment
																			.getContent()[0]
																			.setNoDataText(sap.ca.scfld.md.app.Application
																					.getImpl()
																					.getResourceBundle()
																					.getText(
																							'NO_CONTACTS'));

															}, this),
											jQuery
													.proxy(
															function(oError) {
																this.contactF4Fragment
																		.getModel(
																				'json')
																		.setData(
																				{

																					ContactCollection : []
																				});
																this.contactF4Fragment
																		.getContent()[0]
																		.setNoDataText(sap.ca.scfld.md.app.Application
																				.getImpl()
																				.getResourceBundle()
																				.getText(
																						'NO_CONTACTS'));

															}, this));
						}

					},
						handleErrors : function(oError) {
						sap.ca.ui.utils.busydialog.releaseBusyDialog();
						jQuery.sap.log.error(JSON.stringify(oError));
						sap.ca.ui.message
								.showMessageBox(
										{
											type : sap.ca.ui.message.Type.ERROR,
											message : oError.message,
											details : JSON
													.parse(oError.response.body).error.message.value
										}, function(oResult) {
											
										});

					},

					getDataForDetailScreen : function(bShowInfoTab) {

						//if the app is launched read the data for drop downs - customzing data
						//	var prospectNumber = this.oModel.getContext("/" + sPath).getObject().ProsectNumber;
						if (this.bAppLaunched) {
							this.oModel
									.addBatchReadOperations([ this.oModel
											.createBatchOperation(
													"SalesStages", "GET") ]);
							this.oModel
									.addBatchReadOperations([ this.oModel
											.createBatchOperation("Priorities",
													"GET") ]);
							this.oModel
									.addBatchReadOperations([ this.oModel
											.createBatchOperation(
													"UserStatuses", "GET") ]);
							this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Currencies","GET")]);

							//expand products
							this.oModel
									.addBatchReadOperations([ this.oModel
											.createBatchOperation(
													this.sPath
															+ "?$expand=Products,ChangeDocs,Competitors",
													"GET") ]);
							//EXTENSION POINT to be able to fetch additional customizing data
							/**
							 * @ControllerHook extHookGetAdditonalCustomizing is the controller hook  that provides for fetching of additional customizing values from the backend during 
							 *                 launch of the application. The response can be handled by the controller hook extHookHandleBatchResponses. 
							 *                                   
							 * @callback cus.crm.opportunity.S3.controller~extHookGetAdditionalCustomizing
							 * @return {void}
							 */
							if (this.extHookGetAdditionalCustomizing){
								this.extHookGetAdditionalCustomizing();
							
							}
							this.oModel.submitBatch(jQuery.proxy(
									this.handleBatchResponses, this), jQuery
									.proxy(this.handleBatchErrors, this));
							
						} else
							this.oModel
									.read(
											this.sPath,
											null,
											[ "$expand=Products,ChangeDocs,Competitors" ],
											true,
											jQuery
													.proxy(
															function(odata,
																	response) {
																this
																		.bindInfoAndProducts(response.data,bShowInfoTab);

															}, this), jQuery
													.proxy(this.handleErrors,
															this));
						
						
						//EXTENSION POINT to be able to extend drop down data- customizing data
						/**
						 * @ControllerHook extHookGetDataForDetailScreen is the controller hook to fetch additional data and bind it in the 
						 *                 detail screen. 
						 *                                   
						 * @callback cus.crm.opportunity.S3.controller~extHookGetDataForDetailScreen
						 * return {void}
						 */
						if (this.extHookGetDataForDetailScreen){
							this.extHookGetDataForDetailScreen();
						}
			
						
					
						

					},

					handleBatchResponses : function(oResponses) {
						//batch responses from initial launch of s3 view
						var bFail = false;
						var errorTitle;
						var errorMessage;
						var that = this;
						this.bAppLaunched = false;
						if (oResponses.__batchResponses[0].statusCode === "200") {
							that.SalesStages = oResponses.__batchResponses[0].data.results;

						} else {

							bFail = true;
							errorTitle = oResponses.__batchResponses[0].statusText;
							errorMessage = JSON.parse(oResponses.__batchResponses[0].response.body).error.message.value + "\n";

						}

						if (oResponses.__batchResponses[1].statusCode === "200") {
							that.Priorities = oResponses.__batchResponses[1].data.results;

						} else {

							bFail = true;
							errorTitle = oResponses.__batchResponses[1].statusText;
							errorMessage = JSON.parse(oResponses.__batchResponses[1].response.body).error.message.value + "\n";

						}
						if (oResponses.__batchResponses[2].statusCode === "200") {
							that.UserStatuses = oResponses.__batchResponses[2].data.results;

						} 
						
						else {
							bFail = true;
							errorTitle = oResponses.__batchResponses[2].statusText;
							errorMessage = JSON.parse(oResponses.__batchResponses[2].response.body).error.message.value + "\n";

						}
						if(oResponses.__batchResponses[3].statusCode === "200"){
							that.Currencies = oResponses.__batchResponses[3].data.results;
						
						}
						else 
							{
							   bFail = true;
							   errorTitle = oResponses.__batchResponses[3].statusText;
							   errorMessage = JSON.parse(oResponses.__batchResponses[3].response.body).error.message.value + "\n";
							   
							 
							}
						if (bFail) {
							// sap.ca.ui.utils.busydialog.releaseBusyDialog();
							// jQuery.sap.log.error(JSON.stringify(oError));
							sap.ca.ui.message.showMessageBox({
								type : sap.ca.ui.message.Type.ERROR,
								message : errorTitle,
								details : errorMessage
							}, function(oResult) {
								var i = 0;
								i++;
							});
						}
						if (oResponses.__batchResponses[4]
								.hasOwnProperty("data"))
							this
									.bindInfoAndProducts(oResponses.__batchResponses[4].data,true);
						else
							this.handleErrors(oResponses.__batchResponses[4]);
						
						
						//EXTENSION POINT to be able to set the response of extended drop down values
						/**
						 * @ControllerHook extHookHandleBatchResponses is the controller
						 *                 hook to handle the response of additional customizing fetch during application launch.
						 *                                   
						 * @callback cus.crm.opportunity.S3.controller~extHookHandleBatchResponses
						 * @param {object}
						*         null
						 * @return {void}
						 */
						if (this.extHookHandleBatchResponses){
							this.extHookHandleBatchResponses(oResponses);				
						}
						
						
						

					},

					bindInfoAndProducts : function(data,bShowInfoTab) {

						var infoTab = this.byId('info');
				       	var productsTab = this.byId('Product_Tab');
				       	var s3Header = this.byId('S3_Header');
				       	
				     this.transactionType = s3Header.getModel('json').getData().ProcessType;  	
				       	if(infoTab && infoTab.getModel('json'))
				       		infoTab.getModel('json').setData(data);
				       
				       	if(productsTab && productsTab.getModel('json'))
				       		productsTab.getModel('json').setData({Products : data.Products.results});

						//if there aren't any results, hide the products tab
						if(data.Products && data.Products.results){
				       	if (data.Products.results.length === 0){
							this.byId('tab_product').setVisible(false);
				       	}
						else{
							this.byId('tab_product').setVisible(true);
						}
						}
						if(data.ChangeDocs && data.ChangeDocs.results){
						if (data.ChangeDocs.results.length === 0){
							this.byId("log").setVisible(false);
						}
						else{
							this.byId("log").setVisible(true);
						}
						}
						
						if(data.Competitors && data.Competitors.results){
						if (data.Competitors.results.length === 0)
							this.byId('tab_competitor').setVisible(false);
						else
							this.byId('tab_competitor').setVisible(true);
						}
						if(bShowInfoTab){
							this.setDefaultTabToInfo();
						}
						
						this.bindS3Header(data);
		
					},
					onDeleteFile : function(oEvent) {
						var Parameters = oEvent.getParameters();
						var URL;
						if(Parameters.media_src)
						 URL = Parameters.media_src;
						else
							URL = Parameters.url ; 
						
						var removStartVal = URL.split("(").pop();
						var sPath = "OpportunityAttachments(";
						var url = sPath + removStartVal;
						this.oModel.remove(url);
						//removing the file from the UI
						this.byId('fileupload').removeFile(Parameters.fileId);
					},
					detailRouteMatched : function(oEvent) {

						if (oEvent.getParameter("name") === "detail"
								|| oEvent.getParameter("name") === "detailonly") {
							
							this.fullscreenMode = false ; 
							
							//have this map empty at start
                            this.mPartnerImgSrc = {};
							if (this.navToOtherApp) {
								this.navToOtherApp = false;

								return;
							}
							//if s4 controller is not null, some actions need to be done based on actions in s4View
							var s4Controller = this.getS4Controller();
							if (s4Controller && s4Controller.bCancel &&!this.bAppLaunched) {
								s4Controller.bCancel = false;
								this.setDefaultTabToInfo();
								return;
							}
							
							if(s4Controller && s4Controller.bEmployeeUpdateSuccess){
							
								this.oModel.refresh();
								
							}

							//avoiding needless roundtrips if the details page changes
							this.byId('opportunityHeader').setIcon(
									"sap-icon://person-placeholder");

							this.sPath = oEvent.getParameter("arguments").contextPath;

							this.getDataForDetailScreen(true);

							if(this.bAppLaunched){
								this.bAppLaucnhed = false;
							}

						}
						
						if (oEvent.getParameter("name") === "display"
						) {
                       this.fullScreenMode = true;
                       this.oHeaderFooterOptions = this.oHeaderFooterOptionsForAccount ; 
						if (this.navToOtherApp) {
							this.navToOtherApp = false;

							return;
						}
						//if s4 controller is not null, some actions need to be done based on actions in s4View
						var s4Controller = this.getS4Controller();
						if (s4Controller && s4Controller.bCancel) {
							s4Controller.bCancel = false;
							this.setDefaultTabToInfo();
							return;
						}
						
						if(s4Controller && s4Controller.bEmployeeUpdateSuccess){
						
							this.oModel.refresh();
							
						}

						//avoiding needless roundtrips if the details page changes
						this.byId('opportunityHeader').setIcon(
								"sap-icon://person-placeholder");

						this.sPath = oEvent.getParameter("arguments").contextPath;

						this.getDataForDetailScreen(true);

						
						
						

					}
						

					},
					onAccountBusCardLaunch  : function(oEvt){


						var accountId = oEvt.oSource.data("PartnerNumber");
						var Image = oEvt.oSource.data("Image");
						var oModel = this.oModel;
						var event = oEvt.getSource();
						if (accountId)  
						{
						var sPath = "AccountCollection(accountID='"+ accountId + "')?$expand=MainAddress,MainContact/WorkAddress,MainContact" ; 
						 
						var aBatchReads = [];
						
						
							aBatchReads.push(oModel.createBatchOperation(sPath,"GET"));       



						oModel.addBatchReadOperations(aBatchReads);
						
						
						oModel.submitBatch(jQuery.proxy(function(oResponses){
							
							var oMainContact = { Value : "" } ;
							oMainContact.Value = oResponses.__batchResponses[0].data ;
							
								
							var fnCallbackNavParaComp = jQuery.proxy(function(oEvent){
								 
									var oNavConfig = {};
									oNavConfig.target = {};
									oNavConfig.target.semanticObject = "Account";
									oNavConfig.target.action = "MyAccounts&/detail/AccountCollection('" + accountId + "')";
									//oNavConfig.params = { accountID : accountId };
									this.navToOtherApp = true;
									 	
									return oNavConfig;
		                           
	                  		 
							 },this); 
							 

						
							
							
							if (oMainContact.Value.MainContact) 
							{	
								if (oMainContact.Value.MainContact.WorkAddress) 

								{   
									if(oMainContact.Value.MainAddress) {

										var oCompanycard = {
												title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
												imgurl : Image,
												companyname : oMainContact.Value.name1,
												companyphone : oMainContact.Value.MainAddress.phone,
												companyaddress : oMainContact.Value.MainAddress.address,
												maincontactname : oMainContact.Value.MainContact.fullName,
												maincontactmobile : oMainContact.Value.MainContact.WorkAddress.mobilePhone,
												maincontactphone : oMainContact.Value.MainContact.WorkAddress.phone,
												maincontactemail : oMainContact.Value.MainContact.WorkAddress.email,
												maincontactemailsubj : "Automatic Mail for Maincontact",
											    beforeExtNav:fnCallbackNavParaComp,
										};

										var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
												oCompanycard);
										oCompanyLaunch.openBy(event);
									} 

									else {

										var oCompanycard = {
												title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
												imgurl : Image,
												companyname : oMainContact.Value.name1,

												maincontactname : oMainContact.Value.MainContact.fullName,
												maincontactmobile : oMainContact.Value.MainContact.WorkAddress.mobilePhone,
												maincontactphone : oMainContact.Value.MainContact.WorkAddress.phone,
												maincontactemail : oMainContact.Value.MainContact.WorkAddress.email,
												maincontactemailsubj : "Automatic Mail for Maincontact",
												beforeExtNav:fnCallbackNavParaComp,
										};
										var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
												oCompanycard);
										oCompanyLaunch.openBy(event);

									}

								}	

								else
								{
									if(oMainContact.Value.MainAddress) {

										var oCompanycard = {
												title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
												imgurl : Image,
												companyname : oMainContact.Value.name1,
												companyphone : oMainContact.Value.MainAddress.phone,
												companyaddress : oMainContact.Value.MainAddress.address,
												maincontactname : oMainContact.Value.MainContact.fullName,
												beforeExtNav:fnCallbackNavParaComp,

										};

										var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
												oCompanycard);
										oCompanyLaunch.openBy(event);



									}

									else {

										var oCompanycard = {
												title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
												imgurl : Image,
												companyname : oMainContact.Value.name1,
												maincontactname : oMainContact.Value.MainContact.fullName,
												beforeExtNav:fnCallbackNavParaComp,

										};

										var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
												oCompanycard);
										oCompanyLaunch.openBy(event);


									}


								}

							}

							else {

								if(oMainContact.Value.MainAddress) {

									var oCompanycard = {
											title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
											imgurl : Image,
											companyname : oMainContact.Value.name1,
											companyphone : oMainContact.Value.MainAddress.phone,
											companyaddress : oMainContact.Value.MainAddress.address,
											beforeExtNav:fnCallbackNavParaComp,

									};

									var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
											oCompanycard);
									oCompanyLaunch.openBy(event);



								}
								else  {



									var oCompanycard = {
											title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
											imgurl : Image,
											companyname : oMainContact.Value.name1,
											beforeExtNav:fnCallbackNavParaComp,


									};

									var oCompanyLaunch = new sap.ca.ui.quickoverview.CompanyLaunch(
											oCompanycard);
									oCompanyLaunch.openBy(event);
								}


							}

						},this),jQuery.proxy(
								function(oError){

									sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ERROR'));
									
								},this),true);

					} 
						
							
					
	              
					}
				});
