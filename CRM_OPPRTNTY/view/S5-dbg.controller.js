/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
sap.ca.scfld.md.controller.BaseDetailController
.extend(
		"cus.crm.opportunity.view.S5",
		{   s3Controller : {},
			oSelectedEmployee : {},
			oSelectedAccount : {},
			oSelectedContact : {},
			s2Controller : {},
			ContextPath : "",
			processType : "",
			StatusProfile : "",
			UserStatusCode : "",
			UserStatusText : "",
			WinStatusCode: "",
			LostStatusCode: "",
			oldcosValue: "",
			OldvolumeValue: "",
			ContactCollection : [],
			Currencies : [] ,
			currencymessage : "", 
			s3Controller_contact :"", 
			accountf4open:"",
			onInit : function() {
				sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
				
				var bRTL = sap.ui.getCore().getConfiguration().getRTL();
				var sCss = (bRTL) ? "OpportunityRTL" : "Opportunity";
				
				jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css." + sCss,".css"),"sap-ui-theme-sap.crm");
				var that = this;
				//this.getView().getModel('controllers').getData().s5Controller = this;
				 this.oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle() ;
				this.byId('productBasket').setModel(new sap.ui.model.json.JSONModel(),"json");
				this.contactF4Fragment  =  new sap.ui.xmlfragment(this.createId("contactF4"), 'cus.crm.opportunity.view.ContactF4', this);
				this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel(),"json");
				this.oI18nModel = this.getView().getModel('i18n');
				this.contactF4Fragment.setModel(this.oI18nModel,'i18n');
				this.oModel = this.getView().getModel();
				this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
				this.oDateFormatter = sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},new sap.ui.core.Locale(this.oAppImplementation.getResourceBundle().sLocale));
				
				//interoperability
				 this.sBackendVersion = cus.crm.opportunity.util.schema
					._getServiceSchemaVersion(this.oModel,
					"Opportunity");
				 this.oVersioningModel = new sap.ui.model.json.JSONModel({BackendSchemaVersion : this.sBackendVersion});	
					this.oVersioningModel.updateBindings();
					this.getView().setModel(this.oVersioningModel,"versioning");
				this._versionSpecificInitializations(this.sBackendVersion);
				//storing context to go back on cancel 
				this.oRouter.attachRouteMatched(function(oEvent) {
					if (oEvent.getParameter("name") === "create") { this.followupOppt = false;
						this.ContextPath = oEvent.getParameter("arguments").contextPath;
						this.processType = oEvent.getParameter("arguments").processType;
						//Always clear the form on load
						this._clear_data();
						
//						Filling cutomizing in dropdowns
						var s3Controller = this.getView().getModel('controllers').getData().s3Controller;
						
						if(s3Controller === null){
							this.callController(s3Controller);
							/*var oModel = this.getView().getModel();
							var aBatchCustomizationReads = [
							                                oModel.createBatchOperation("SalesStages","GET"),
							                                oModel.createBatchOperation("Priorities","GET"),
							                                oModel.createBatchOperation("UserStatuses","GET"),
							                                oModel.createBatchOperation("Currencies","GET")
							                                ];
							oModel.addBatchReadOperations(aBatchCustomizationReads);
							s3Controller = {
									SalesStages:[],
									Priorities:[],
									UserStatuses:[],
									Currencies : []
							};

							oModel.submitBatch(jQuery.proxy(function(oResponses){
								if(oResponses.__batchResponses[0].statusCode === "200"){
									s3Controller.SalesStages  = oResponses.__batchResponses[0].data.results;
								}
								else
									this.handleErrors(oResponses,true);

								if(oResponses.__batchResponses[1].statusCode === "200"){
									s3Controller.Priorities = oResponses.__batchResponses[1].data.results;

								}
								else
									this.handleErrors(oResponses,true);
								if(oResponses.__batchResponses[2].statusCode === "200"){
									s3Controller.UserStatuses = oResponses.__batchResponses[2].data.results;
								}
								else 
									this.handleErrors(oResponses,true);
								
								if(oResponses.__batchResponses[3].statusCode === "200"){
									this.Currencies = oResponses.__batchResponses[3].data.results;

								}
								else
									this.handleErrors(oResponses,true);

								this.fill_dropDowns(s3Controller);
							},this),jQuery.proxy(this.handleErrors,this),true);*/

						}
						else
						{
							this.Currencies = s3Controller.Currencies;
							this.ContactCollection = s3Controller.ContactCollection;
							this.s3Controller_contact = s3Controller;
							this.fill_dropDowns(s3Controller);
						}

						//set the default date
						this.byId('inputEmpResponsible_S5').setValue("");
						this.oSelectedEmployee = {};
						this.byId('datePickerStartDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
						this.getView().byId('datePickerCloseDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
						
						
						// set ProcessType Description.
						this.getView().byId("laTypeInput").setVisible(false);
						this.getView().byId("TxtTypeInput").setVisible(false);
						var processTypeDescr = null;
						var s2Controller = this.oApplicationFacade.getApplicationModel("s2Controller").getData().s2Controller;
						if (s2Controller != null	|| s2Controller != undefined) {
							processTypeDescr = s2Controller.processTypeDesc;
							if (processTypeDescr != null || parseFloat( this.sBackendVersion ) >= 3) {
								this.getView().byId("laTypeInput").setVisible(true);
								this.getView().byId("TxtTypeInput").setVisible(true);
								this.getView().byId("TxtTypeInput").setText(processTypeDescr);
							}
						}
					
						//EXTENSION POINT
						  /**
						 * @ControllerHook extHookCustomLogicForAttachRouteMatch is the controller hook that provides for using custom logic for newly added extension points.
					 *                  For example, set values for dropdown lists.
						 *                
						 * @callback cus.crm.opportunity.S5.controller~extHookCustomLogicForAttachRouteMatch
						 * @param  {object} oEvent 
						 * @return {void}
						 */
						if (this.extHookCustomLogicForAttachRouteMatch){
							this.extHookCustomLogicForAttachRouteMatch(oEvent);
						}
					}
					else if(oEvent.getParameter("name") === "fulScrCreateFollowup")
						
						{  
						this.fullScreen = true;
						this.oHeaderFooterOptions.onBack =  jQuery.proxy(this.onCancel,this);
						
						
						//startupparameter
						
                     var oStartupParameter = this.getView().getModel("startupParameters");
						
						if (oStartupParameter && oStartupParameter.oData) {
							if (oStartupParameter.oData.parameters) {
								for ( var param in oStartupParameter.oData.parameters) {
									
									
									if (oStartupParameter.oData.parameters[param].key == "AccountName") {
										this.AccountName = oStartupParameter.oData.parameters[param].value;
										//console.log("AccountName"+this.AccountName);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "ContactName") {
										this.ContactName = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "processType") {
										this.processType = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "StartDate") {
										this.StartDate = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "title") {
										this.title = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "ProcessTypeDescription") {
										this.ProcessTypeDescription = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "appointmentGuid") {
										this.appointmentGuid = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "Responsible") {
										this.Responsible = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "ResponsibleTxt") {
										this.ResponsibleTxt = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "AccountId") {
										this.AccountId = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									if (oStartupParameter.oData.parameters[param].key == "ContactId") {
										this.contactId = oStartupParameter.oData.parameters[param].value;
										//console.log("opportunityId"+this.opportunityId);
																	
									}
									
								}
								
							}
							
						}
						
						
						
						
						this.ContextPath = oEvent.getParameter("arguments").contextPath;
						//this.processType = oEvent.getParameter("arguments").processType;
						 var that = this ; 
						
						that.s3Controller = this.getView().getModel('controllers').getData().s3Controller;
						if(that.s3Controller === null){
							this.callController(that.s3Controller);
						
					
						}
						
						sap.ca.ui.utils.busydialog.requireBusyDialog();
						this.followUpView();
						sap.ca.ui.utils.busydialog.releaseBusyDialog();
						
						
						
						}
					else if(oEvent.getParameter("name") === "FollowupFromTask")
						
					{  
					this.fullScreenFromTask = true;
					this.oHeaderFooterOptions.onBack =  jQuery.proxy(this.onCancel,this);
					
					
					//startupparameter
					
                 var oStartupParameter = this.getView().getModel("startupParameters");
					
					if (oStartupParameter && oStartupParameter.oData) {
						if (oStartupParameter.oData.parameters) {
							for ( var param in oStartupParameter.oData.parameters) {
								
								if (oStartupParameter.oData.parameters[param].key == "AccountID") {
									this.AccountID = oStartupParameter.oData.parameters[param].value;
									//console.log("AccountName"+this.AccountName);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "AccountName") {
									this.AccountName = oStartupParameter.oData.parameters[param].value;
									//console.log("AccountName"+this.AccountName);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "ContactID") {
									this.contactId = oStartupParameter.oData.parameters[param].value;
									//console.log("AccountName"+this.AccountName);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "ContactName") {
									this.ContactName = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "FUO") {
									this.FUO = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "ProcessTypeDescription") {
									this.ProcessTypeDescription = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "taskGuid") {
									this.taskGuid = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								if (oStartupParameter.oData.parameters[param].key == "taskId") {
									this.taskId = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								/*if (oStartupParameter.oData.parameters[param].key == "StartDate") {
									this.StartDate = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}*/
								if (oStartupParameter.oData.parameters[param].key == "title") {
									this.title = oStartupParameter.oData.parameters[param].value;
									//console.log("opportunityId"+this.opportunityId);
																
								}
								
								
								
								
								
							}
							
						}
						
					}
					
					
					
					
					this.ContextPath = oEvent.getParameter("arguments").contextPath;
					this.processType = oEvent.getParameter("arguments").processType;
					 var that = this ; 
					
					that.s3Controller = this.getView().getModel('controllers').getData().s3Controller;
					if(that.s3Controller === null){
						this.callController(that.s3Controller);
					/*var oModel = this.getView().getModel();
					var aBatchCustomizationReads = [
					                                oModel.createBatchOperation("SalesStages","GET"),
					                                oModel.createBatchOperation("Priorities","GET"),
					                                oModel.createBatchOperation("UserStatuses","GET"),
					                                oModel.createBatchOperation("Currencies","GET")
					                                ];
					oModel.addBatchReadOperations(aBatchCustomizationReads);
					that.s3Controller = {
							SalesStages:[],
							Priorities:[],
							UserStatuses:[],
							Currencies : []
					};

					oModel.submitBatch(jQuery.proxy(function(oResponses){
						if(oResponses.__batchResponses[0].statusCode === "200"){
							that.s3Controller.SalesStages  = oResponses.__batchResponses[0].data.results;
						}
						else
							this.handleErrors(oResponses,true);

						if(oResponses.__batchResponses[1].statusCode === "200"){
							that.s3Controller.Priorities = oResponses.__batchResponses[1].data.results;

						}
						else
							this.handleErrors(oResponses,true);
						if(oResponses.__batchResponses[2].statusCode === "200"){
							that.s3Controller.UserStatuses = oResponses.__batchResponses[2].data.results;
						}
						else 
							this.handleErrors(oResponses,true);
						
						if(oResponses.__batchResponses[3].statusCode === "200"){
							this.Currencies = oResponses.__batchResponses[3].data.results;

						}
						else
							this.handleErrors(oResponses,true);

						this.fill_dropDowns(that.s3Controller);
					},this),jQuery.proxy(this.handleErrors,this),true);*/
						

				
					}
					
					sap.ca.ui.utils.busydialog.requireBusyDialog();
					this.fromTaskFollowUpView();
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
					
					
					
					}
					else if (oEvent.getParameter("name") === "createFollowup" )
					{
						
						this.followupOppt = true;
			
						
						this.ContextPath = oEvent.getParameter("arguments").contextPath;
						this.processType = oEvent.getParameter("arguments").processType;
						
						sap.ca.ui.utils.busydialog.requireBusyDialog();
						this.bindEditView();
						sap.ca.ui.utils.busydialog.releaseBusyDialog();
						
						
						}
				}, this);
        
				this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
				this.oNav = this.oAppImplementation.oAppNavigator;

				/*Scaffolding buttons*/
				that = this;
				this.oHeaderFooterOptions =
				{
						onBack : (jQuery.device.is.phone || this.fullScreen || this.fullScreenFromTask) ? jQuery.proxy(this.onCancel,this) : null,
						oEditBtn : {
							sI18nBtnTxt : "SAVE",
							onBtnPressed : function(evt) {
								that.getController().onSave();
							},
							bEnabled : false, // default true
						},
						buttonList : [ {
							sI18nBtnTxt : "CANCEL",
							onBtnPressed : function(evt) {
								that.getController().onCancel();
							}
						}],

				};

				/*Selection on stagedropdown, chance of sccuess should change*/
				var that = this.getView();
				this.getView().byId('stagedropdown').attachChange( null, function(oEvent){
					if(that.byId('statusdropdown').getSelectedKey()!=that.getController().WinStatusCode && that.byId('statusdropdown').getSelectedKey()!=that.getController().LostStatusCode ){
						var data=this.getModel("json").getData();
						var length = data.SalesStages.length;
						for (var i=0; i<length;i++){
							if  (data.SalesStages[i].ProcessType=== that.getController().processType && data.SalesStages[i].SalesStageCode === oEvent.getParameter("selectedItem").getKey()){
								that.byId("chanceofSuccess").setValue( Number(data.SalesStages[i].ChanceOfSuccess));
							}
						}
					}
				});

				//
				//Chance of Success based on userStatus
				this.getView().byId('statusdropdown').attachChange( null, function(oEvent){
					if  (that.getController().WinStatusCode === oEvent.getParameter("selectedItem").getKey()){
						that.byId("chanceofSuccess").setValue( 100);
					}
					if  (that.getController().LostStatusCode === oEvent.getParameter("selectedItem").getKey()){
						that.byId("chanceofSuccess").setValue(0);
					}

				});

				//Prevent manual entry in Date
				this.byId('datePickerCloseDate').attachBrowserEvent("keydown",jQuery.proxy(function(oEvent)
						{
					//oEvent.preventDefault();
					  this.setValueState(sap.ui.core.ValueState.None);
						},this.byId('datePickerCloseDate')));

				this.byId('datePickerStartDate').attachBrowserEvent("keydown",jQuery.proxy(function(oEvent)
						{
					//oEvent.preventDefault();
					  this.setValueState(sap.ui.core.ValueState.None);
						},this.byId('datePickerStartDate')));
				
				//F4 needed on enter in contact field
				this.byId('inputMainContact').attachBrowserEvent("keyup",function(oEvent){ 
		            //keycode for enter is 13
		            if(oEvent.keyCode === 13)
		            {
		                  this.showContactF4();
		            }},this
				);	

				//Prevent manual entry in account f4
				this.byId('customer').attachBrowserEvent("keydown",jQuery.proxy(function(oEvent)
						{
					         if(oEvent.keyCode === 13){
					        	 this.showAccountF4(); 
					         }
						},this));

				/*Date validation*/
				this.getView().byId('datePickerCloseDate').attachChange(null,function(oEvent) {
					 var dateString= oEvent.getParameter('newYyyymmdd');
					 if(dateString !== null){
					  var tempDate = new Date(parseInt(dateString.substr(0,4)),
							                  parseInt(dateString.substr(4,2) - 1),
							                  parseInt(dateString.substr(6,2)));
				     this.byId('datePickerCloseDate').setValue(this.oDateFormatter.format(tempDate));   } 
					 this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
					 this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);

				}, this);
				this.getView().byId('datePickerStartDate').attachChange(null,function(oEvent) {
					this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
					  this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
					  var dateString= oEvent.getParameter('newYyyymmdd');
					  if(dateString !== null){
					  var tempDate = new Date(parseInt(dateString.substr(0,4)),
							                  parseInt(dateString.substr(4,2) - 1),
							                  parseInt(dateString.substr(6,2)));
					this.byId('datePickerStartDate').setValue(this.oDateFormatter.format(tempDate));}

				}, this);
			},
			
			_versionSpecificInitializations : function(sBackendVersion){
				
				var sAccountAnnotation = cus.crm.opportunity.util.schema._getEntityAnnotation(this.oModel,'service-schema-version','Account');
				this.accountF4Template = new sap.m.StandardListItem({
					//title : (sAccountAnnotation === null) ? "{name1}" : "{fullName}",
					title : (parseFloat(sBackendVersion) <= 1) ? "{parts:[{path:'name1'}],formatter : 'cus.crm.opportunity.util.Formatter.getAccountF4Title'}" : "{parts:[{path:'fullName'}],formatter : 'cus.crm.opportunity.util.Formatter.getAccountF4Title'}",
							
					description : "{parts:[{path : 'accountID'},{path : 'MainAddress/city'},{path : 'MainAddress/country'}],formatter : 'cus.crm.opportunity.util.Formatter.formatAccountF4Description'}",
				    active : true
				});
				
				this.accountF4Template.data("NAME",( (sAccountAnnotation === null) ? "{name1}" : "{fullName}"));
				this.accountF4Template.data("ID","{accountID}");
			
		},
			fill_dropDowns: function(s3Controller)
			{
				
				// NLUN - CodeScan Changes - length is javascrip keyword
				var i,statusLength;
				var jsonModel =new sap.ui.model.json.JSONModel();
				var jsonModel1 =new sap.ui.model.json.JSONModel();
				var jsonModel2 =new sap.ui.model.json.JSONModel();

				//set userstatus
				statusLength = s3Controller.UserStatuses.length;
				// NLUN - CodeScan Changes - Global Variables
				var data1 = {
						UserStatuses : [
						                {
						                	BusinessTransaction: "",
						                	LanguageCode: "",
						                	ProcessType: this.processType,
						                	StatusProfile: "",
						                	UserStatusCode: "",
						                	UserStatusText: "",
						                }
						                ]
				};
				
				var initialStatus= "";
				
				for(i=0;i< statusLength;i++){
					if (s3Controller.UserStatuses[i].ProcessType === this.processType){
						data1.UserStatuses.push(s3Controller.UserStatuses[i]);
						
						if(parseFloat(this.sBackendVersion) >= 3){ 
							
							if(s3Controller.UserStatuses[i].InitialStatus == true)
								initialStatus = s3Controller.UserStatuses[i].UserStatusCode;
						}
							
						
						if(this.UserStatusCode==="" && s3Controller.UserStatuses[i].UserStatusCode!=""){
							this.UserStatusCode=s3Controller.UserStatuses[i].UserStatusCode;
							this.UserStatusText=s3Controller.UserStatuses[i].UserStatusText;
						}
						
						if (s3Controller.UserStatuses[i].BusinessTransaction === "WINN"){
							this.getView().getController().WinStatusCode =  s3Controller.UserStatuses[i].UserStatusCode ;
						}
						if (s3Controller.UserStatuses[i].BusinessTransaction === "LOST"){
							this.getView().getController().LostStatusCode =  s3Controller.UserStatuses[i].UserStatusCode ;
						}
						this.StatusProfile = s3Controller.UserStatuses[i].StatusProfile;
					}
				}
				jsonModel.setData(data1);
				this.byId('statusdropdown').setModel(jsonModel,"json");
				this.byId('statusdropdown').setSelectedKey(initialStatus);
				
				//set priority
				var data2 = {
						Priorities : [
						              {
						            	  LanguageCode: "",
						            	  PriorityCode: "",
						            	  PriorityText: "",
						              }
						              ]

				};
				statusLength = s3Controller.Priorities.length;
				for(i=0;i< statusLength;i++){
					data2.Priorities.push(s3Controller.Priorities[i]);
				};
				jsonModel1.setData(data2);
				this.byId('priority_val').setModel(jsonModel1,"json");
				//set salesStage
				statusLength = s3Controller.SalesStages.length;
				// NLUN - CodeScan Changes - Global Variables
				var data3 = {
						SalesStages :[{
							ChanceOfSuccess: "",
							LanguageCode: "",
							ProcessType: this.processType,
							SalesStageCode: "",
							SalesStageDescription: "",
							SalesStageOrder: "",
						}]
				};
				for(i=0;i< statusLength;i++){
					if (s3Controller.SalesStages[i].ProcessType === this.processType){
						data3.SalesStages.push(s3Controller.SalesStages[i]); 
					}
				}
				jsonModel2.setData(data3);
				this.byId('stagedropdown').setModel(jsonModel2,"json");
			},
			/*Workaround for enabling footer*/
			onAfterRendering: function() {
				cus.crm.opportunity.util.Formatter.resetFooterContentRightWidth(this);

			},
			
			onBeforeRendering : function(){
				
				this.getView().getModel("controllers").getData().s5Controller = this;
			},

			//Enable buttons using scaffolding
			getHeaderFooterOptions : function() {
				return this.oHeaderFooterOptions;
				var that = this;	
				return {
					oPositiveAction : {
						sI18nBtnTxt : "SAVE",
						onBtnPressed : function() {
							this.onSave();
						},
					},

					oNegativeAction : {
						sI18nBtnTxt : "CANCEL",
						// sBtnTxt : "",
						onBtnPressed : function(evt) {
							this.onCancel();
						},
					},
				};
			},


			/*Nav Back button*/
			toDetail : function() {
				this.onCancel();

			},
			
			//Oncancel button
			onCancel : function() {
				sap.ca.ui.dialog.confirmation.open({
					question :sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('DATA_LOSS'),
					title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('WARNING'),
					confirmButtonLabel : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('CONTINUE')  	

				},jQuery.proxy(this.datalossDismissed,this));
			},
			datalossDismissed : function(oResult)
			{
				if(oResult.isConfirmed === false)
					return;	
				if(!this.followupOppt)
					var ctx = this.ContextPath;
					else 
				  var 	ctx = "Opportunities(guid'" + this.ContextPath + "')" ;
				if(!jQuery.device.is.phone && !this.fullScreen && !this.fullScreenFromTask){
					this.oRouter.navTo("detail", {
						contextPath : ctx },!jQuery.device.is.phone);
				}
				else if(!jQuery.device.is.phone && this.fullScreen){
					window.history.back();
				}
				else if(!jQuery.device.is.phone && this.fullScreenFromTask){
					window.history.go(-2);
				}
				else
					this._navBack();
				this._clear_data();
				this._enableMasterFooter("");
			},

			
			//OPen Dialog on Add
			onAddProduct : function(oEvent) {
				
				if(!this.oAddProductsFragment){
					 
						this.oAddProductsFragment = sap.ui.xmlfragment("cus.crm.opportunity.view.ProductBasketDialog", this);
						this.oAddProductsFragment.setModel(new sap.ui.model.json.JSONModel(),"json");
						this.oAddProductsFragment.setModel(this.getView().getModel("i18n"), "i18n");
						
				 }
	            
				this.oAddProductsFragment.getBeginButton().setEnabled(false);
				this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('LOADING_TEXT')); 
				this.oAddProductsFragment.getSubHeader().getContentLeft()[0].clear();
				this.oModel.read("Products",null,null,true,jQuery.proxy(function(odata,response){
					
					if(response.data.results.length === 0)
						this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
					this.oAddProductsFragment.getModel("json").setData({Products : response.data.results});
					
				},this),function(oError){
					
					
					
				});   
				
				this.oAddProductsFragment.open();
			},


			//handle click of save
			onSave : function() {
				
				
				//EXTENSION POINT
				var bValue = true;
				 /**
				 * @ControllerHook extHookOnSave is the controller hook that provides for validation of the extended data before saving.
				 * @callback cus.crm.opportunity.S5.controller~extHookOnSave
				 * @return {boolean}
				 */
				if (this.extHookOnSave){
					bValue =  this.extHookOnSave();
				}
				if(!bValue){
					return;
				}
				//save only if if all data is validated
				if(this.validateDates()===false)
					return;
				//Check if contact is filled correctly
				if((this.byId('inputMainContact').getValue() !== "" && this.contactId===undefined)){		
					this.showContactF4();
					return;
				}
				if(this.byId('inputMainContact').getValue() === "")
					{
					this.contactId=undefined;
					}
				
				if(this.validateSavePage() === false){
					sap.ca.ui.message.showMessageToast(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('MANDAT_FIELD'));
					return;
				}
				
				if(this.validateCurrency()===true){

					sap.ca.ui.dialog.confirmation.open({
						question : this.currencyMessage,
						title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('WARNING'),
						confirmButtonLabel : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('CONTINUE')   
					
					},jQuery.proxy(this.dataConfirm,this));
				}
				else
					this.dataConfirm({isConfirmed : true});
				
				
				
			},
			
			
			dataConfirm :function(oResult)
			
			{
				 if(oResult.isConfirmed){

				
				//Fixing the chance of success if oppo win or lost
				if  (this.WinStatusCode === this.byId('statusdropdown').getSelectedKey()){
					this.getView().byId("chanceofSuccess").setValue(100);

				}
				if  (this.LostStatusCode === this.byId('statusdropdown').getSelectedKey()){
					this.getView().byId("chanceofSuccess").setValue(0);

				}
				var userStatusKey = "";
				var userStatusText = "";
				// set default values
				if(this.byId('statusdropdown').getSelectedKey()==""){
					userStatusKey = this.UserStatusCode;
					userStatusText = this.UserStatusText;
				}
				else
				{
					userStatusKey = this.byId('statusdropdown').getSelectedKey();
					userStatusText = this.byId('statusdropdown').getSelectedItem().getText();
				}

				var formatter=sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},new sap.ui.core.Locale(this.oAppImplementation.getResourceBundle().sLocale));
				var start_date = new Date(formatter.parse(this.byId('datePickerStartDate').getValue()));
				var end_date = new Date(formatter.parse(this.byId('datePickerCloseDate').getValue()));

				var start_date_string = start_date.getFullYear() + "-"
				+ (start_date.getMonth()+1) + "-"
				+ start_date.getDate() + "T00:00:00";	

				var end_date_string = end_date.getFullYear() + "-"
				+ (end_date.getMonth()+1) + "-"
				+ end_date.getDate() + "T00:00:00";
				var emptyGuid ="00000000-0000-0000-0000-000000000000";
				var oModel = this.getView().getModel();
				var that=this;
				if(this.followupOppt){
					this.PredecessorGUID=this.ContextPath ;
					
				}
				else if(this.fullScreen){
					this.PredecessorGUID=this.appointmentGuid;
					this.accountId=this.AccountId;
				//	this.contactId=this.ContactId;
					
				}
				else if(this.fullScreenFromTask){
					this.PredecessorGUID=this.taskGuid;
					this.accountId=this.AccountID;
				//	this.contactId=this.ContactID;
				}
				else{
					this.PredecessorGUID=null;
				}
				var oEntry = {
						Description : this.byId('desc').getValue(),
						ProcessType :  this.processType,

						StartDate : start_date_string,
						ClosingDate : end_date_string,

						ExpectedSalesVolume : this.byId('volume')
						.getValue(),
						SalesStageCode : this.byId('stagedropdown')
						.getSelectedKey(),

						UserStatusCode :userStatusKey,
						UserStatusText :userStatusText,
						PriorityCode : this.byId('priority_val')
						.getSelectedKey(),
						PriorityText : this.byId('priority_val')
						.getSelectedItem().getText(),
						ProspectName : this.byId('customer').getValue(),
						ProspectNumber : this.accountId,
						MainContactId : this.contactId,
						MainContactName : this.byId('inputMainContact').getValue(),
						ChanceOfSuccess : this.byId('chanceofSuccess').getValue(),
						ForecastRelevance : this.byId('Switch').getState(),
						CurrencyCode :  this.byId('currency').getValue(),
						//PredecessorGUID :this.PredecessorGUID,
						//PredecessorGUID : (this.followupOppt) ? this.ContextPath : null  ,
						Guid : emptyGuid,
						Statuses : [ {
							HeaderGuid :emptyGuid,
							StatusProfile : this.StatusProfile ,//"CRMOPPOR",
							UserStatusCode :userStatusKey,
							UserStatusText : userStatusText,
							StatusOrderNumber : "01",
						} ],
						Products : [

						            ],

				};
				if(parseFloat(this.sBackendVersion) >= 2.0){
				  oEntry["EmployeeResponsibleNumber"]  =  this.oSelectedEmployee.employeeID;
				}
				 if(parseFloat(this.sBackendVersion) >= 3.0){
					  oEntry["PredecessorGUID"]  =  this.PredecessorGUID ; 
					}
				var productList = this.getView().byId("productBasket")
				.getModel("json").getData().Products;
				var i = 0;
				if(productList && productList.length ){
					var length = productList.length;
					var oListItem;
					for (i = 0; i < length; i++) {
						oListItem = productList[i];
						var pushObject = {
								HeaderGuid : emptyGuid,
								ProcessingMode : "A",
								ProductGuid : oListItem.ProductGuid,
								ProductId : oListItem.ProductId,
								ProductName : oListItem.ProductName,
								Quantity :  oListItem.Quantity,
								TotalExpectedNetValue :  oListItem.TotalExpectedNetValue,
								Unit : oListItem.Unit
						};
						
						/**
						 * @ControllerHook extHookExtendProductEntry is the controller hook that provides for extension of pushObject. 
						 *                 This enables modification of the product entry that is being updated.
						 *                
						 *                                   
						 * @callback cus.crm.opportunity.S5.controller~extHookExtendProductEntry
						 * @param {object} pushObject
						 * @param {object} oListItem        
						 * @return {void}
						 */
						if(this.extHookExtendProductEntry){
							this.extHookExtendProductEntry(pushObject,oListItem);
						}
						oEntry.Products.push(pushObject);
					}
				}
				
				// EXTENSION POINT to be able to extend oEntry 
				/**
				 * @ControllerHook extHookSaveOentry is the controller
				 *                 hook where the oEntry can be 
				 *                 extended. New Attributes can be defined in addition to the 
				 *                 existing oEntry attributes. 
				 *                                   
				 * @callback cus.crm.opportunity.S5.controller~extHookSaveOentry
				 * @param {object}
				 *           oEntry
				 * @return {void}
				 */
			
				if(this.extHookSaveOentry){
					this.extHookSaveOentry(oEntry);
				}
				oModel.refreshSecurityToken();
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				var prev = this;
				oModel.create('/Opportunities',oEntry,null,
						function (oData, response) {
					
					var s2Controller = that.getView().getModel("controllers").getData().s2Controller;
					
					if(s2Controller){
						s2Controller.opportunityID = oData.Id;
					}
					if(!prev.fullScreen && !prev.fullScreenFromTask)
					that._enableMasterFooter(response.data.Guid);
					that.ContextPath = "Opportunities(guid'" + response.data.Guid + "')";
					if(prev.followupOppt || prev.fullScreen || prev.fullScreenFromTask)
					{
					var message = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('followupsuccessful');
				     sap.m.MessageToast.show(message, {
					   closeOnBrowserNavigation : false
				});
					}
				else
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_SUCCESS'));
					that._clear_data();
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
					var ctx = that.ContextPath;
					if(!jQuery.device.is.phone && (!prev.fullScreen) && (!prev.fullScreenFromTask))
						that.oRouter.navTo("detail", {
							contextPath : ctx },true);
					else if(!jQuery.device.is.phone && (prev.fullScreen))
						{ window.history.back();}
					else if(!jQuery.device.is.phone && (prev.fullScreenFromTask))
					{ window.history.go(-2);;}
					else
						that._navBack();
					
					
				}, 
				function (oMessage) {
					that.displayResponseErrorMessage(oMessage, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_FAILED'));
					sap.ca.ui.utils.busydialog.releaseBusyDialog();
					
				}
				);
				 }
				 else
					 return;
				 this.fullScreen=false;
				 this.followupOppt=false;
				 this.fullScreenFromTask=false;
			},

			displayResponseErrorMessage:function (oMessage, sDefaultMessage) {
				var sMessage;
				if (oMessage.response) {
					sMessage = jQuery.parseJSON(oMessage.response.body).error.message.value;
				}
				else
					sMessage = sDefaultMessage;
				sap.ca.ui.message
				.showMessageBox({
					type : sap.ca.ui.message.Type.ERROR,
					message : sMessage,
				});
			},

			//Enable add and sort buttons
			_enableMasterFooter : function(guidValue){
				//Enable footer buttons of Master
				
				var s2Controller  = this.getView().getModel('controllers').getData().s2Controller;
				s2Controller.setBtnEnabled("sort", true);
				s2Controller.setBtnEnabled("BTN_S2_ADD", true);
				s2Controller.setBtnEnabled("BTN_S2_SHOW", true);

				//Apply search on master list
				var descripion = this.byId('desc').getValue();
				if(descripion!=""){
					s2Controller.desc=descripion;
					s2Controller.nGuid = guidValue;
					s2Controller.bCreateOppt = true; 
					s2Controller._modifyListAfterCreate();

				}
			},
			

			callController:function(s3Controller){
				var oModel = this.getView().getModel();
				var aBatchCustomizationReads = [
				                                oModel.createBatchOperation("SalesStages","GET"),
				                                oModel.createBatchOperation("Priorities","GET"),
				                                oModel.createBatchOperation("UserStatuses","GET"),
				                                oModel.createBatchOperation("Currencies","GET")
				                                ];
				oModel.addBatchReadOperations(aBatchCustomizationReads);
				s3Controller = {
						SalesStages:[],
						Priorities:[],
						UserStatuses:[],
						Currencies : []
				};

				oModel.submitBatch(jQuery.proxy(function(oResponses){
					if(oResponses.__batchResponses[0].statusCode === "200"){
						s3Controller.SalesStages  = oResponses.__batchResponses[0].data.results;
					}
					else
						this.handleErrors(oResponses,true);

					if(oResponses.__batchResponses[1].statusCode === "200"){
						s3Controller.Priorities = oResponses.__batchResponses[1].data.results;

					}
					else
						this.handleErrors(oResponses,true);
					if(oResponses.__batchResponses[2].statusCode === "200"){
						s3Controller.UserStatuses = oResponses.__batchResponses[2].data.results;
					}
					else 
						this.handleErrors(oResponses,true);
					
					if(oResponses.__batchResponses[3].statusCode === "200"){
						this.Currencies = oResponses.__batchResponses[3].data.results;

					}
					else
						this.handleErrors(oResponses,true);

					this.fill_dropDowns(s3Controller);
				},this),jQuery.proxy(this.handleErrors,this),true);
			},

			//Clear Data of Create Form
			_clear_data : function(){
				this.byId('desc').setValue("");
				this.byId('desc').setValueState(sap.ui.core.ValueState.None);
				this.byId('volume').setValue("");
				this.byId('inputMainContact').setValue("");
				this.byId('customer').setValue("");
				this.byId('customer').setValueState(sap.ui.core.ValueState.None);
				this.byId('currency').setValue("");
				this.byId('chanceofSuccess').setValue("");
				this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerStartDate').setValue("");
				this.byId('datePickerCloseDate').setValue("");
				this.byId('statusdropdown').setSelectedKey();
				this.byId('priority_val').setSelectedKey("");
				this.byId('stagedropdown').setSelectedKey("");
				this.byId('Switch').setState(true);
				var data = {
						Products : [
						            ],
				};
				this.byId('productBasket').getModel("json").setData(
						data);
				this.accountId = undefined;
				this.accountName = "";
			},

			//Search products in produc popup
			onSearchProduct : function(oEvent) {
				
				//filter products based on Product description
				this.oAddProductsFragment.getBeginButton().setEnabled(false);
				this.oAddProductsFragment.getContent()[0].removeSelections();
				this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('LOADING_TEXT'));
				this.oAddProductsFragment.getModel('json').setData({Products : []});
				var aFilters = [];
				var sQuery = oEvent.getParameter("query");
				
				if(sQuery !== ""){
					aFilters.push("$filter=substringof('" + sQuery + "',ProductDescription)");
				}
				
				
				this.oModel.read("Products",null,aFilters,true,jQuery.proxy(function(odata,response){
					
					if(response.data.results.length === 0){
						this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
					}
					this.oAddProductsFragment.getModel('json').setData({Products : response.data.results});
					
					
				},this),jQuery.proxy(function(oError){
					
					this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
					
				},this));
			},

onCancelDialog : function(oEvent) {
				
				this.oAddProductsFragment.close();
				this.oAddProductsFragment.getContent()[0].removeSelections();
			},


			onAddDialog : function(oEvent) {
				var oProductList = this.oAddProductsFragment.getContent()[0];
				var oSelectedItems = oProductList.getSelectedItems();
				var productBasketData = {
						Products : []
				};
				var data = this.byId('productBasket').getModel("json").getData();
				if(data && data.hasOwnProperty("Products"))
					productBasketData.Products = data.Products;
				var i = 0;
				var length = oSelectedItems.length;
				var oListItem;
				for (i = 0; i < length; i++) {
					oListItem = oSelectedItems[i];
				 var tempObject = oListItem.getBindingContext("json").getObject();
					// Need Clarification when there is no unit
					/*if(tempObject.Unit===""){
						 return;
					}*/
					var pushObject = {
							ItemGuid : "",
							ProcessingMode : "",
							ProductGuid : tempObject.ProductGuid,
							ProductId : tempObject.ProductId,
							ProductName : tempObject.ProductDescription,
							Quantity : "1",
							Unit : tempObject.Unit,
					};
					/**
					 * @ControllerHook extHookExtendProductEntryOnAdd is the controller hook that provides for addition of extra fields to the product entry for the product basket.
					 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookExtendProductEntryOnAdd
					 * @param {object} pushObject
					 * @param {object} tempObject       
					 */
					if (this.extHookExtendProductEntryOnAdd){
					     this.extHookExtendProductEntryOnAdd(pushObject,tempObject);
					}
					productBasketData.Products.push(pushObject);
				}
				var productBasketModel = new sap.ui.model.json.JSONModel(
						productBasketData);
				this.byId('productBasket').setModel(productBasketModel,"json");

				this.byId('productBasket').getModel("json").setData(
						productBasketData);
				oProductList.removeSelections();
				oEvent.getSource().getParent().close();
			},

			deleteProduct : function(oEvent) {
				var data = oEvent.getSource().getModel("json").getData();
				var product = oEvent.getSource().getBindingContext("json")
				.getObject();
				var i;
				var length = data.Products.length;
				var s5Controller = this.getView().getController();
				for (i = 0; i < length; i++)
					if (product === data.Products[i]) {
						data.Products.splice(i, 1);

					}
				s5Controller.byId('productBasket').getModel("json").setData(
						data);

			},

			showContactF4 : function(oEvent) {
				var oModel = this.getView().getModel();
				this.contactF4Fragment.getContent()[0].removeSelections();
				this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel());
				this.contactF4Fragment.setModel(this.getView().getModel(
				"i18n"), "i18n");
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				var toolbar = this.contactF4Fragment.getContent()[0].getInfoToolbar();
				var toolbarLabel = toolbar.getContent()[0];
				toolbar.setVisible(false);
				var searchtxt = this.byId('inputMainContact')._lastValue;
		        var Text = searchtxt.split('/'); 
		      //  var searchstrng = Text[0].trimRight();
		        var searchstrng = Text[0].replace(/\s+$/,"");
		        this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue(searchstrng);
		        var accountName = this.accountName;
				this.opportunity_number= this.accountId;
				this.contactF4Fragment.open();
				var jsonModel = new sap.ui.model.json.JSONModel();
				this.contactF4Fragment.setModel(jsonModel,"json");
				if(accountName != "" && accountName != undefined)
				{
					toolbar.setVisible(true);
					toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + accountName);	
					oModel.read("/AccountCollection(accountID='" + this.opportunity_number + "')/Contacts",null,["$filter=substringof('"+searchstrng+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
						this.contactF4Fragment.getModel('json').setData({ 
							ContactCollection : response.data.results 	        		
						});
						if(response.data.results.length === 0)
							this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));

					},this),jQuery.proxy(function(oError)
							{
						this.contactF4Fragment.getModel('json').setData({
							ContactCollection : []
						});
						this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));
							},this));
					
		     }
		     else
		     {
		    	 toolbar.setVisible(false);
		    	 this.contactF4Fragment.getModel('json').setData({ContactCollection : []});
			     this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
			    oModel.read("ContactCollection",null,["$filter=substringof('"+searchstrng+"'"+",fullName)"],true,jQuery.proxy(function(odata,response)
			    		 {
			    	  	  this.contactF4Fragment.getModel('json').setData({ 
		                  ContactCollection : response.data.results 	        		
		        });
			    	  if(response.data.results.length === 0)
		    	        	this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));     
			    		 },this),jQuery.proxy(function(oError)
			    	        {
			                	this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));
			    	        	
			    	        },this));
		     }
			},

			showAccountF4 : function(oEvent) {
				
				if(!this._accountSelectDialog){
					this._accountSelectDialog = new sap.ui.xmlfragment("cus.crm.opportunity.view.AccountSelectDialog", this);
					this._accountSelectDialog.setModel(this.getView().getModel());
					this._accountSelectDialog.setModel(this.getView().getModel("i18n"), "i18n");
					this._accountSelectDialog._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
					this._accountSelectDialog._list.setGrowingScrollToLoad(true);
					//need to check again
					this._accountSelectDialog._list.setGrowingThreshold(20);
					
					sap.ca.scfld.md.app.Application.getImpl().getConnectionManager().getModel().attachRequestSent(
							function () {
								if (this._list) {
									this._list.setNoDataText(this.getModel("i18n").getResourceBundle().getText("LOADING_TEXT"));
								}
							}
							, this._accountSelectDialog);
					
					sap.ca.scfld.md.app.Application.getImpl().getConnectionManager().getModel().attachRequestCompleted(
							function () {
								if (this._list) {
									this._list.setNoDataText(this.getModel("i18n").getResourceBundle().getText("NO_DATA_TEXT"));
								}
							}
							, this._accountSelectDialog);
					
					this._accountSelectDialog._dialog.setVerticalScrolling(true);
					}
				
				this._accountSelectDialog.getModel().attachRequestCompleted(null,this._setAccountF4Text,this);
				
				var aFilters = [];
				var sAccountAnnotation = cus.crm.opportunity.util.schema._getEntityAnnotation(this.oModel,'service-schema-version','Account');
				
				var sText = this.byId('customer').getValue();
				
				if(sText !== ""){
					aFilters.push(new sap.ui.model.Filter(((sAccountAnnotation === null) ? "name1" : "fullName"), sap.ui.model.FilterOperator.Contains, sText));	
				}
				
				this._accountSelectDialog._list.bindAggregation("items",{
					  path : "/AccountCollection",
					  parameters : {
						  expand : "MainAddress",
						  select : "accountID,MainAddress/city,MainAddress/country," + ((sAccountAnnotation === null) ? "name1" : "fullName")
					  },
					  filters : aFilters,
					  template : this.accountF4Template,
					 
				});

				
				this._accountSelectDialog.open();	
			},

			closeAccountF4 : function(oEvent) {
				this.byId('dialogAccountF4').close();
				this.accountf4open="";
			},

			closeContactF4 : function(oEvent) {
				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData({ContactCollection : []});
				this.contactF4Fragment.setModel(jsonModel,"json");
				this.contactF4Fragment.close();
			},

			setAccount : function(oEvent) {

				var selectedItem = oEvent.getParameter("selectedItem");
				var accountName = selectedItem.data('NAME');
				var accountId = selectedItem.data("ID");
				
				if(accountName !== ""){
					this.byId('customer').setValue(accountName);
					this.accountName = accountName;
				}
				else{
					//the accountId is set to the account field when the name is empty
					this.byId('customer').setValue(accountId);
				    this.accountName = accountId;			
			 	}			
				
				this.accountId = accountId;
				this.byId('customer').setValueState(sap.ui.core.ValueState.None);
				
			
			},
			closeEmployeeF4 : function(oEvent)
			{
				
				this.employeeF4Fragment.close();
			},
			
			//Handling employee f4 help (open and load)
			showEmployeeF4 : function(oEvent)
			{
				
				if(!this.employeeF4Fragment){
					this.employeeF4Fragment  =  new sap.ui.xmlfragment(this.createId("employeeF4"), 'cus.crm.opportunity.view.EmployeeF4', this);
					this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel(),"json");
					this.employeeF4Fragment.setModel(this.oI18nModel,'i18n');
					
				}
				this.employeeF4Fragment.getContent()[0].removeSelections();
				this.employeeF4Fragment.setModel(this.oI18nModel, "i18n");
				
				this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				var toolbar = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
				var toolbarLabel = toolbar.getContent()[0];
				toolbar.setVisible(false);
				var searchtxt = this.byId('inputEmpResponsible_S5').getValue();
		        var Text = searchtxt.split('/'); 
		        var searchstrng = Text[0].replace(/\s+$/,"");
		        this.employeeF4Fragment.getSubHeader().getContentLeft()[0].setValue(searchstrng);
				var opportunity_Data =this.HeaderObject;
				
			
				if(this.accountId !== undefined)
				{
					toolbar.setVisible(true);
					toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + this.accountName);	
					this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles",null,["$filter=substringof('"+this.byId('inputEmpResponsible_S5').getValue()+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
					
						this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
						this.employeeF4Fragment.getModel('json').setData({ 
							EmployeeCollection :  response.data.hasOwnProperty("results")  ?  response.data.results : [response.data]        		
						});
					    this.employeeF4Fragment.getModel('json').updateBindings();
					},this),jQuery.proxy(function(oError)
							{
						this.employeeF4Fragment.getModel('json').setData({
							EmployeeCollection : []
						});
						this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
							},this));
					
		     }
		     else{
		    	 toolbar.setVisible(false);
		    	 this.employeeF4Fragment.getModel('json').setData({EmployeeCollection : []});
			     this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
			    this.oModel.read("EmployeeCollection",null,["$filter=substringof('"+this.byId('inputEmpResponsible_S5').getValue()+"'"+",fullName)"],true,jQuery.proxy(function(odata,response)
			    		 {
			    	  this.employeeF4Fragment.getModel('json').setData({ 
		                  EmployeeCollection :   response.data.hasOwnProperty("results")  ?  response.data.results : [response.data]	        		
		                    });
			    	   	this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));     
			    		 },this),jQuery.proxy(function(oError)
			    	        {
			                	this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
			    	        	
			    	        },this));
		     }
				this.employeeF4Fragment.open();
			},
			closeEmpToolbar : function(oEvent)
			{
				var toolbar = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
				var olist =  this.employeeF4Fragment.getContent()[0];
				var searchText = this.employeeF4Fragment.getSubHeader().getContentLeft()[0].getValue();
				toolbar.setVisible(false);
				olist.getBinding("items").aFilters = [];
				olist.getBinding("items").sFilterParams = "";
				olist.getBinding("items").refresh();
				this.employeeF4Fragment.getModel('json').setData({EmployeeCollection : []});
				olist.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				this.oModel.read("EmployeeCollection",null,["$filter=substringof('" + searchText + "',fullName)"],true,jQuery.proxy(function(odata,response)
						{
					this.employeeF4Fragment.getModel('json').setData({ 
						EmployeeCollection : response.data.results 	        		
					});
							
					if(response.data.results.length === 0)
						this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_DATA_TEXT'));     
						},this),jQuery.proxy(function(oError)
								{
							this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_DATA_TEXT'));

								},this));
				
			},
			searchEmployee : function(oEvent)
			{
				var sValue = oEvent.getParameter("query");
				this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				var toolbar = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
				if(toolbar.getVisible()===false){
					this.oModel.read("EmployeeCollection",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
					
						this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
					 this.employeeF4Fragment.getModel('json').setData({ 
						 EmployeeCollection : (response.data.hasOwnProperty("results")) ? response.data.results : [response.data] 	        		
					 });
					
						

				 },this),jQuery.proxy(function(oError)
						 {
					 this.employeeF4Fragment.getModel('json').setData({

						 EmployeeCollection : []
					 });
					 this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));

						 },this));
				}
				else
					{		
					this.oModel.read("/AccountCollection(accountID='" + this.accountId + "')/EmployeeResponsibles",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
					
						this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
						this.employeeF4Fragment.getModel('json').setData({ 
						 EmployeeCollection : (response.data.hasOwnProperty("results")) ? response.data.results : [response.data] 	        		
					 });
					 
						 

				 },this),jQuery.proxy(function(oError)
						 {
					 this.employeeF4Fragment.getModel('json').setData({

						 EmployeeCollection : []
					 });
					 this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));

						 },this));
				}
				
			},
			setEmployee : function(oEvent)
			{
				this.oSelectedEmployee = oEvent.getSource().getSelectedItem().getBindingContext("json").getObject();
				if(this.oSelectedEmployee.fullName !== "")
					this.byId('inputEmpResponsible_S5').setValue(this.oSelectedEmployee.fullName);
				else 
					this.byId('inputEmpResponsible_S5').setValue(this.oSelectedEmployee.employeeID);
				this.employeeF4Fragment.getContent()[0].removeSelections();
				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData({EmployeeCollection : []});
				this.employeeF4Fragment.setModel(jsonModel,"json");
				this.employeeF4Fragment.close();

			},

			setContact : function(oEvent) {
				this.oSelectedContact = oEvent.getSource().getSelectedItem().getBindingContext("json").getObject();
				if(this.oSelectedContact.fullName !== "")
					this.byId('inputMainContact').setValue(this.oSelectedContact.fullName);
				else 
					this.byId('inputMainContact').setValue(this.oSelectedContact.contactID);
				this.contactId = this.oSelectedContact.contactID;
				this.contactF4Fragment.getContent()[0].removeSelections();
				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData({ContactCollection : []});
				this.contactF4Fragment.setModel(jsonModel,"json");
				this.contactF4Fragment.close();

			},

			searchAccount : function(oEvent){
				
				var sValue = oEvent.getParameter("value");
				var aFilters = [];
				
				if (sValue !== "") {
					
				    var sAccountAnnotation = cus.crm.opportunity.util.schema._getEntityAnnotation(this.oModel,'service-schema-version','Account');
					//push the necessary filter
					aFilters.push(new sap.ui.model.Filter(((sAccountAnnotation === null) ? "name1" : "fullName"), sap.ui.model.FilterOperator.Contains, sValue));
				}
				
				    var itemsBinding = oEvent.getParameter("itemsBinding");
				    
				    if(itemsBinding){
				            itemsBinding.aApplicationFilters = [];  
				            itemsBinding.filter(aFilters);
				    		
				    }
				
				
			},

			searchContact : function(oEvent)
			{
				var sValue = oEvent.getParameter("query");
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				var toolbar = this.contactF4Fragment.getContent()[0].getInfoToolbar();
				if(toolbar.getVisible()===false){
					this.getView().getModel().read("ContactCollection",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
					 this.contactF4Fragment.getModel('json').setData({ 
						 ContactCollection : response.data.results 	        		
					 });
					 if(response.data.results.length === 0)
						 this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));

				 },this),jQuery.proxy(function(oError)
						 {
					 this.contactF4Fragment.getModel('json').setData({

						 ContactCollection : []
					 });
					 this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));

						 },this));
				}
				else
					{		
					this.getView().getModel().read("/AccountCollection(accountID='" + this.accountId + "')/Contacts",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
					 this.contactF4Fragment.getModel('json').setData({ 
						 ContactCollection : response.data.results 	        		
					 });
					 if(response.data.results.length === 0)
						 this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));

				 },this),jQuery.proxy(function(oError)
						 {
					 this.contactF4Fragment.getModel('json').setData({

						 ContactCollection : []
					 });
					 this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));

						 },this));
				}
				
			},

			closeToolbar : function(oEvent)
			{
				var toolbar = this.contactF4Fragment.getContent()[0].getInfoToolbar();
				var olist =  this.contactF4Fragment.getContent()[0];
				var searchText = this.contactF4Fragment.getSubHeader().getContentLeft()[0].getValue();
				toolbar.setVisible(false);
				olist.getBinding("items").aFilters = [];
				olist.getBinding("items").sFilterParams = "";
				olist.getBinding("items").refresh();
				this.contactF4Fragment.getModel('json').setData({ContactCollection : []});
				olist.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
				this.getView().getModel().read("ContactCollection",null,["$filter=substringof('" + searchText + "',fullName)"],true,jQuery.proxy(function(odata,response)
						{
					this.contactF4Fragment.getModel('json').setData({ 
						ContactCollection : response.data.results 	        		
					});
					if(response.data.results.length === 0)
						this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));     
						},this),jQuery.proxy(function(oError)
								{
							this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'));
								},this));
			},


			showCurrencyF4 : function(){
				this.oActionSheet = sap.ui.xmlfragment(
						"cus.crm.opportunity.view.CurrencySelectDialog",
						this);
				this.oActionSheet.setModel(this.getView().getModel(
				"i18n"), "i18n");
				var oModel = this.getView().getModel();
				var jsonModel = new sap.ui.model.json.JSONModel();
				var data1;
				var that = this;
				oModel.read("Currencies",null,null,false,function(oData,resp) //[ "$filter=ProcessType eq '" + pType+ "'" ]
						{
					// NLUN - CodeScan Changes - Global Variables
					data1 = {
							Currencies : resp.data.results
					};
					that.Currencies = resp.data.results;
					
						});
				jsonModel.setData(data1);
				this.oActionSheet.setModel(jsonModel,"json");
				this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
				this.oActionSheet._list.setGrowingScrollToLoad(true);
				this.oActionSheet._dialog.setVerticalScrolling(true);
				this.oActionSheet.open();
			},

			setCurrency : function(oEvent) {
				var selectedItem = oEvent.getParameter("selectedItem");
				this.byId('currency').setValue(selectedItem.data("CurrencyKey"));
			},

			searchCurrency : function(oEvent) {

				var sValue = oEvent.getParameter("value");
				if (sValue !== undefined) {
					// apply the filter to the bound items, and the Select Dialog will update
					var filters = new sap.ui.model.Filter([
					       								new sap.ui.model.Filter("CurrencyText",
					       										sap.ui.model.FilterOperator.Contains,
					       										sValue),
					       								new sap.ui.model.Filter("CurrencyKey",
					       										sap.ui.model.FilterOperator.Contains,
					       										sValue) ], false);
					oEvent.getParameter("itemsBinding").filter([filters]);
				}

			
			},

			closeCurrencyF4 : function(oEvent) {
				this.byId('dialogCurrencyF4').close();
			},

			//Validation on Form
			descriptionChanged : function(oEvent)
			{
				var descriptionField = this.byId('desc');
				if(oEvent.getParameter('newValue').length > 40)
				{
					descriptionField.setValueState(sap.ui.core.ValueState.Error);
				}
				else
					descriptionField.setValueState(sap.ui.core.ValueState.None);
			},

			quantityChanged : function(oEvent)
			{
				var data = oEvent.getSource().getBindingContext("json").getObject();
				var newValue = oEvent.getParameter('newValue'); 
				var pattern = /[^0-9.]/;
				if(pattern.test(newValue) === false)
				{
					if(newValue.split(".").length > 2)  //error
					{
						oEvent.getSource().setValue(data.OldValue);
					}
					else // no error 
					{
						data.OldValue = newValue;
						oEvent.getSource().setValueState(sap.ui.core.ValueState.None);

					}

				}
				else //error 
				{
					if(data.OldValue===undefined)
						data.OldValue=1;
					oEvent.getSource().setValue(data.OldValue);
				}
			},

			chanceOfSuccessChanged : function(oEvent)
			{
				var newValue = oEvent.getParameter('newValue'); 
				var pattern = /[^0-9.]/;
				if(pattern.test(newValue) === false)
				{
					if(newValue.split(".").length > 2)  //error
					{
						oEvent.getSource().setValue(this.OldcosValue);
					}
					else // no error 
					{
						this.OldcosValue = newValue;
						oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
					}

				}
				else //error 
				{
					oEvent.getSource().setValue(this.OldcosValue);
				}
			},

			volumeChanged : function(oEvent)
			{
				var newValue = oEvent.getParameter('newValue'); 
				var pattern = /[^0-9.]/;
				if(pattern.test(newValue) === false)
				{
					if(newValue.split(".").length > 2)  //error
					{
						oEvent.getSource().setValue(this.OldvolumeValue);
					}
					else // no error 
					{
						this.OldvolumeValue = newValue;
						oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
					}

				}
				else //error 
				{
					oEvent.getSource().setValue(this.OldvolumeValue);
				}
			},

			
			validateCurrency : function(){
				
				
				var currLenght = this.Currencies.length;
				var bReturnError = true;
				var currencyInput = this.getView().byId("currency").getValue().trim();
				currencyInput = currencyInput.toLocaleUpperCase();
				this.currencyMessage = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('INVALID_CURRENCY');
				if(currencyInput!=""){
					for (var i=0;i<currLenght; i++){
						if(this.Currencies[i].CurrencyKey===currencyInput){
							bReturnError = false;
							return;
						}
					}
				}
				else
					this.currencyMessage = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NULL_CURRENCY');
				return bReturnError;
			},	

			
			
			
			//Validate the data
			validateSavePage : function()
			{ var check_error = false;

			if(this.byId('desc').getValue() === ""){
				this.byId('desc').setValueState(sap.ui.core.ValueState.Error);
				check_error = true; 
			}
			//account field validation
			if(this.byId('customer').getValue() === ""){
				this.byId('customer').setValueState(sap.ui.core.ValueState.Error);
				check_error = true; 
			}
			//account field validation 
			if(this.accountName !== this.byId('customer').getValue()){
				this.byId('customer').setValueState(sap.ui.core.ValueState.Error);
				check_error = true; 
			}
			if(this.byId('volume').getValue() === ""){
				this.byId('volume').setValue(0);

			}

			if(this.byId('desc').getValueState() === sap.ui.core.ValueState.Error)
				check_error = true; 
			if((this.byId('datePickerStartDate').getValueState() === sap.ui.core.ValueState.Error) || (this.byId('datePickerCloseDate').getValueState() === sap.ui.core.ValueState.Error)){
				/*this.oAppImpl = sap.ca.scfld.md.app.Application.getImpl();
				sap.ca.ui.message.showMessageBox({type: sap.ca.ui.message.Type.ERROR,
					message: this.oAppImpl.getResourceBundle().getText('INVALID_DATE')
				});*/
				check_error = true;
			}

			if(this.byId('chanceofSuccess').getValueState() === sap.ui.core.ValueState.Error)
				check_error = true; 
			if(this.byId('volume').getValueState() === sap.ui.core.ValueState.Error)
				check_error = true; 
			
			var datePickerClose = this.byId('datePickerCloseDate');
			var closingDateLabel = $('#' + datePickerClose.getIdForLabel()).val();
			if(closingDateLabel === ""){
				this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.Error);
				check_error = true;   
			}
			
			if(this.validateProductBasket() === false){
				check_error = true;
			}
			if (check_error == true ){
				return false;
			}
			return true;		
			},
			
			validateProductBasket : function(){
				
				var items = this.byId('productBasket').getItems();
				var i,length;
				length = items.length;
				var check_error = false;
				
				if(length <= 0){
					return  !check_error;
				}
				
				//search the cell position of the Quantity layout! the same index can be reused in other table items
				var index = null;
				var cells = items[0].getCells();
				for(i = 0; i < cells.length; i++){
					if(cells[i].data("field") === "QUANTITY"){
						index = i;
						var qtyField = cells[i].getContent()[0];
						var val = parseFloat(qtyField.getValue()) + "";
						if(val === "NaN"){
						    qtyField.setValueState(sap.ui.core.ValueState.Error);
						    check_error = true;
						}
					}
				}
		      if(index){
				
		    	  for(i = 1; i < items.length; i++){
		    		  var qtyField = items[i].getCells()[index].getContent()[0];
		    			var val = parseFloat(qtyField.getValue()) + "";
						if(val === "NaN"){
						    qtyField.setValueState(sap.ui.core.ValueState.Error);
						    check_error = true;
						}
		    	  }
		    	  
		      }	
				return !check_error;
			},
			validateDates : function(){
				 //date validations for edit page - called on save
				   var datePickerStart = this.byId('datePickerStartDate');
				   var datePickerEnd = this.byId('datePickerCloseDate');
				   var labelStart = $('#' + datePickerStart.getIdForLabel()).val();
				   var labelEnd = $('#' + datePickerEnd.getIdForLabel()).val();
				   var bInvalidDates = false;
				   
				   //invalid start date
				   if(labelStart !== "" && (this.oDateFormatter.parse(labelStart)   === null))
					   {
					   bInvalidDates = true;
					   datePickerStart.setValueState(sap.ui.core.ValueState.Error);
					   sap.ca.ui.message.showMessageBox({
			               type: sap.ca.ui.message.Type.ERROR,
			               message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('JUNK_DATE')
			             });
					 
					  
					   }
				 
				  //invalid end date
				   if(labelEnd !== "" && (this.oDateFormatter.parse(labelEnd)   === null))
				   {
				      bInvalidDates = true;
					   sap.ca.ui.message.showMessageBox({
			               type: sap.ca.ui.message.Type.ERROR,
			               message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('JUNK_DATE')
			             });

				   datePickerEnd.setValueState(sap.ui.core.ValueState.Error);
				   
				   }
				   
				   if(bInvalidDates)
					   return false;
				   
				   //start date greater than end date
				   if(labelStart !== "" && labelEnd !== "" && this.oDateFormatter.parse(labelStart) > this.oDateFormatter.parse(labelEnd))
					   {
					   
					   sap.ca.ui.message.showMessageBox({
			               type: sap.ca.ui.message.Type.ERROR,
			               message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('INVALID_DATE')
			             });
					    
					   datePickerEnd.setValueState(sap.ui.core.ValueState.Error);
					  
					   return false;
					   
					   }
				   return true;		
				
			},
			
			handleErrors : function(oError)
			{
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
				jQuery.sap.log.error(JSON.stringify(oError));
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message : oError.message,
					details: JSON.parse(oError.response.body).error.message.value
				},function(oResult){var i = 0;i++;});
			},
			_setAccountF4Text : function(oEvent){
				this._accountSelectDialog._searchField.setValue(this.byId('customer').getValue());
				
				this._accountSelectDialog.getModel().detachRequestCompleted(this._setAccountF4Text,this);
			},
			
			followUpView : function() {
				this.byId('desc').setValue(this.title); 
				this.byId('customer').setValue(this.AccountName);
				this.accountName = this.AccountName ;
				this.byId('inputMainContact').setValue(this.ContactName);
				this.byId('inputEmpResponsible_S5').setValue(this.ResponsibleTxt);
				this.byId('datePickerStartDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
				this.getView().byId('datePickerCloseDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
				this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerStartDate').fireChange(this.byId('datePickerStartDate'));
				this.byId('datePickerCloseDate').fireChange( this.byId('datePickerCloseDate'));
				this.getView().byId("TxtTypeInput").setText(this.ProcessTypeDescription);
				this.byId('Switch').setState(true);
				
			},
			fromTaskFollowUpView : function() {
				this.byId('desc').setValue(this.title); 
				this.byId('customer').setValue(this.AccountName);
				this.accountName = this.AccountName ;
				this.byId('Switch').setState(true);
				this.byId('inputMainContact').setValue(this.ContactName);
				this.byId('datePickerStartDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
				this.getView().byId('datePickerCloseDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
				this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
				this.byId('datePickerStartDate').fireChange(this.byId('datePickerStartDate'));
				this.byId('datePickerCloseDate').fireChange( this.byId('datePickerCloseDate'));
				this.getView().byId("TxtTypeInput").setText(this.ProcessTypeDescription);
			},
			
			bindEditView : function(){
			var s3Controller;
			
			s3Controller = this.getView().getModel('controllers').getData().s3Controller;
			var s3Object = {};
			//always keep the delete buffer to empty
			this.deleteBuffer = [];
			this.controller = s3Controller;
			s3Object.Header = s3Controller.byId('info').getModel('json').getData();
			this.HeaderObject = s3Object.Header;
			this.headerGuid = s3Object.Header.Guid;;
			this.userStatusCode = s3Object.Header.UserStatusCode;
			this.UserStatuses = s3Object.UserStatuses; 
			this.Currencies = s3Controller.Currencies;

			//this.oSelectedAccount.accountID = s3Object.Header.ProspectNumber;
			this.currentDescription = s3Object.Header.Description;
			this.byId('desc').setValue(s3Object.Header.Description); 
			//filling account id if account name is empty - for edit page
			this.accountName = s3Object.Header.ProspectName;
			this.byId('customer').setValue(s3Object.Header.ProspectName);
			if(s3Object.Header.ProspectName==="")
				this.byId('customer').setValue(s3Object.Header.ProspectNumber);
			this.byId('inputEmpResponsible_S5').setValue(s3Object.Header.EmployeeResponsibleName);
			this.byId('customer').setEditable(false);
			//this.byId('volume').setValue(s3Object.Header.ExpectedSalesVolume);
			//this.byId('id').setText(s3Object.Header.Id);
			//this.byId('chanceofSuccess').setValue(cus.crm.opportunity.util.Formatter.texttonumber(s3Object.Header.ChanceOfSuccess));
			this.byId('datePickerStartDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));//Formatting the dates
		//	this.byId('datePickerCloseDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(s3Object.Header.ClosingDate));
			this.getView().byId('datePickerCloseDate').setValue(cus.crm.opportunity.util.Formatter.dateFormatter(new Date()));
			this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
			this.byId('datePickerCloseDate').setValueState(sap.ui.core.ValueState.None);
			this.byId('datePickerStartDate').fireChange(this.byId('datePickerStartDate'));
			this.byId('datePickerCloseDate').fireChange( this.byId('datePickerCloseDate'));
			this.byId('currency').setValue(s3Object.Header.CurrencyCode);
			this.byId('Switch').setState(s3Object.Header.ForecastRelevance);
		//	this.byId('wtVol').setText(cus.crm.opportunity.util.Formatter.weightedvolume((s3Object.Header.ExpectedSalesVolume),Number(s3Object.Header.ChanceOfSuccess),s3Object.Header.CurrencyCode));
			var oModel = s3Controller.getView().getModel();
			//this.byId('dialogContactF4').setModel(oModel);
			this.byId('inputMainContact').setValue(s3Object.Header.MainContactName);
			this.oSelectedContact.contactID = s3Object.Header.MainContactId;
		    this.oSelectedContact.fullName = s3Object.Header.MainContactName;
			this.contactId = s3Object.Header.MainContactId;
			this.accountId = s3Object.Header.ProspectNumber;
			// set ProcessType Description.
			this.getView().byId("laTypeInput").setVisible(false);
			this.getView().byId("TxtTypeInput").setVisible(false);
			var processTypeDescr = null;
			if (s3Controller != null	|| s3Controller != undefined) {
				processTypeDescr = s3Controller.processTypeDesc;
				if (processTypeDescr != null) {
					this.getView().byId("laTypeInput").setVisible(true);
					this.getView().byId("TxtTypeInput").setVisible(true);
					this.getView().byId("TxtTypeInput").setText(processTypeDescr);
				}
			}
			  //employee responsible - valid only since backend schema version 2.0 	
		    if(parseFloat(this.oVersioningModel.getData().BackendSchemaVersion)  >= 2.0){	

		    	this.byId('inputEmpResponsible_S5').setValue(s3Object.Header.EmployeeResponsibleName);	
		    	this.oSelectedAccount.accountID = s3Object.Header.ProspectNumber;	
		    	this.oSelectedEmployee.employeeID = s3Object.Header.EmployeeResponsibleNumber;	
		    }	
		 
			//this.oSelectedEmployee.employeeID = s3Object.Header.EmployeeResponsibleNumber;
		    this.oSelectedEmployee.fullName = s3Object.Header.EmployeeResponsibleName;
		  //  this.processType = oEvent.getParameter("arguments").processType;
			this.OldcosValue=this.byId('chanceofSuccess').getValue();
			this.OldvolumeValue =this.byId('volume').getValue();
			this.ContactCollection = s3Controller.ContactCollection;
			this.EmployeeCollection = s3Controller.EmployeeCollection;
//			Set dropdowns (by kamal)
			// NLUN - CodeScan Changes - length is javascrip keyword
			var i,statusLength;
			var jsonModel =new sap.ui.model.json.JSONModel();
			var jsonModel1 =new sap.ui.model.json.JSONModel();
			var jsonModel2 =new sap.ui.model.json.JSONModel();
			var jsonModel3 =new sap.ui.model.json.JSONModel();
			//set userstatus
			statusLength = s3Controller.UserStatuses.length;
			// NLUN - CodeScan Changes - Global Variables
			var data1 = {
					UserStatuses : [
					                {
					                	BusinessTransaction: "",
					                	LanguageCode: "",
					                	ProcessType: this.processType,
					                	StatusProfile: "",
					                	UserStatusCode: "",
					                	UserStatusText: "",
					                }
					                ]
			};
			
			var initialStatus= "";
			for(i=0;i< statusLength;i++){
				if (s3Controller.UserStatuses[i].ProcessType === this.processType){
					data1.UserStatuses.push(s3Controller.UserStatuses[i]);
					

					if(parseFloat(this.sBackendVersion) >= 3){ 
						
						if(s3Controller.UserStatuses[i].InitialStatus == true)
							initialStatus = s3Controller.UserStatuses[i].UserStatusCode;
					}
					
					if(this.UserStatusCode==="" && s3Controller.UserStatuses[i].UserStatusCode!=""){
						this.UserStatusCode=s3Controller.UserStatuses[i].UserStatusCode;
						this.UserStatusText=s3Controller.UserStatuses[i].UserStatusText;
					}
					
					if (s3Controller.UserStatuses[i].BusinessTransaction === "WINN"){
						this.getView().getController().WinStatusCode =  s3Controller.UserStatuses[i].UserStatusCode ;
					}
					if (s3Controller.UserStatuses[i].BusinessTransaction === "LOST"){
						this.getView().getController().LostStatusCode =  s3Controller.UserStatuses[i].UserStatusCode ;
					}
					this.StatusProfile = s3Controller.UserStatuses[i].StatusProfile;
				}
			}
			jsonModel.setData(data1);
			this.byId('statusdropdown').setModel(jsonModel,"json");
			this.byId('statusdropdown').setSelectedKey(initialStatus);
			//set priority
			var data2 = {
					Priorities : [
					              {
					            	  LanguageCode: "",
					            	  PriorityCode: "",
					            	  PriorityText: "",
					              }
					              ]

			};
			statusLength = s3Controller.Priorities.length;
			for(i=0;i< statusLength;i++){
				data2.Priorities.push(s3Controller.Priorities[i]);
			};
			jsonModel1.setData(data2);
			this.byId('priority_val').setModel(jsonModel1,"json");
			//set salesStage
			statusLength = s3Controller.SalesStages.length;
			// NLUN - CodeScan Changes - Global Variables
			var data3 = {
					SalesStages :[{
						ChanceOfSuccess: "",
						LanguageCode: "",
						ProcessType: this.processType,
						SalesStageCode: "",
						SalesStageDescription: "",
						SalesStageOrder: "",
					}]
			};
			for(i=0;i< statusLength;i++){
				if (s3Controller.SalesStages[i].ProcessType === this.processType){
					data3.SalesStages.push(s3Controller.SalesStages[i]); 
				}
			}
			jsonModel2.setData(data3);
			this.byId('stagedropdown').setModel(jsonModel2,"json");
			//--- end of dropdowns----     

			/*Disable the Add product button when status is WON/Lost*/
			if(this.byId('statusdropdown').getSelectedKey()===this.WinStatusCode || this.byId('statusdropdown').getSelectedKey()===this.LostStatusCode ){
				this.byId('opportunityAddProd_Button').setVisible(false);
			}
			else
				this.byId('opportunityAddProd_Button').setVisible(true);
			//this.getView().getModel().setData(s3Object);
			var expandEntities = "Statuses";	
			var data = s3Controller.byId('Product_Tab').getModel('json').getData();
		if(data && data.hasOwnProperty("Products"))
			{
				var s3ObjectClone = JSON.parse(JSON.stringify(data));
				for(i=0;i<s3ObjectClone.Products.length;i++)
				{
					if(s3ObjectClone.Products[i].ProductGuid === null)
						s3ObjectClone.Products[i].Backend = "CATEGORY";
					else
						s3ObjectClone.Products[i].Backend = "X";
					s3ObjectClone.Products[i].OldValue = s3ObjectClone.Products[i].Quantity;
					s3ObjectClone.Products[i].NetValue = 0;
				//	this.BackendProducts[s3ObjectClone.Products[i].ItemGuid] = JSON.parse(JSON.stringify(s3ObjectClone.Products[i]));
				}
				jsonModel3.setData(s3ObjectClone);
				this.byId('productBasket').setModel(jsonModel3,"json");
			} 

			 
			
			
			},
			enableProductsAddButton : function(oEvent){
		    	
			       if(this.oAddProductsFragment.getContent()[0].getSelectedItems().length > 0){
			    	   this.oAddProductsFragment.getBeginButton().setEnabled(true);
			       }
			       else{
			    	   this.oAddProductsFragment.getBeginButton().setEnabled(false);
			       }
			    }
		
			
			
		});
