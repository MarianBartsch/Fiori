jQuery.sap.registerPreloadedModules({
"name":"cus/crm/opportunity/Component-preload",
"version":"2.0",
"modules":{
	"cus/crm/opportunity/Component.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
// define a root UIComponent which exposes the main view
jQuery.sap.declare("cus.crm.opportunity.Component");
jQuery.sap.require("sap.ca.scfld.md.ComponentBase");

// new Component
sap.ca.scfld.md.ComponentBase.extend("cus.crm.opportunity.Component", {
	metadata : sap.ca.scfld.md.ComponentBase.createMetaData("MD",{
		"name": "Master Detail Sample",
		"version" : "1.4.10",
		"library" : "cus.crm.opportunity",
		"includes" : [ 
		],  
		"dependencies" : { 
			"libs" : [ 
				"sap.m",
				"sap.me"
			],  
			"components" : [ 
			], 
			
		},
		"config" : {
			
			"resourceBundle" : "i18n/i18n.properties",
			"titleResource" :   "SHELL_TITLE",
			 "icon":"sap-icon://Fiori2/F0012",
			 "favIcon":"./resources/sap/ca/ui/themes/base/img/favicon/F0012_My_Opportunities.ico",
			 "homeScreenIconPhone":"./resources/sap/ca/ui/themes/base/img/launchicon/F0012__My_Opportunities/57_iPhone_Desktop_Launch.png",
			 "homeScreenIconPhone@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0012__My_Opportunities/114_iPhone-Retina_Web_Clip.png",
			 "homeScreenIconTablet":"./resources/sap/ca/ui/themes/base/img/launchicon/F0012__My_Opportunities/72_iPad_Desktop_Launch.png",
			 "homeScreenIconTablet@2":"./resources/sap/ca/ui/themes/base/img/launchicon/F0012__My_Opportunitiess/144_iPad_Retina_Web_Clip.png",
			 "startupImage320x460":"./resources/sap/ca/ui/themes/base/img/splashscreen/320_x_460.png",
			 "startupImage640x920":"./resources/sap/ca/ui/themes/base/img/splashscreen/640_x_920.png",
			 "startupImage640x1096":"./resources/sap/ca/ui/themes/base/img/splashscreen/640_x_1096.png",
			 "startupImage768x1004":"./resources/sap/ca/ui/themes/base/img/splashscreen/768_x_1004.png",
			 "startupImage748x1024":"./resources/sap/ca/ui/themes/base/img/splashscreen/748_x_1024.png",
			 "startupImage1536x2008":"./resources/sap/ca/ui/themes/base/img/splashscreen/1536_x_2008.png",
			 "startupImage1496x2048":"./resources/sap/ca/ui/themes/base/img/splashscreen/1496_x_2048.png"
			
			
			
			
		},
		
		"viewPath" : "cus.crm.opportunity.view",
		"detailPageRoutes" :{  
            "detail" : {
            			"pattern" : "detail/{contextPath}",
            			"view" : "S3"
            },
		    "subDetail"  :  {
		    	         "pattern" : "subDetail/{contextPath}",
		    	         "view"  : "S4"
		    	 
		    },
		    "create"  :  {
   	         "pattern" : "create/{contextPath}/{processType}",
   	         "view"  : "S5"
   	 
   },
   "createFollowup"  :  {
	         "pattern" : "createFollowup/{contextPath}/{processType}",
	         "view"  : "S5"
	        	 
   },
            "noData" : {
            	         "pattern"  : "noData",
            	         "viewPath" : "sap.ca.scfld.md.view",
            	         "view"    :  "empty"
             }   
       
          },
          
          
          "fullScreenPageRoutes" : {  
	        	"fullScreen"  : {
	        		"view":"MainSplitContainer",
					"viewPath":"sap.ca.scfld.md.view",
					"targetControl":"fioriContent",
					"targetAggregation":"pages",
					"pattern":"_neverusethispattern_",              
	         	},
				
				"display": {
					pattern : "display/{contextPath}",
					view : "S3",
				},
				"edit" : {
					pattern : "edit/{contextPath}",
					view : "S4",
					
				},
				"fulScrCreateFollowup"  :  {
			         pattern : "fulScrCreateFollowup/{contextPath}/{processType}",
			         view  : "S5",
			        	 
		   },
		   "FollowupFromTask"  :  {
		         pattern : "followupfromtask/{contextPath}/{processType}",
		         view  : "S5",
		        	 
	   },
	         	
	        }
          
        
    }),
   
	/**
	 * Initialize the application 
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function() {
	  var oViewData = {component: this};
    this.oMainView = sap.ui.view({
          viewName : "cus.crm.opportunity.Main",
          type : sap.ui.core.mvc.ViewType.XML,
          viewData : oViewData
        });
      
      this.oMainView.setModel(new sap.ui.model.json.JSONModel({
    	  
    	  s2Controller : null,
    	  s3Controller : null,
    	  s4Controller : null,
    	  s5Controller : null,
    	  
      }),"controllers");
      var oModel = new sap.ui.model.json.JSONModel();
		
		var oComponentData = this.getComponentData();
		if (oComponentData) {
			jQuery.sap.log.info("app started with parameters " + JSON.stringify(oComponentData.startupParameters || {}));
			oModel.setData(this.createStartupParametersData(oComponentData.startupParameters || {}));
		}
		this.oMainView.setModel(oModel, "startupParameters");

		return this.oMainView;
	},

	createStartupParametersData : function(oComponentData) {
		// convert the raw componentData into a model that is consumed by the UI
		var aParameters = [];
		if (oComponentData) {
			for ( var sKey in oComponentData) {
				aParameters.push({
					key : sKey,
					value : oComponentData[sKey].toString()
				});
			}
		}
		return {
			"parameters" : aParameters
		};
	}

	
	
  
});

},
	"cus/crm/opportunity/Configuration.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cus.crm.opportunity.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");


sap.ca.scfld.md.ConfigurationBase
		.extend(
				"cus.crm.opportunity.Configuration",
				{

					oServiceParams : {
						serviceList : [{
							name : "CRM_OPPORTUNITY",
							masterCollection : "Opportunities",
							serviceUrl : URI("/sap/opu/odata/sap/CRM_OPPORTUNITY/").directory(),
							isDefault : true,
							countSupported : true,
							mockedDataSource : "model/metadata.xml"
						}]
					},

					getServiceParams : function() {
						return this.oServiceParams;
					},

					/**
					 * @inherit
					 */
					getServiceList : function() {
						return this.getServiceParams().serviceList;
					},

					getMasterKeyAttributes : function() {
						return ["Id"];
					},
					
					
			});

},
	"cus/crm/opportunity/Main.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("cus.crm.opportunity.Main", {

	onInit : function() {
        jQuery.sap.require("sap.ca.scfld.md.Startup");				
		sap.ca.scfld.md.Startup.init('cus.crm.opportunity', this);
	},
	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * 
	 * @memberOf MainXML
	 */
	onExit : function() {
		//exit cleanup code here
	}	
});
},
	"cus/crm/opportunity/Main.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View xmlns:core="sap.ui.core"\r\n\txmlns="sap.m" controllerName="cus.crm.opportunity.Main" displayBlock="true" height="100%">\r\n\t<NavContainer id="fioriContent" showHeader="false">\r\n\t</NavContainer>\r\n</core:View>',
	"cus/crm/opportunity/i18n/i18n.properties":'# Opportunity: Create/Edit/Display opportunities\n# __ldi.translation.uuid=08d9ac80-161e-11e3-8ffd-0800200c9a66\n# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Opportunities ({0})\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=Create\n\n#XBUT : show result\nSHOW_SETTING = List Settings\n\n#XBUT : list setting button text\nLIST_SETTING = Settings\n\n#XTXT : Show instruction\nSHOW_INS = Maximum number of opportunities to be displayed:\n\n#XTXT : Show noteS\nSHOW_INS_NOTES = *Please note that if there are a large number of opportunities, the performance of the application will be affected.\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Opportunity\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=Edit Opportunity\n\n#XTIT: Application title\nSHELL_TITLE=Opportunities\n\n#XTIT: this is the title for the Info Tab\nINFO=info\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=Products\n\n#XTIT: this is the title for the Notes Tab\nNOTES=Notes\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=Attachments\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=Competitors\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=Participants\n\n#XFLD, 30: Field Account on List\nACCOUNT=Account\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=Opportunity ID\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=Start Date\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=Closing Date\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=Chance of Success\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=Status\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=Sales Stage\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=Priority\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=Product\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=Quantity\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=Net Value\n\n#XFLD, 30: Field "Exp.Total Value" on Product tab\nVOLUME=Exp.Total Value\n\n#XBUT: edit button text\nEDIT=Edit\n\n#XBUT: Save button text\nSAVE=Save\n\n#XBUT: Cancel button text\nCANCEL=Cancel\n\n#XBUT: Add More Products button text\nADD_PROD=Add More Products\n\n#XBUT: Add Products button text\nADD=Add \n\n#XBUT: Add Contacts button text\nADDCONTACT=Add Contact\n\n#YMSG: lead saved\nOPP_SAVED=Opportunity saved\n\n#YMSG: lead could not be saved\nSAVE_FAILED=Could not save the Opportunity \n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=Account Logo\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=Name\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=Main Contact\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=Expected Sales Volume \n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=Log of Changes\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=View\n \n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=Product Basket\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=Exp. Sales Volume (Weighted) \n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=Forecast Relevance \n\n#XFLD, 30: Field "In" on Detail Header\nIN= in  \n\n#XFLD, 30: Field "From" on View tab\nFROM= From \n\n#XFLD, 30: Field "To" on View tab\nTO= To \n\n#XFLD, 30: Field "ON" on View tab\nON= On \n\n#XFLD, 30: Field "OFF" on View tab\nOFF= Off \n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=Changed\n\n#XTIT: contact title for contact F4\nCONTACT=Contact\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=Search contacts\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=Product Catalog\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=Empty Product Basket\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=Partner Function :\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=Select Transaction Type\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=Sort\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=Opportunity is Saved\n\n#XBUT: OK button text\nOK=Ok \n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=No competitors are currently available\n\n#YMSG, 60:  no products\nNOPRODUCTS=No products are currently available\n\n#YMSG, 30:  no salesteam\nNOPARTIES=No parties involved are currently available\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=No changes found\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT =You can only view business cards of accounts or contacts\n\n#YMSG: no transaction types  present\nFOLLOWUPERROR = No Follow Up types exist\n\n#YMSG: detailed error message shown when no transaction types are present\nFOLLOWUPDETAILERROR = Either the current opportunity has errors or there are no follow up transaction types maintained in the Customizing\n\n#YMSG: account is null\nACCOUNT_IS_NULL =To view a business card, there must be details available for the specified account\n\n#YMSG: some info missing\nINFO_MISSING =To view a business card, all required details must be available for the specified account\n\n#YMSG, 30: error\nERROR=Error\n\n#YMSG: junk value entered for dates\nJUNK_DATE=Enter valid values for dates\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=Closing date must not be earlier than the start date\n\n#YMSG, 30:  Description\nMAX_CHARS=Add description (a maximum of 40 characters)\n\n#YMSG, 30:  no notes\nNONOTES=No notes are currently available \n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=Enter values for all the mandatory fields\n\n#YMSG, 30: save note\nNOTE_SUCCESS=Note saved\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=Note could not be saved\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=You are responsible for ({0}) out of ({1}) opportunities. Only your opportunities are displayed \n\n#XFLD: account ascending\nACTASC=Account (Ascending)\n\n#XFLD: account descending\nACTDESC=Account (Descending)\n\n#XFLD: Status ascending\nSTATASC=Status (Ascending)\n\n#XFLD: Status descending\nSTATDESC=Status (Descending)\n\n#XFLD: Closing Date ascending\nCLSDATEASC=Closing Date (Ascending)\n\n#XFLD: Closing Date descending\nCLSDATEDESC=Closing Date (Descending)\n\n#YMSG, 50: text in Dialogbox\nFILTER=Filter by Account \n\n#XTIT: title for currency dialog box\nCURRENCY=Currency\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=K\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=MN\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=BN\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=No opportunity found\n\n#YMSG: Place holder message\nSEARCH=Search\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=Select Account\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=Select Currency\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=Select Contact\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID ={0} {1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY={0} {1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=Sort By\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=Share On JAM\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=Discuss on JAM\n\n#XFLD: Currency label\nLBL_CURRENCY=Currency\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=Search...\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=Loading...\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=No items are currently available\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=%\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=Changed: {0} from Off to On\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=Changed: {0} from On to Off\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=Changed: {0} from No Value to {1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=Changed: {0} from {1} to {2}\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=Opportunity saved with errors\n\n#XFLD,20: No contacts\nNO_CONTACTS=No contacts are currently available \n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT =You can only view business cards of contacts that has been assigned to this account\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=Exp. Sales Volume in {0}\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=Product/Category\n\n#XTIT: Product Category\nCATEGORY=Product Category\n\n#XTIT: Warning title for data loss pop-up\nWARNING=Warning\n\n#YMSG: data loss message\nDATA_LOSS=Any unsaved changes will be lost.Are you sure you want to continue?\n\n#XBUT: continue buttonn\nCONTINUE=Continue\n\n#YMSG: successful followup message in message toast\nfollowupsuccessful=Follow up opportunity saved\n\n#XBUT: create appointment\nCREATE_APPOINTMENT = Follow up Appointment\n\n#XBUT: create appointment\nFOLLOW_UP = Follow Up\n\n#XBUT: create task\nCREATE_TASK = Follow up Task\n\n#XBUT: create opportunity\nCREATE_OPPORTUNITY = Follow up Opportunity\n\n#XTIT \nEMPLOYEE_TITLE=Employees\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=Employee Responsible\n\n#XACT\nSEARCH_EMPLOYEE=Search employees\n\n#XTIT: sales team \nPARTICIPANTS=Participants ({0})\n\n#YMSG: no participants\nNO_PARTICIPANTS=No participants found\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=Search for participants\n\n#XTIT: select participant\nADD_PARTICIPANTS=Add Participants\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=You must select a minimum of {0} participants for this participant type\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS_1=You must select a minimum of {0} participant for this participant type\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=You can only select a maximum of {0} participants for this participant type\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS_1=You can only select a maximum of {0} participant for this participant type\n\n#YMSG: invalid currency message\nINVALID_CURRENCY=You have entered an invalid currency. Do you want to save this data?\n\n#YMSG: null currency message\nNULL_CURRENCY=You have not provided a currency. Do you want to save this data?\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS=You must have a minimum of {0} participants for this participant type\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS_1=You must have a minimum of {0} participant for this participant type\n\n#YMSG:participant already exists\nPARTICIPANT_EXISTS={0} has already been added as a participant with the participant type {1}\n\n#XFLD, 30: Field Transaction Type on Info Form\nTYPE=Type\n',
	"cus/crm/opportunity/i18n/i18n_ar.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u0627\\u0644\\u0641\\u0631\\u0635 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 ({0})\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621\n\n#XBUT : show result\nSHOW_SETTING=\\u0639\\u0631\\u0636 \\u0627\\u0644\\u0625\\u0639\\u062F\\u0627\\u062F\\u0627\\u062A\n\n#XBUT : list setting button text\nLIST_SETTING=\\u0627\\u0644\\u0625\\u0639\\u062F\\u0627\\u062F\\u0627\\u062A\n\n#XTXT : Show instruction\nSHOW_INS=\\u0627\\u0644\\u062D\\u062F \\u0627\\u0644\\u0623\\u0642\\u0635\\u0649 \\u0644\\u0639\\u062F\\u062F \\u0627\\u0644\\u0641\\u0631\\u0635 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628 \\u0639\\u0631\\u0636\\u0647\\u0627\\:\n\n#XTXT : Show noteS\nSHOW_INS_NOTES=*\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0645\\u0644\\u0627\\u062D\\u0638\\u0629 \\u0623\\u0646\\u0647 \\u0641\\u064A \\u062D\\u0627\\u0644\\u0629 \\u0648\\u062C\\u0648\\u062F \\u0639\\u062F\\u062F \\u0643\\u0628\\u064A\\u0631 \\u0645\\u0646 \\u0627\\u0644\\u0641\\u0631\\u0635 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\\u060C \\u0633\\u064A\\u062A\\u0623\\u062B\\u0631 \\u0623\\u062F\\u0627\\u0621 \\u0627\\u0644\\u062A\\u0637\\u0628\\u064A\\u0642.\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XTIT: Application title\nSHELL_TITLE=\\u0627\\u0644\\u0641\\u0631\\u0635 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XTIT: this is the title for the Info Tab\nINFO=\\u0645\\u0639\\u0644\\u0648\\u0645\\u0627\\u062A\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=\\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\\u0627\\u062A\n\n#XTIT: this is the title for the Notes Tab\nNOTES=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0627\\u062A\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=\\u0645\\u0631\\u0641\\u0642\\u0627\\u062A\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=\\u0627\\u0644\\u0645\\u0646\\u0627\\u0641\\u0633\\u0648\\u0646\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646\n\n#XFLD, 30: Field Account on List\nACCOUNT=\\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=\\u0645\\u0639\\u0631\\u0641 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0628\\u062F\\u0627\\u064A\\u0629\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u063A\\u0644\\u0627\\u0642\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0646\\u062C\\u0627\\u062D\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=\\u0645\\u0631\\u062D\\u0644\\u0629 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=\\u0627\\u0644\\u0623\\u0641\\u0636\\u0644\\u064A\\u0629\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=\\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=\\u0627\\u0644\\u0643\\u0645\\u064A\\u0629\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=\\u0635\\u0627\\u0641\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629\n\n#XFLD, 30: Field "Exp.Total Value" on Product tab\nVOLUME=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0642\\u064A\\u0645\\u0629 \\u0627\\u0644\\u0645\\u062A\\u0648\\u0642\\u0639\\u0629\n\n#XBUT: edit button text\nEDIT=\\u062A\\u062D\\u0631\\u064A\\u0631\n\n#XBUT: Save button text\nSAVE=\\u062D\\u0641\\u0638\n\n#XBUT: Cancel button text\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\n\n#XBUT: Add More Products button text\nADD_PROD=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0632\\u064A\\u062F \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\\u0627\\u062A\n\n#XBUT: Add Products button text\nADD=\\u0625\\u0636\\u0627\\u0641\\u0629\n\n#XBUT: Add Contacts button text\nADDCONTACT=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u062C\\u0647\\u0629 \\u0627\\u062A\\u0635\\u0627\\u0644\n\n#YMSG: lead saved\nOPP_SAVED=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#YMSG: lead could not be saved\nSAVE_FAILED=\\u062A\\u0639\\u0630\\u0631 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=\\u0634\\u0639\\u0627\\u0631 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=\\u0627\\u0644\\u0627\\u0633\\u0645\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=\\u062C\\u0647\\u0629 \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644 \\u0627\\u0644\\u0631\\u0626\\u064A\\u0633\\u064A\\u0629\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=\\u062D\\u062C\\u0645 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u062A\\u0648\\u0642\\u0639\n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=\\u0633\\u062C\\u0644 \\u0627\\u0644\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=\\u0639\\u0631\\u0636\n\n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=\\u0633\\u0644\\u0629 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\\u0627\\u062A\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=\\u062D\\u062C\\u0645 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u062A\\u0648\\u0642\\u0639 (\\u0645\\u0631\\u062C\\u062D)\n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=\\u0627\\u0644\\u0635\\u0644\\u0629 \\u0628\\u0627\\u0644\\u062A\\u0648\\u0642\\u0639\n\n#XFLD, 30: Field "In" on Detail Header\nIN=\\u0641\\u064A\n\n#XFLD, 30: Field "From" on View tab\nFROM=\\u0645\\u0646\n\n#XFLD, 30: Field "To" on View tab\nTO=\\u0625\\u0644\\u0649\n\n#XFLD, 30: Field "ON" on View tab\nON=\\u062A\\u0634\\u063A\\u064A\\u0644\n\n#XFLD, 30: Field "OFF" on View tab\nOFF=\\u0625\\u064A\\u0642\\u0627\\u0641 \\u062A\\u0634\\u063A\\u064A\\u0644\n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=\\u0645\\u063A\\u064A\\u0651\\u064E\\u0631\n\n#XTIT: contact title for contact F4\nCONTACT=\\u062C\\u0647\\u0629 \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=\\u0628\\u062D\\u062B\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=\\u062F\\u0644\\u064A\\u0644 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\\u0627\\u062A\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=\\u0633\\u0644\\u0629 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\\u0627\\u062A \\u0627\\u0644\\u0641\\u0627\\u0631\\u063A\\u0629\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=\\u0648\\u0638\\u064A\\u0641\\u0629 \\u0627\\u0644\\u0634\\u0631\\u064A\\u0643\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0639\\u0627\\u0645\\u0644\\u0629\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=\\u062A\\u0631\\u062A\\u064A\\u0628\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XBUT: OK button text\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=\\u0644\\u0627 \\u064A\\u062A\\u0648\\u0641\\u0631 \\u0645\\u0646\\u0627\\u0641\\u0633\\u0648\\u0646 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG, 60:  no products\nNOPRODUCTS=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0645\\u0646\\u062A\\u062C\\u0627\\u062A \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG, 30:  no salesteam\nNOPARTIES=\\u0644\\u0627 \\u064A\\u062A\\u0648\\u0641\\u0631 \\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 (\\u0623\\u0637\\u0631\\u0627\\u0641 \\u0645\\u0639\\u0646\\u064A\\u0629) \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=\\u0644\\u0645 \\u064A\\u062A\\u0645 \\u0627\\u0644\\u0639\\u062B\\u0648\\u0631 \\u0639\\u0644\\u0649 \\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT=\\u064A\\u0645\\u0643\\u0646\\u0643 \\u0639\\u0631\\u0636 \\u0628\\u0637\\u0627\\u0642\\u0627\\u062A \\u0627\\u0644\\u0639\\u0645\\u0644 \\u0641\\u0642\\u0637 \\u0644\\u0644\\u0639\\u0645\\u0644\\u0627\\u0621 \\u0623\\u0648 \\u062C\\u0647\\u0627\\u062A \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644\n\n#YMSG: no transaction types  present\nFOLLOWUPERROR=\\u0644\\u0627 \\u062A\\u0648\\u062C\\u062F \\u0623\\u0646\\u0648\\u0627\\u0639 \\u0645\\u0639\\u0627\\u0645\\u064E\\u0644\\u0627\\u062A \\u0644\\u0627\\u062D\\u0642\\u0629\n\n#YMSG: detailed error message shown when no transaction types are present\nFOLLOWUPDETAILERROR=\\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\\u0629 \\u062A\\u062D\\u062A\\u0648\\u064A \\u0639\\u0644\\u0649 \\u0623\\u062E\\u0637\\u0627\\u0621 \\u0623\\u0648 \\u0644\\u0627 \\u062A\\u0648\\u062C\\u062F \\u0623\\u0646\\u0648\\u0627\\u0639 \\u0645\\u0639\\u0627\\u0645\\u064E\\u0644\\u0627\\u062A \\u0644\\u0627\\u062D\\u0642\\u0629 \\u062A\\u062A\\u0645 \\u0635\\u064A\\u0627\\u0646\\u062A\\u0647\\u0627 \\u0641\\u064A \\u0627\\u0644\\u062A\\u062E\\u0635\\u064A\\u0635\n\n#YMSG: account is null\nACCOUNT_IS_NULL=\\u0644\\u0639\\u0631\\u0636 \\u0628\\u0637\\u0627\\u0642\\u0629 \\u0639\\u0645\\u0644\\u060C \\u064A\\u062C\\u0628 \\u062A\\u0648\\u0641\\u0651\\u064F\\u0631 \\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n\n#YMSG: some info missing\nINFO_MISSING=\\u0644\\u0639\\u0631\\u0636 \\u0628\\u0637\\u0627\\u0642\\u0629 \\u0639\\u0645\\u0644\\u060C \\u064A\\u062C\\u0628 \\u062A\\u0648\\u0641\\u0651\\u064F\\u0631 \\u0643\\u0644 \\u0627\\u0644\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\\u0629 \\u0644\\u0644\\u0639\\u0645\\u064A\\u0644 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n\n#YMSG, 30: error\nERROR=\\u062E\\u0637\\u0623\n\n#YMSG: junk value entered for dates\nJUNK_DATE=\\u0623\\u062F\\u062E\\u0644 \\u0642\\u064A\\u0645\\u064B\\u0627 \\u0635\\u0627\\u0644\\u062D\\u0629 \\u0644\\u0644\\u062A\\u0648\\u0627\\u0631\\u064A\\u062E\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=\\u064A\\u062C\\u0628 \\u0623\\u0644\\u0627 \\u064A\\u0642\\u0639 \\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u063A\\u0644\\u0627\\u0642 \\u0642\\u0628\\u0644 \\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0628\\u062F\\u0627\\u064A\\u0629\n\n#YMSG, 30:  Description\nMAX_CHARS=\\u0623\\u0636\\u0641 \\u0648\\u0635\\u0641\\u064B\\u0627 (\\u0628\\u062D\\u062F \\u0623\\u0642\\u0635\\u0649 40 \\u062D\\u0631\\u0641\\u064B\\u0627)\n\n#YMSG, 30:  no notes\nNONOTES=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0645\\u0644\\u0627\\u062D\\u0638\\u0627\\u062A \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=\\u0623\\u062F\\u062E\\u0644 \\u0642\\u064A\\u0645\\u064B\\u0627 \\u0644\\u0643\\u0644 \\u0627\\u0644\\u062D\\u0642\\u0648\\u0644 \\u0627\\u0644\\u0625\\u0644\\u0632\\u0627\\u0645\\u064A\\u0629\n\n#YMSG, 30: save note\nNOTE_SUCCESS=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=\\u062A\\u0639\\u0630\\u0631 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=\\u062A\\u0642\\u0639 \\u0639\\u0644\\u0649 \\u0639\\u0627\\u062A\\u0642\\u0643 \\u0645\\u0633\\u0624\\u0648\\u0644\\u064A\\u0629 {0} \\u0645\\u0646 \\u0623\\u0635\\u0644 {1} \\u0645\\u0646 \\u0627\\u0644\\u0641\\u0631\\u0635 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629. \\u0648\\u0644\\u0646 \\u064A\\u062A\\u0645 \\u0639\\u0631\\u0636 \\u0633\\u0648\\u0649 \\u0641\\u0631\\u0635\\u0643 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 \\u0641\\u0642\\u0637. \n\n#XFLD: account ascending\nACTASC=\\u0627\\u0644\\u0639\\u0645\\u064A\\u0644 (\\u062A\\u0635\\u0627\\u0639\\u062F\\u064A)\n\n#XFLD: account descending\nACTDESC=\\u0627\\u0644\\u0639\\u0645\\u064A\\u0644 (\\u062A\\u0646\\u0627\\u0632\\u0644\\u064A)\n\n#XFLD: Status ascending\nSTATASC=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629 (\\u062A\\u0635\\u0627\\u0639\\u062F\\u064A)\n\n#XFLD: Status descending\nSTATDESC=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629 (\\u062A\\u0646\\u0627\\u0632\\u0644\\u064A)\n\n#XFLD: Closing Date ascending\nCLSDATEASC=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u063A\\u0644\\u0627\\u0642 (\\u062A\\u0635\\u0627\\u0639\\u062F\\u064A)\n\n#XFLD: Closing Date descending\nCLSDATEDESC=\\u062A\\u0627\\u0631\\u064A\\u062E \\u0627\\u0644\\u0625\\u063A\\u0644\\u0627\\u0642 (\\u062A\\u0646\\u0627\\u0632\\u0644\\u064A)\n\n#YMSG, 50: text in Dialogbox\nFILTER=\\u062A\\u0635\\u0641\\u064A\\u0629 \\u062D\\u0633\\u0628 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\\:\n\n#XTIT: title for currency dialog box\nCURRENCY=\\u0627\\u0644\\u0639\\u0645\\u0644\\u0629\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=\\u0623\\u0644\\u0641\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=\\u0645\\u0644\\u064A\\u0648\\u0646\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=\\u0645\\u0644\\u064A\\u0627\\u0631\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0641\\u0631\\u0635 \\u0628\\u064A\\u0639\\u064A\\u0629 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG: Place holder message\nSEARCH=\\u0628\\u062D\\u062B\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0639\\u0645\\u064A\\u0644\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0639\\u0645\\u0644\\u0629\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u062C\\u0647\\u0629 \\u0627\\u062A\\u0635\\u0627\\u0644\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID={0} {1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY={0} {1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=\\u062A\\u0631\\u062A\\u064A\\u0628 \\u062D\\u0633\\u0628\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=\\u0645\\u0634\\u0627\\u0631\\u0643\\u0629\\u0641\\u064A JAM\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=\\u0645\\u0646\\u0627\\u0642\\u0634\\u0629 \\u0641\\u064A JAM\n\n#XFLD: Currency label\nLBL_CURRENCY=\\u0627\\u0644\\u0639\\u0645\\u0644\\u0629\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=\\u0628\\u062D\\u062B\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644...\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u0639\\u0646\\u0627\\u0635\\u0631 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=%\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=\\u062A\\u0645 \\u062A\\u063A\\u064A\\u064A\\u0631\\:  "{0}" \\u0645\\u0646 "\\u0625\\u064A\\u0642\\u0627\\u0641 \\u0627\\u0644\\u062A\\u0634\\u063A\\u064A\\u0644" \\u0625\\u0644\\u0649 "\\u062A\\u0634\\u063A\\u064A\\u0644"\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=\\u062A\\u0645 \\u062A\\u063A\\u064A\\u064A\\u0631\\: "{0}" \\u0645\\u0646 "\\u062A\\u0634\\u063A\\u064A\\u0644" \\u0625\\u0644\\u0649 "\\u0625\\u064A\\u0642\\u0627\\u0641 \\u0627\\u0644\\u062A\\u0634\\u063A\\u064A\\u0644"\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=\\u062A\\u0645 \\u062A\\u063A\\u064A\\u064A\\u0631\\: {0} \\u0645\\u0646 "\\u0628\\u0644\\u0627 \\u0642\\u064A\\u0645\\u0629" \\u0625\\u0644\\u0649  {1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=\\u062A\\u0645 \\u062A\\u063A\\u064A\\u064A\\u0631\\: "{0}" \\u0645\\u0646 "{1}" \\u0625\\u0644\\u0649 "{2}"\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 \\u0628\\u0623\\u062E\\u0637\\u0627\\u0621\n\n#XFLD,20: No contacts\nNO_CONTACTS=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0623\\u064A \\u062C\\u0647\\u0627\\u062A \\u0627\\u062A\\u0635\\u0627\\u0644 \\u062D\\u0627\\u0644\\u064A\\u064B\\u0627\n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT=\\u064A\\u0645\\u0643\\u0646\\u0643 \\u0641\\u0642\\u0637 \\u0639\\u0631\\u0636 \\u0628\\u0637\\u0627\\u0642\\u0627\\u062A \\u0639\\u0645\\u0644 \\u062C\\u0647\\u0627\\u062A \\u0627\\u0644\\u0627\\u062A\\u0635\\u0627\\u0644 \\u0627\\u0644\\u0645\\u0639\\u064A\\u0646\\u0629 \\u0625\\u0644\\u0649 \\u0647\\u0630\\u0627 \\u0627\\u0644\\u0639\\u0645\\u064A\\u0644\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=\\u062D\\u062C\\u0645 \\u0627\\u0644\\u0645\\u0628\\u064A\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u062A\\u0648\\u0642\\u0639 \\u0641\\u064A {0}\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=\\u0627\\u0644\\u0645\\u0646\\u062A\\u062C/\\u0627\\u0644\\u0641\\u0626\\u0629\n\n#XTIT: Product Category\nCATEGORY=\\u0641\\u0626\\u0629 \\u0627\\u0644\\u0645\\u0646\\u062A\\u062C\n\n#XTIT: Warning title for data loss pop-up\nWARNING=\\u062A\\u062D\\u0630\\u064A\\u0631\n\n#YMSG: data loss message\nDATA_LOSS=\\u0633\\u064A\\u062A\\u0645 \\u0641\\u0642\\u062F \\u0623\\u064A \\u0628\\u064A\\u0627\\u0646\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0645\\u062D\\u0641\\u0648\\u0638\\u0629. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0628\\u0627\\u0644\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629\\u061F\n\n#XBUT: continue buttonn\nCONTINUE=\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629\n\n#YMSG: successful followup message in message toast\nfollowupsuccessful=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629 \\u0627\\u0644\\u0644\\u0627\\u062D\\u0642\\u0629\n\n#XBUT: create appointment\nCREATE_APPOINTMENT=\\u0627\\u0644\\u0645\\u0648\\u0639\\u062F\n\n#XBUT: create appointment\nFOLLOW_UP=\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629\n\n#XBUT: create task\nCREATE_TASK=\\u0627\\u0644\\u0645\\u0647\\u0645\\u0629\n\n#XBUT: create opportunity\nCREATE_OPPORTUNITY=\\u0627\\u0644\\u0641\\u0631\\u0635\\u0629 \\u0627\\u0644\\u0628\\u064A\\u0639\\u064A\\u0629\n\n#XTIT \nEMPLOYEE_TITLE=\\u0627\\u0644\\u0645\\u0648\\u0638\\u0641\\u0648\\u0646\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u0627\\u0644\\u0645\\u0648\\u0638\\u0641 \\u0627\\u0644\\u0645\\u0633\\u0624\\u0648\\u0644\n\n#XACT\nSEARCH_EMPLOYEE=\\u0628\\u062D\\u062B \\u0639\\u0646 \\u0645\\u0648\\u0638\\u0641\\u064A\\u0646\n\n#XTIT: sales team \nPARTICIPANTS=\\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u0648\\u0646 ({0})\n\n#YMSG: no participants\nNO_PARTICIPANTS=\\u0644\\u0645 \\u064A\\u062A\\u0645 \\u0627\\u0644\\u0639\\u062B\\u0648\\u0631 \\u0639\\u0644\\u0649 \\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=\\u0628\\u062D\\u062B \\u0639\\u0646 \\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646\n\n#XTIT: select participant\nADD_PARTICIPANTS=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=\\u064A\\u062C\\u0628 \\u062A\\u062D\\u062F\\u064A\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0628\\u062D\\u062F \\u0623\\u062F\\u0646\\u0649 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS_1=\\u064A\\u062C\\u0628 \\u062A\\u062D\\u062F\\u064A\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0628\\u062D\\u062F \\u0623\\u062F\\u0646\\u0649 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=\\u064A\\u0645\\u0643\\u0646\\u0643 \\u0641\\u0642\\u0637 \\u062A\\u062D\\u062F\\u064A\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0628\\u062D\\u062F \\u0623\\u0642\\u0635\\u0649 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS_1=\\u064A\\u0645\\u0643\\u0646\\u0643 \\u0641\\u0642\\u0637 \\u062A\\u062D\\u062F\\u064A\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0628\\u062D\\u062F \\u0623\\u0642\\u0635\\u0649 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG: invalid currency message\nINVALID_CURRENCY=\\u0644\\u0642\\u062F \\u0623\\u062F\\u062E\\u0644\\u062A \\u0639\\u0645\\u0644\\u0629 \\u063A\\u064A\\u0631 \\u0635\\u0627\\u0644\\u062D\\u0629. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u062D\\u0641\\u0638 \\u0647\\u0630\\u0647 \\u0627\\u0644\\u0628\\u064A\\u0627\\u0646\\u0627\\u062A\\u061F\n\n#YMSG: null currency message\nNULL_CURRENCY=\\u0644\\u0645 \\u062A\\u0642\\u0645 \\u0628\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0623\\u064A \\u0639\\u0645\\u0644\\u0629. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u062D\\u0641\\u0638 \\u0647\\u0630\\u0647 \\u0627\\u0644\\u0628\\u064A\\u0627\\u0646\\u0627\\u062A\\u061F\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS=\\u064A\\u0644\\u0632\\u0645 \\u0648\\u062C\\u0648\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0623\\u0642\\u0644 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS_1=\\u064A\\u0644\\u0632\\u0645 \\u0648\\u062C\\u0648\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643\\u064A\\u0646 \\u0639\\u0644\\u0649 \\u0627\\u0644\\u0623\\u0642\\u0644 \\u0644\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0647\\u0630\\u0627\n\n#YMSG:participant already exists\nPARTICIPANT_EXISTS={0} \\u062A\\u0645\\u062A \\u0625\\u0636\\u0627\\u0641\\u062A\\u0647 \\u0628\\u0627\\u0644\\u0641\\u0639\\u0644 \\u0643\\u0645\\u0634\\u0627\\u0631\\u0643 \\u0628\\u0646\\u0648\\u0639 \\u0627\\u0644\\u0645\\u0634\\u0627\\u0631\\u0643 {1}\n\n#XFLD, 30: Field Transaction Type on Info Form\nTYPE=\\u0627\\u0644\\u0646\\u0648\\u0639\n',
	"cus/crm/opportunity/i18n/i18n_cs.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=P\\u0159\\u00EDle\\u017Eitosti ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Vytvo\\u0159it\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Zobrazen\\u00ED - nastaven\\u00ED\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Nastaven\\u00ED\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Maxim\\u00E1ln\\u00ED po\\u010Det p\\u0159\\u00EDle\\u017Eitost\\u00ED k zobrazen\\u00ED\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Pokud existuje velk\\u00FD po\\u010Det p\\u0159\\u00EDle\\u017Eitost\\u00ED, bude to m\\u00EDt dopad na v\\u00FDkon aplikace.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=P\\u0159\\u00EDle\\u017Eitost\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Upravit p\\u0159\\u00EDle\\u017Eitost\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=P\\u0159\\u00EDle\\u017Eitosti\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Info\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produkty\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Pozn\\u00E1mky\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=P\\u0159\\u00EDlohy\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Konkurenti\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=\\u00DA\\u010Dastn\\u00EDci\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Z\\u00E1kazn\\u00EDk\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID p\\u0159\\u00EDle\\u017Eitosti\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Datum zah\\u00E1jen\\u00ED\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Datum uzav\\u0159en\\u00ED\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=\\u0160ance na \\u00FAsp\\u011Bch\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=F\\u00E1ze prodeje\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorita\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produkt\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Mno\\u017Estv\\u00ED\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Hodnota netto\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=O\\u010Dek\\u00E1van\\u00E1 celkov\\u00E1 hodnota\r\n\r\n#XBUT: edit button text\r\nEDIT=Upravit\r\n\r\n#XBUT: Save button text\r\nSAVE=Ulo\\u017Eit\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Zru\\u0161it\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=P\\u0159idat v\\u00EDce produkt\\u016F\r\n\r\n#XBUT: Add Products button text\r\nADD=P\\u0159idat\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=P\\u0159idat kontakt\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=P\\u0159\\u00EDle\\u017Eitost ulo\\u017Eena\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Nepoda\\u0159ilo se ulo\\u017Eit p\\u0159\\u00EDle\\u017Eitost\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logo z\\u00E1kazn\\u00EDka\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Jm\\u00E9no\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Hlavn\\u00ED kontakt\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=O\\u010Dek\\u00E1van\\u00FD objem prodeje\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Protokol zm\\u011Bn\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Pohled\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Ko\\u0161\\u00EDk produkt\\u016F\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=O\\u010Dek\\u00E1van\\u00FD objem prod. (v\\u00E1\\u017Een\\u00FD)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Progn\\u00F3za - relevance\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=v\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Od\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=Do\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Zapnuto\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Vypnuto\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Zm\\u011Bn\\u011Bno\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Kontakt\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Hledat\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Katalog produkt\\u016F\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Pr\\u00E1zdn\\u00FD ko\\u0161\\u00EDk produkt\\u016F\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Funkce partnera\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Vybrat typ transakce\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=T\\u0159\\u00EDdit\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=P\\u0159\\u00EDle\\u017Eitost ulo\\u017Eena\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Aktu\\u00E1ln\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00ED konkurenti\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Aktu\\u00E1ln\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00E9 produkty\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Aktu\\u00E1ln\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00ED \\u00FA\\u010Dastn\\u00EDci (zahrnut\\u00E9 strany)\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Nebyly nalezeny zm\\u011Bny\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=M\\u016F\\u017Eete zobrazit pouze vizitky z\\u00E1kazn\\u00EDk\\u016F \\u010Di kontakt\\u016F\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Neexistuj\\u00ED \\u017E\\u00E1dn\\u00E9 n\\u00E1sledn\\u00E9 typy\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Aktu\\u00E1ln\\u00ED p\\u0159\\u00EDle\\u017Eitost m\\u00E1 chyby, nebo v customizingu (p\\u0159izp\\u016Fsoben\\u00ED) nejsou vedeny \\u017E\\u00E1dn\\u00E9 typy n\\u00E1sledn\\u00FDch transakc\\u00ED\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Chcete-li zobrazit vizitku, mus\\u00ED b\\u00FDt pro specifikovan\\u00E9ho z\\u00E1kazn\\u00EDka k dispozici vizitka\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Chcete-li zobrazit vizitku, v\\u0161echny povinn\\u00E9 detaily mus\\u00ED b\\u00FDt pro specifikovan\\u00E9ho z\\u00E1kazn\\u00EDka dostupn\\u00E9\r\n\r\n#YMSG, 30: error\r\nERROR=Chyba\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Zadejte platn\\u00E9 hodnoty pro data\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Datum uzav\\u0159en\\u00ED nesm\\u00ED b\\u00FDt d\\u0159\\u00EDv\\u011Bj\\u0161\\u00ED ne\\u017E po\\u010D\\u00E1te\\u010Dn\\u00ED datum\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=P\\u0159idat popis (maxim\\u00E1ln\\u011B 40 znak\\u016F)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Aktu\\u00E1ln\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00E9 pozn\\u00E1mky\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Zadejte hodnoty pro v\\u0161echna povinn\\u00E1 pole\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Pozn\\u00E1mka ulo\\u017Eena\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Pozn\\u00E1mku se nepoda\\u0159ilo ulo\\u017Eit\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Zodpov\\u00EDd\\u00E1te za {0} z {1} p\\u0159\\u00EDle\\u017Eitost\\u00ED. Je zobrazeno pouze p\\u0159\\u00EDle\\u017Eitost\\u00ED. \r\n\r\n#XFLD: account ascending\r\nACTASC=Z\\u00E1kazn\\u00EDk (vzestupn\\u011B)\r\n\r\n#XFLD: account descending\r\nACTDESC=Z\\u00E1kazn\\u00EDk (sestupn\\u011B)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (vzestupn\\u011B)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (sestupn\\u011B)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Datum uzav\\u0159en\\u00ED (vzestupn\\u011B)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Datum uzav\\u0159en\\u00ED (sestupn\\u011B)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrov\\u00E1no podle z\\u00E1kazn\\u00EDka\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=M\\u011Bna\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=Tis.\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=Mil.\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=Mld.\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Aktu\\u00E1ln\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00E9 p\\u0159\\u00EDle\\u017Eitosti\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Hledat\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Vybrat z\\u00E1kazn\\u00EDka\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Vybrat m\\u011Bnu\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Vybrat kontakt\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=T\\u0159\\u00EDdit podle\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Sd\\u00EDlet v JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Diskutovat v JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=M\\u011Bna\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Hledat\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Zav\\u00E1d\\u00ED se...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=V sou\\u010Dasn\\u00E9 dob\\u011B nejsou k dispozici \\u017E\\u00E1dn\\u00E9 polo\\u017Eky\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Zm\\u011Bn\\u011Bno\\:  "{0}" z Vyp. na Zap.\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Zm\\u011Bn\\u011Bno\\: "{0}" ze Zap. na Vyp.\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Zm\\u011Bn\\u011Bno\\: {0} z \\u017E\\u00E1dn\\u00E9 hodnoty na   {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Zm\\u011Bn\\u011Bno\\: "{0}" z "{1}" na "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=P\\u0159\\u00EDle\\u017Eitosti ulo\\u017Eeny s chybami\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=V sou\\u010Dasn\\u00E9 dob\\u011B nejsou k dispozici kontakty\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=M\\u016F\\u017Eete zobrazit pouze vizitky kontakt\\u016F, kter\\u00E9 byly p\\u0159i\\u0159azeny tomutu z\\u00E1kazn\\u00EDkovi\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=O\\u010Dek\\u00E1van\\u00FD objem prodeje v {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produkt/kategorie\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Kategorie produktu\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Upozorn\\u011Bn\\u00ED\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=V\\u0161echny neulo\\u017Een\\u00E9 zm\\u011Bny budou ztraceny. Opravdu chcete pokra\\u010Dovat?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Pokra\\u010Dovat\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=N\\u00E1sledn\\u00E1 p\\u0159\\u00EDle\\u017Eitost byla ulo\\u017Eena\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Sch\\u016Fzka\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=N\\u00E1sledn\\u00E1 \\u010Dinnost\r\n\r\n#XBUT: create task\r\nCREATE_TASK=\\u00DAloha\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=P\\u0159\\u00EDle\\u017Eitost\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Zam\\u011Bstnanci\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Odpov\\u011Bdn\\u00FD zam\\u011Bstnanec\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Hledat zam\\u011Bstnance\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=\\u00DA\\u010Dastn\\u00EDci ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Nebyli nalezeni \\u017E\\u00E1dn\\u00ED \\u00FA\\u010Dastn\\u00EDci\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Hledat \\u00FA\\u010Dastn\\u00EDky\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=P\\u0159idat \\u00FA\\u010Dastn\\u00EDky\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Pro tento typ \\u00FA\\u010Dastn\\u00EDka mus\\u00EDte vybrat alespo\\u0148 tento po\\u010Det \\u00FA\\u010Dastn\\u00EDk\\u016F\\: {0}\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Pro tento typ \\u00FA\\u010Dastn\\u00EDka mus\\u00EDte vybrat alespo\\u0148 tento po\\u010Det \\u00FA\\u010Dastn\\u00EDk\\u016F\\: {0}\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=M\\u016F\\u017Eete vybrat maxim\\u00E1ln\\u011B {0} \\u00FA\\u010Dastn\\u00EDk\\u016F pro tento typ \\u00FA\\u010Dastn\\u00EDka\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=M\\u016F\\u017Eete vybrat maxim\\u00E1ln\\u011B {0} \\u00FA\\u010Dastn\\u00EDk\\u016F pro tento typ \\u00FA\\u010Dastn\\u00EDka\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Zadali jste neplatnou m\\u011Bnu. Chcete tato data ulo\\u017Eit?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Neuvedli jste m\\u011Bnu. Chcete tato data ulo\\u017Eit?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Tento typ \\u00FA\\u010Dastn\\u00EDka vy\\u017Eaduje alespo\\u0148 n\\u00E1sleduj\\u00EDc\\u00ED po\\u010Det \\u00FA\\u010Dastn\\u00EDk\\u016F\\: {0} \r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Tento typ \\u00FA\\u010Dastn\\u00EDka vy\\u017Eaduje alespo\\u0148 n\\u00E1sleduj\\u00EDc\\u00ED po\\u010Det \\u00FA\\u010Dastn\\u00EDk\\u016F\\: {0} \r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} ji\\u017E byl p\\u0159id\\u00E1n jako \\u00FA\\u010Dastn\\u00EDk s typem \\u00FA\\u010Dastn\\u00EDka {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Typ\r\n',
	"cus/crm/opportunity/i18n/i18n_de.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Opportunitys ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Anlegen\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Einstellungen anzeigen\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Einstellungen\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Maximale Anzahl an anzuzeigenden Opportunitys\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Beachten Sie bitte, dass sich eine gro\\u00DFe Anzahl von Opportunitys negativ auf die Performance auswirkt.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Opportunity\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Opportunity bearbeiten\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Opportunitys\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Info\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produkte\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notizen\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Anlagen\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Wettbewerber\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Teilnehmer\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Account\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=Opportunity-ID\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Startdatum\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Abschlussdatum\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Erfolgschance\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Verkaufsphase\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorit\\u00E4t\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produkt\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Menge\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Nettowert\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Erw. Gesamtwert\r\n\r\n#XBUT: edit button text\r\nEDIT=Bearbeiten\r\n\r\n#XBUT: Save button text\r\nSAVE=Sichern\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Abbrechen\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Weitere Produkte hinzuf\\u00FCgen\r\n\r\n#XBUT: Add Products button text\r\nADD=Hinzuf\\u00FCgen\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Ansprechpartner hinzuf\\u00FCgen\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Opportunity gesichert\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Opportunity konnte nicht gesichert werden\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Account-Logo\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Bezeichnung\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Hauptansprechpartner\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Erwarteter Umsatz\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=\\u00C4nderungsprotokoll\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Anzeigen\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Produktkorb\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Erwarteter Umsatz (gewichtet)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Prognoserelevanz\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=in\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Von\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=bis\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Ein\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Aus\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Ge\\u00E4ndert\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Ansprechpartner\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Suchen\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Produktkatalog\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Leerer Produktkorb\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Partnerfunktion\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Vorgangsart ausw\\u00E4hlen\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Sortierung\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Opportunity gesichert\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Derzeit sind keine Wettbewerber verf\\u00FCgbar\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Derzeit sind keine Produkte verf\\u00FCgbar\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Derzeit sind keine Teilnehmer (Beteiligte) verf\\u00FCgbar\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Keine \\u00C4nderungen gefunden\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Sie k\\u00F6nnen nur Visitenkarten von Accounts oder Ansprechpartnern ansehen\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Keine Folgevorgangsarten vorhanden\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Entweder ist die aktuelle Opportunity fehlerhaft oder es wurden keine Folgevorgangsarten im Customizing bearbeitet\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Um eine Visitenkarte ansehen zu k\\u00F6nnen, m\\u00FCssen die Details f\\u00FCr den angegebenen Account verf\\u00FCgbar sein\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Um eine Visitenkarte ansehen zu k\\u00F6nnen, m\\u00FCssen alle ben\\u00F6tigen Details f\\u00FCr den angegebenen Account verf\\u00FCgbar sein\r\n\r\n#YMSG, 30: error\r\nERROR=Fehler\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Geben Sie f\\u00FCr die Daten g\\u00FCltige Werte ein\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Abschlussdatum darf nicht vor dem Startdatum liegen\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Beschreibung hinzuf\\u00FCgen (maximal 40 Zeichen)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Derzeit sind keine Notizen verf\\u00FCgbar\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Geben Sie Werte f\\u00FCr alle Mussfelder ein\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Notiz gesichert\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Notiz konnte nicht gesichert werden\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Sie sind f\\u00FCr {0} von {1} Opportunitys zust\\u00E4ndig. Es werden nur Ihre Opportunitys angezeigt. \r\n\r\n#XFLD: account ascending\r\nACTASC=Account (aufsteigend)\r\n\r\n#XFLD: account descending\r\nACTDESC=Account (absteigend)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (aufsteigend)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (absteigend)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Abschlussdatum (aufsteigend)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Abschlussdatum (absteigend)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Gefiltert nach Account\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=W\\u00E4hrung\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=Tsd.\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=Mio.\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=Mrd.\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Derzeit sind keine Opportunitys verf\\u00FCgbar\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Suchen\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Account ausw\\u00E4hlen\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=W\\u00E4hrung ausw\\u00E4hlen\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Ansprechpartner ausw\\u00E4hlen\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Sortieren nach\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Im SAP Jam teilen\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=In SAP Jam diskutieren\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=W\\u00E4hrung\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Suchen\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Ladevorgang l\\u00E4uft...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Derzeit sind keine Positionen verf\\u00FCgbar\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Ge\\u00E4ndert\\:  "{0}" von "Aus" in "Ein"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Ge\\u00E4ndert\\: "{0}" von "Ein" in "Aus"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Ge\\u00E4ndert\\: {0} von "Kein Wert" in  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Ge\\u00E4ndert\\: "{0}" von "{1}" in "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Opportunity mit Fehlern gesichert\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Derzeit sind keine Ansprechpartner verf\\u00FCgbar\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Sie k\\u00F6nnen nur Visitenkarten von Ansprechpartnern ansehen, die diesem Account zugeordnet wurden\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Erwarteter Umsatz in {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produkt/Kategorie\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Produktkategorie\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Warnung\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Ungesicherte \\u00C4nderungen gehen verloren. M\\u00F6chten Sie wirklich fortfahren?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Weiter\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Folge-Opportunity gesichert\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Termin\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Folgevorgang\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Aufgabe\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Opportunity\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Mitarbeiter\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Zust\\u00E4ndiger Mitarbeiter\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Mitarbeiter suchen\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Teilnehmer ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Keine Teilnehmer gefunden\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Teilnehmer suchen\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Teilnehmer hinzuf\\u00FCgen\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=F\\u00FCr diesen Teilnehmertyp m\\u00FCssen Sie mindestens {0} Teilnehmer ausw\\u00E4hlen\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=F\\u00FCr diesen Teilnehmertyp m\\u00FCssen Sie mindestens {0} Teilnehmer ausw\\u00E4hlen\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=F\\u00FCr diesen Teilnehmertyp k\\u00F6nnen Sie maximal {0} Teilnehmer ausw\\u00E4hlen\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=F\\u00FCr diesen Teilnehmertyp k\\u00F6nnen Sie maximal {0} Teilnehmer ausw\\u00E4hlen\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Sie haben eine ung\\u00FCltige W\\u00E4hrung eingegeben. M\\u00F6chten Sie die Daten sichern?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Sie haben keine W\\u00E4hrung angegeben. M\\u00F6chten Sie die Daten sichern?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=F\\u00FCr diesen Teilnehmertyp werden mindestens {0} Teilnehmer ben\\u00F6tigt\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=F\\u00FCr diesen Teilnehmertyp werden mindestens {0} Teilnehmer ben\\u00F6tigt\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} wurde bereits als Teilnehmer hinzugef\\u00FCgt f\\u00FCr den Teilnehmertyp {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Art\r\n',
	"cus/crm/opportunity/i18n/i18n_en.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Opportunities ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Create\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Display Settings\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Settings\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Maximum number of opportunities to be displayed\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Please note that if there is a large number of opportunities, the performance of the application will be affected.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Opportunity\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Edit Opportunity\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Opportunities\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Info\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Products\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notes\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Attachments\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Competitors\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Participants\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Account\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=Opportunity ID\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Start Date\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Closing Date\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Chance of Success\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Sales Stage\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priority\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Product\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Quantity\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Net Value\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Exp. Total Value\r\n\r\n#XBUT: edit button text\r\nEDIT=Edit\r\n\r\n#XBUT: Save button text\r\nSAVE=Save\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Cancel\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Add More Products\r\n\r\n#XBUT: Add Products button text\r\nADD=Add\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Add Contact\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Opportunity saved\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Could not save the opportunity\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Account Logo\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Name\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Main Contact\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Expected Sales Volume\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Log of Changes\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=View\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Product Basket\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Exp. Sales Volume (Weighted)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Forecast Relevance\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=in\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=From\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=To\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=On\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Off\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Changed\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Contact\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Search\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Product Catalog\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Empty Product Basket\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Partner Function\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Select Transaction Type\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Sort\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Opportunity saved\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=No competitors are currently available\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=No products are currently available\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=No participants (parties involved) are currently available\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=No changes found\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=You can only view business cards of accounts or contacts\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=No follow-up types exist\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Either the current opportunity has errors or there are no follow-up transaction types maintained in the Customizing\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=To view a business card, there must be details available for the specified account\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=To view a business card, all required details must be available for the specified account\r\n\r\n#YMSG, 30: error\r\nERROR=Error\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Enter valid values for dates\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Closing date must not be earlier than start date\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Add description (a maximum of 40 characters)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=No notes are currently available\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Enter values for all the mandatory fields\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Note saved\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Could not save note\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=You are responsible for {0} out of {1} opportunities.Only your opportunities are displayed. \r\n\r\n#XFLD: account ascending\r\nACTASC=Account (Ascending)\r\n\r\n#XFLD: account descending\r\nACTDESC=Account (Descending)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (Ascending)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (Descending)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Closing Date (Ascending)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Closing Date (Descending)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtered by Account\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Currency\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=K\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=No opportunities are currently available\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Search\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Select Account\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Select Currency\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Select Contact\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Sort By\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Share on JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Discuss on JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Currency\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Search\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Loading...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=No items are currently available\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Changed\\:  "{0}" from "Off" to "On"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Changed\\: "{0}" from "On" to "Off"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Changed\\: {0} from "No Value" to  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Changed\\: "{0}" from "{1}" to "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Opportunity saved with errors\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=No contacts are currently available\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=You can only view business cards of contacts that have been assigned to this account\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Exp. Sales Volume in {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Product/Category\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Product Category\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Warning\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Any unsaved changes will be lost. Are you sure you want to continue?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Continue\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Follow-up opportunity saved\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Appointment\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Follow Up\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Task\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Opportunity\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Employees\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Employee Responsible\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Search for Employees\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Participants ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=No participants found\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Search for Participants\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Add Participants\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=You must select a minimum of {0} participants for this participant type\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=You must select a minimum of {0} participants for this participant type\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=You can only select a maximum of {0} participants for this participant type\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=You can only select a maximum of {0} participants for this participant type\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=You have entered an invalid currency. Do you want to save this data?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=You have not provided a currency. Do you want to save this data?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=At least {0} participants are required for this participant type\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=At least {0} participants are required for this participant type\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} has already been added as a participant with the participant type {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Type\r\n',
	"cus/crm/opportunity/i18n/i18n_en_US_sappsd.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F ({0})]]]\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113]]]\n\n#XBUT : show result\nSHOW_SETTING=[[[\\u013B\\u012F\\u015F\\u0163 \\u015C\\u0113\\u0163\\u0163\\u012F\\u014B\\u011F\\u015F]]]\n\n#XBUT : list setting button text\nLIST_SETTING=[[[\\u015C\\u0113\\u0163\\u0163\\u012F\\u014B\\u011F\\u015F]]]\n\n#XTXT : Show instruction\nSHOW_INS=[[[\\u039C\\u0105\\u03C7\\u012F\\u0271\\u0171\\u0271 \\u014B\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F \\u0163\\u014F \\u0183\\u0113 \\u018C\\u012F\\u015F\\u03C1\\u013A\\u0105\\u0177\\u0113\\u018C\\:]]]\n\n#XTXT : Show noteS\nSHOW_INS_NOTES=[[[*\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u014B\\u014F\\u0163\\u0113 \\u0163\\u0125\\u0105\\u0163 \\u012F\\u0192 \\u0163\\u0125\\u0113\\u0157\\u0113 \\u0105\\u0157\\u0113 \\u0105 \\u013A\\u0105\\u0157\\u011F\\u0113 \\u014B\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F, \\u0163\\u0125\\u0113 \\u03C1\\u0113\\u0157\\u0192\\u014F\\u0157\\u0271\\u0105\\u014B\\u010B\\u0113 \\u014F\\u0192 \\u0163\\u0125\\u0113 \\u0105\\u03C1\\u03C1\\u013A\\u012F\\u010B\\u0105\\u0163\\u012F\\u014F\\u014B \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u0105\\u0192\\u0192\\u0113\\u010B\\u0163\\u0113\\u018C.]]]\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177]]]\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=[[[\\u0114\\u018C\\u012F\\u0163 \\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177]]]\n\n#XTIT: Application title\nSHELL_TITLE=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F]]]\n\n#XTIT: this is the title for the Info Tab\nINFO=[[[\\u012F\\u014B\\u0192\\u014F]]]\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F]]]\n\n#XTIT: this is the title for the Notes Tab\nNOTES=[[[\\u0143\\u014F\\u0163\\u0113\\u015F]]]\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=[[[\\u1000\\u0163\\u0163\\u0105\\u010B\\u0125\\u0271\\u0113\\u014B\\u0163\\u015F]]]\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=[[[\\u0108\\u014F\\u0271\\u03C1\\u0113\\u0163\\u012F\\u0163\\u014F\\u0157\\u015F]]]\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=[[[\\u01A4\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F]]]\n\n#XFLD, 30: Field Account on List\nACCOUNT=[[[\\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u012C\\u010E]]]\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=[[[\\u015C\\u0163\\u0105\\u0157\\u0163 \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=[[[\\u0108\\u013A\\u014F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0163\\u0113]]]\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=[[[\\u0108\\u0125\\u0105\\u014B\\u010B\\u0113 \\u014F\\u0192 \\u015C\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F]]]\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F]]]\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=[[[\\u015C\\u0105\\u013A\\u0113\\u015F \\u015C\\u0163\\u0105\\u011F\\u0113]]]\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=[[[\\u01A4\\u0157\\u012F\\u014F\\u0157\\u012F\\u0163\\u0177]]]\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163]]]\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=[[[\\u01EC\\u0171\\u0105\\u014B\\u0163\\u012F\\u0163\\u0177]]]\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=[[[\\u0143\\u0113\\u0163 \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XFLD, 30: Field "Exp.Total Value" on Product tab\nVOLUME=[[[\\u0114\\u03C7\\u03C1.\\u0162\\u014F\\u0163\\u0105\\u013A \\u01B2\\u0105\\u013A\\u0171\\u0113]]]\n\n#XBUT: edit button text\nEDIT=[[[\\u0114\\u018C\\u012F\\u0163]]]\n\n#XBUT: Save button text\nSAVE=[[[\\u015C\\u0105\\u028B\\u0113]]]\n\n#XBUT: Cancel button text\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A]]]\n\n#XBUT: Add More Products button text\nADD_PROD=[[[\\u1000\\u018C\\u018C \\u039C\\u014F\\u0157\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F]]]\n\n#XBUT: Add Products button text\nADD=[[[\\u1000\\u018C\\u018C ]]]\n\n#XBUT: Add Contacts button text\nADDCONTACT=[[[\\u1000\\u018C\\u018C \\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163]]]\n\n#YMSG: lead saved\nOPP_SAVED=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u015F\\u0105\\u028B\\u0113\\u018C]]]\n\n#YMSG: lead could not be saved\nSAVE_FAILED=[[[\\u0108\\u014F\\u0171\\u013A\\u018C \\u014B\\u014F\\u0163 \\u015F\\u0105\\u028B\\u0113 \\u0163\\u0125\\u0113 \\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 ]]]\n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=[[[\\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 \\u013B\\u014F\\u011F\\u014F]]]\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=[[[\\u0143\\u0105\\u0271\\u0113]]]\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=[[[\\u039C\\u0105\\u012F\\u014B \\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163]]]\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=[[[\\u0114\\u03C7\\u03C1\\u0113\\u010B\\u0163\\u0113\\u018C \\u015C\\u0105\\u013A\\u0113\\u015F \\u01B2\\u014F\\u013A\\u0171\\u0271\\u0113 ]]]\n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=[[[\\u013B\\u014F\\u011F \\u014F\\u0192 \\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F]]]\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=[[[\\u01B2\\u012F\\u0113\\u0175]]]\n\n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0181\\u0105\\u015F\\u0137\\u0113\\u0163]]]\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=[[[\\u0114\\u03C7\\u03C1. \\u015C\\u0105\\u013A\\u0113\\u015F \\u01B2\\u014F\\u013A\\u0171\\u0271\\u0113 (\\u0174\\u0113\\u012F\\u011F\\u0125\\u0163\\u0113\\u018C) ]]]\n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=[[[\\u0191\\u014F\\u0157\\u0113\\u010B\\u0105\\u015F\\u0163 \\u0158\\u0113\\u013A\\u0113\\u028B\\u0105\\u014B\\u010B\\u0113 ]]]\n\n#XFLD, 30: Field "In" on Detail Header\nIN=[[[\\u012F\\u014B  ]]]\n\n#XFLD, 30: Field "From" on View tab\nFROM=[[[\\u0191\\u0157\\u014F\\u0271 ]]]\n\n#XFLD, 30: Field "To" on View tab\nTO=[[[\\u0162\\u014F ]]]\n\n#XFLD, 30: Field "ON" on View tab\nON=[[[\\u014E\\u014B ]]]\n\n#XFLD, 30: Field "OFF" on View tab\nOFF=[[[\\u014E\\u0192\\u0192 ]]]\n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=[[[\\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u018C]]]\n\n#XTIT: contact title for contact F4\nCONTACT=[[[\\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163]]]\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u010B\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F]]]\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0108\\u0105\\u0163\\u0105\\u013A\\u014F\\u011F]]]\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=[[[\\u0114\\u0271\\u03C1\\u0163\\u0177 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0181\\u0105\\u015F\\u0137\\u0113\\u0163]]]\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=[[[\\u01A4\\u0105\\u0157\\u0163\\u014B\\u0113\\u0157 \\u0191\\u0171\\u014B\\u010B\\u0163\\u012F\\u014F\\u014B \\:]]]\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0162\\u0157\\u0105\\u014B\\u015F\\u0105\\u010B\\u0163\\u012F\\u014F\\u014B \\u0162\\u0177\\u03C1\\u0113]]]\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=[[[\\u015C\\u014F\\u0157\\u0163]]]\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u012F\\u015F \\u015C\\u0105\\u028B\\u0113\\u018C]]]\n\n#XBUT: OK button text\nOK=[[[\\u014E\\u0137 ]]]\n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=[[[\\u0143\\u014F \\u010B\\u014F\\u0271\\u03C1\\u0113\\u0163\\u012F\\u0163\\u014F\\u0157\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\n\n#YMSG, 60:  no products\nNOPRODUCTS=[[[\\u0143\\u014F \\u03C1\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\n\n#YMSG, 30:  no salesteam\nNOPARTIES=[[[\\u0143\\u014F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u0113\\u015F \\u012F\\u014B\\u028B\\u014F\\u013A\\u028B\\u0113\\u018C \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=[[[\\u0143\\u014F \\u010B\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F \\u0192\\u014F\\u0171\\u014B\\u018C]]]\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT=[[[\\u0176\\u014F\\u0171 \\u010B\\u0105\\u014B \\u014F\\u014B\\u013A\\u0177 \\u028B\\u012F\\u0113\\u0175 \\u0183\\u0171\\u015F\\u012F\\u014B\\u0113\\u015F\\u015F \\u010B\\u0105\\u0157\\u018C\\u015F \\u014F\\u0192 \\u0105\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163\\u015F \\u014F\\u0157 \\u010B\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F]]]\n\n#YMSG: no transaction types  present\nFOLLOWUPERROR=[[[\\u0143\\u014F \\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u016E\\u03C1 \\u0163\\u0177\\u03C1\\u0113\\u015F \\u0113\\u03C7\\u012F\\u015F\\u0163]]]\n\n#YMSG: detailed error message shown when no transaction types are present\nFOLLOWUPDETAILERROR=[[[\\u0114\\u012F\\u0163\\u0125\\u0113\\u0157 \\u0163\\u0125\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163 \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u0125\\u0105\\u015F \\u0113\\u0157\\u0157\\u014F\\u0157\\u015F \\u014F\\u0157 \\u0163\\u0125\\u0113\\u0157\\u0113 \\u0105\\u0157\\u0113 \\u014B\\u014F \\u0192\\u014F\\u013A\\u013A\\u014F\\u0175 \\u0171\\u03C1 \\u0163\\u0157\\u0105\\u014B\\u015F\\u0105\\u010B\\u0163\\u012F\\u014F\\u014B \\u0163\\u0177\\u03C1\\u0113\\u015F \\u0271\\u0105\\u012F\\u014B\\u0163\\u0105\\u012F\\u014B\\u0113\\u018C \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0108\\u0171\\u015F\\u0163\\u014F\\u0271\\u012F\\u017E\\u012F\\u014B\\u011F]]]\n\n#YMSG: account is null\nACCOUNT_IS_NULL=[[[\\u0162\\u014F \\u028B\\u012F\\u0113\\u0175 \\u0105 \\u0183\\u0171\\u015F\\u012F\\u014B\\u0113\\u015F\\u015F \\u010B\\u0105\\u0157\\u018C, \\u0163\\u0125\\u0113\\u0157\\u0113 \\u0271\\u0171\\u015F\\u0163 \\u0183\\u0113 \\u018C\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113 \\u0192\\u014F\\u0157 \\u0163\\u0125\\u0113 \\u015F\\u03C1\\u0113\\u010B\\u012F\\u0192\\u012F\\u0113\\u018C \\u0105\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#YMSG: some info missing\nINFO_MISSING=[[[\\u0162\\u014F \\u028B\\u012F\\u0113\\u0175 \\u0105 \\u0183\\u0171\\u015F\\u012F\\u014B\\u0113\\u015F\\u015F \\u010B\\u0105\\u0157\\u018C, \\u0105\\u013A\\u013A \\u0157\\u0113\\u01A3\\u0171\\u012F\\u0157\\u0113\\u018C \\u018C\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0271\\u0171\\u015F\\u0163 \\u0183\\u0113 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113 \\u0192\\u014F\\u0157 \\u0163\\u0125\\u0113 \\u015F\\u03C1\\u0113\\u010B\\u012F\\u0192\\u012F\\u0113\\u018C \\u0105\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#YMSG, 30: error\nERROR=[[[\\u0114\\u0157\\u0157\\u014F\\u0157]]]\n\n#YMSG: junk value entered for dates\nJUNK_DATE=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u028B\\u0105\\u013A\\u012F\\u018C \\u028B\\u0105\\u013A\\u0171\\u0113\\u015F \\u0192\\u014F\\u0157 \\u018C\\u0105\\u0163\\u0113\\u015F]]]\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=[[[\\u0108\\u013A\\u014F\\u015F\\u012F\\u014B\\u011F \\u018C\\u0105\\u0163\\u0113 \\u0271\\u0171\\u015F\\u0163 \\u014B\\u014F\\u0163 \\u0183\\u0113 \\u0113\\u0105\\u0157\\u013A\\u012F\\u0113\\u0157 \\u0163\\u0125\\u0105\\u014B \\u0163\\u0125\\u0113 \\u015F\\u0163\\u0105\\u0157\\u0163 \\u018C\\u0105\\u0163\\u0113]]]\n\n#YMSG, 30:  Description\nMAX_CHARS=[[[\\u1000\\u018C\\u018C \\u018C\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B (\\u0105 \\u0271\\u0105\\u03C7\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 40 \\u010B\\u0125\\u0105\\u0157\\u0105\\u010B\\u0163\\u0113\\u0157\\u015F)]]]\n\n#YMSG, 30:  no notes\nNONOTES=[[[\\u0143\\u014F \\u014B\\u014F\\u0163\\u0113\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113 ]]]\n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 \\u028B\\u0105\\u013A\\u0171\\u0113\\u015F \\u0192\\u014F\\u0157 \\u0105\\u013A\\u013A \\u0163\\u0125\\u0113 \\u0271\\u0105\\u014B\\u018C\\u0105\\u0163\\u014F\\u0157\\u0177 \\u0192\\u012F\\u0113\\u013A\\u018C\\u015F]]]\n\n#YMSG, 30: save note\nNOTE_SUCCESS=[[[\\u0143\\u014F\\u0163\\u0113 \\u015F\\u0105\\u028B\\u0113\\u018C]]]\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=[[[\\u0143\\u014F\\u0163\\u0113 \\u010B\\u014F\\u0171\\u013A\\u018C \\u014B\\u014F\\u0163 \\u0183\\u0113 \\u015F\\u0105\\u028B\\u0113\\u018C]]]\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=[[[\\u0176\\u014F\\u0171 \\u0105\\u0157\\u0113 \\u0157\\u0113\\u015F\\u03C1\\u014F\\u014B\\u015F\\u012F\\u0183\\u013A\\u0113 \\u0192\\u014F\\u0157 ({0}) \\u014F\\u0171\\u0163 \\u014F\\u0192 ({1}) \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F. \\u014E\\u014B\\u013A\\u0177 \\u0177\\u014F\\u0171\\u0157 \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u012F\\u0113\\u015F \\u0105\\u0157\\u0113 \\u018C\\u012F\\u015F\\u03C1\\u013A\\u0105\\u0177\\u0113\\u018C ]]]\n\n#XFLD: account ascending\nACTASC=[[[\\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 (\\u1000\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#XFLD: account descending\nACTDESC=[[[\\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 (\\u010E\\u0113\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#XFLD: Status ascending\nSTATASC=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F (\\u1000\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#XFLD: Status descending\nSTATDESC=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F (\\u010E\\u0113\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#XFLD: Closing Date ascending\nCLSDATEASC=[[[\\u0108\\u013A\\u014F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0163\\u0113 (\\u1000\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#XFLD: Closing Date descending\nCLSDATEDESC=[[[\\u0108\\u013A\\u014F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0163\\u0113 (\\u010E\\u0113\\u015F\\u010B\\u0113\\u014B\\u018C\\u012F\\u014B\\u011F)]]]\n\n#YMSG, 50: text in Dialogbox\nFILTER=[[[\\u0191\\u012F\\u013A\\u0163\\u0113\\u0157 \\u0183\\u0177 \\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163 ]]]\n\n#XTIT: title for currency dialog box\nCURRENCY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177]]]\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=[[[\\u0136]]]\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=[[[\\u039C\\u0143]]]\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=[[[\\u0181\\u0143]]]\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=[[[\\u0143\\u014F \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u0192\\u014F\\u0171\\u014B\\u018C]]]\n\n#YMSG: Place holder message\nSEARCH=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125]]]\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u1000\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177]]]\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163]]]\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID={0}[[[ ]]]{1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY={0}[[[ ]]]{1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=[[[\\u015C\\u014F\\u0157\\u0163 \\u0181\\u0177]]]\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=[[[\\u015C\\u0125\\u0105\\u0157\\u0113 \\u014E\\u014B \\u0134\\u1000\\u039C]]]\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=[[[\\u010E\\u012F\\u015F\\u010B\\u0171\\u015F\\u015F \\u014F\\u014B \\u0134\\u1000\\u039C]]]\n\n#XFLD: Currency label\nLBL_CURRENCY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177]]]\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125...]]]\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...]]]\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=[[[\\u0143\\u014F \\u012F\\u0163\\u0113\\u0271\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113]]]\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=[[[%]]]\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=[[[\\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u018C\\: {0} \\u0192\\u0157\\u014F\\u0271 \\u014E\\u0192\\u0192 \\u0163\\u014F \\u014E\\u014B]]]\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=[[[\\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u018C\\: {0} \\u0192\\u0157\\u014F\\u0271 \\u014E\\u014B \\u0163\\u014F \\u014E\\u0192\\u0192]]]\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=[[[\\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u018C\\: {0} \\u0192\\u0157\\u014F\\u0271 \\u0143\\u014F \\u01B2\\u0105\\u013A\\u0171\\u0113 \\u0163\\u014F ]]]{1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=[[[\\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u018C\\: {0} \\u0192\\u0157\\u014F\\u0271 {1} \\u0163\\u014F ]]]{2}\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=[[[\\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u015F\\u0105\\u028B\\u0113\\u018C \\u0175\\u012F\\u0163\\u0125 \\u0113\\u0157\\u0157\\u014F\\u0157\\u015F]]]\n\n#XFLD,20: No contacts\nNO_CONTACTS=[[[\\u0143\\u014F \\u010B\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F \\u0105\\u0157\\u0113 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163\\u013A\\u0177 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113 ]]]\n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT=[[[\\u0176\\u014F\\u0171 \\u010B\\u0105\\u014B \\u014F\\u014B\\u013A\\u0177 \\u028B\\u012F\\u0113\\u0175 \\u0183\\u0171\\u015F\\u012F\\u014B\\u0113\\u015F\\u015F \\u010B\\u0105\\u0157\\u018C\\u015F \\u014F\\u0192 \\u010B\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F \\u0163\\u0125\\u0105\\u0163 \\u0125\\u0105\\u015F \\u0183\\u0113\\u0113\\u014B \\u0105\\u015F\\u015F\\u012F\\u011F\\u014B\\u0113\\u018C \\u0163\\u014F \\u0163\\u0125\\u012F\\u015F \\u0105\\u010B\\u010B\\u014F\\u0171\\u014B\\u0163]]]\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=[[[\\u0114\\u03C7\\u03C1. \\u015C\\u0105\\u013A\\u0113\\u015F \\u01B2\\u014F\\u013A\\u0171\\u0271\\u0113 \\u012F\\u014B ]]]{0}\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163/\\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177]]]\n\n#XTIT: Product Category\nCATEGORY=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177]]]\n\n#XTIT: Warning title for data loss pop-up\nWARNING=[[[\\u0174\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F]]]\n\n#YMSG: data loss message\nDATA_LOSS=[[[\\u1000\\u014B\\u0177 \\u0171\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u010B\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u013A\\u014F\\u015F\\u0163.\\u1000\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u015F\\u0171\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u010B\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113?]]]\n\n#XBUT: continue buttonn\nCONTINUE=[[[\\u0108\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113]]]\n\n#YMSG: successful followup message in message toast\nfollowupsuccessful=[[[\\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u0171\\u03C1 \\u014F\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177 \\u015F\\u0105\\u028B\\u0113\\u018C \\u015F\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A\\u013A\\u0177]]]\n\n#XBUT: create appointment\nCREATE_APPOINTMENT=[[[\\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u0171\\u03C1 \\u1000\\u03C1\\u03C1\\u014F\\u012F\\u014B\\u0163\\u0271\\u0113\\u014B\\u0163]]]\n\n#XBUT: create appointment\nFOLLOW_UP=[[[\\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u016E\\u03C1]]]\n\n#XBUT: create task\nCREATE_TASK=[[[\\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u0171\\u03C1 \\u0162\\u0105\\u015F\\u0137]]]\n\n#XBUT: create opportunity\nCREATE_OPPORTUNITY=[[[\\u0191\\u014F\\u013A\\u013A\\u014F\\u0175 \\u0171\\u03C1 \\u014E\\u03C1\\u03C1\\u014F\\u0157\\u0163\\u0171\\u014B\\u012F\\u0163\\u0177]]]\n\n#XTIT \nEMPLOYEE_TITLE=[[[\\u0114\\u0271\\u03C1\\u013A\\u014F\\u0177\\u0113\\u0113\\u015F]]]\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=[[[\\u0114\\u0271\\u03C1\\u013A\\u014F\\u0177\\u0113\\u0113 \\u0158\\u0113\\u015F\\u03C1\\u014F\\u014B\\u015F\\u012F\\u0183\\u013A\\u0113]]]\n\n#XACT\nSEARCH_EMPLOYEE=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u0113\\u0271\\u03C1\\u013A\\u014F\\u0177\\u0113\\u0113\\u015F]]]\n\n#XTIT: sales team \nPARTICIPANTS=[[[\\u01A4\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F ({0})]]]\n\n#YMSG: no participants\nNO_PARTICIPANTS=[[[\\u0143\\u014F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F \\u0192\\u014F\\u0171\\u014B\\u018C]]]\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u0192\\u014F\\u0157 \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F]]]\n\n#XTIT: select participant\nADD_PARTICIPANTS=[[[\\u1000\\u018C\\u018C \\u01A4\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F]]]\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=[[[\\u0176\\u014F\\u0171 \\u0271\\u0171\\u015F\\u0163 \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0105 \\u0271\\u012F\\u014B\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS_1=[[[\\u0176\\u014F\\u0171 \\u0271\\u0171\\u015F\\u0163 \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0105 \\u0271\\u012F\\u014B\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=[[[\\u0176\\u014F\\u0171 \\u010B\\u0105\\u014B \\u014F\\u014B\\u013A\\u0177 \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0105 \\u0271\\u0105\\u03C7\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS_1=[[[\\u0176\\u014F\\u0171 \\u010B\\u0105\\u014B \\u014F\\u014B\\u013A\\u0177 \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0105 \\u0271\\u0105\\u03C7\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG: invalid currency message\nINVALID_CURRENCY=[[[\\u0176\\u014F\\u0171 \\u0125\\u0105\\u028B\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157\\u0113\\u018C \\u0105\\u014B \\u012F\\u014B\\u028B\\u0105\\u013A\\u012F\\u018C \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177. \\u010E\\u014F \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u015F\\u0105\\u028B\\u0113 \\u0163\\u0125\\u012F\\u015F \\u018C\\u0105\\u0163\\u0105?]]]\n\n#YMSG: null currency message\nNULL_CURRENCY=[[[\\u0176\\u014F\\u0171 \\u0125\\u0105\\u028B\\u0113 \\u014B\\u014F\\u0163 \\u03C1\\u0157\\u014F\\u028B\\u012F\\u018C\\u0113\\u018C \\u0105 \\u010B\\u0171\\u0157\\u0157\\u0113\\u014B\\u010B\\u0177. \\u010E\\u014F \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u015F\\u0105\\u028B\\u0113 \\u0163\\u0125\\u012F\\u015F \\u018C\\u0105\\u0163\\u0105?]]]\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS=[[[\\u0176\\u014F\\u0171 \\u0271\\u0171\\u015F\\u0163 \\u0125\\u0105\\u028B\\u0113 \\u0105 \\u0271\\u012F\\u014B\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS_1=[[[\\u0176\\u014F\\u0171 \\u0271\\u0171\\u015F\\u0163 \\u0125\\u0105\\u028B\\u0113 \\u0105 \\u0271\\u012F\\u014B\\u012F\\u0271\\u0171\\u0271 \\u014F\\u0192 {0} \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113]]]\n\n#YMSG:participant already exists\nPARTICIPANT_EXISTS={0}[[[ \\u0125\\u0105\\u015F \\u0105\\u013A\\u0157\\u0113\\u0105\\u018C\\u0177 \\u0183\\u0113\\u0113\\u014B \\u0105\\u018C\\u018C\\u0113\\u018C \\u0105\\u015F \\u0105 \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0175\\u012F\\u0163\\u0125 \\u0163\\u0125\\u0113 \\u03C1\\u0105\\u0157\\u0163\\u012F\\u010B\\u012F\\u03C1\\u0105\\u014B\\u0163 \\u0163\\u0177\\u03C1\\u0113 ]]]{1}\n\n#XFLD, 30: Field Transaction Type on Info Form\nTYPE=[[[\\u0162\\u0177\\u03C1\\u0113]]]\n',
	"cus/crm/opportunity/i18n/i18n_en_US_saptrc.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=k2iNwWItlepb3rbmC7q1fg_Opportunities ({0})\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=/4g5FqR1iejSRA2uLIOvfA_Create\n\n#XBUT : show result\nSHOW_SETTING=capXBpF0eOXabcKtII10Nw_List Settings\n\n#XBUT : list setting button text\nLIST_SETTING=p1DqniF0IiLdWnDTaZZ+ZQ_Settings\n\n#XTXT : Show instruction\nSHOW_INS=MoJOwpg8Jo9Y7cBA41kWvg_Maximum number of opportunities to be displayed\\:\n\n#XTXT : Show noteS\nSHOW_INS_NOTES=yCJmTjK6II2o8SEMG6qFZA_*Please note that if there are a large number of opportunities, the performance of the application will be affected.\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=bm3Ryv4k+0srZ/KrPVYzoA_Opportunity\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=SK42v+qzPxl7jeCmtYmxsQ_Edit Opportunity\n\n#XTIT: Application title\nSHELL_TITLE=62WUvyuayOA58lSPNX/Ccw_Opportunities\n\n#XTIT: this is the title for the Info Tab\nINFO=XxEEGzoF7geBE3PZ4lJCKg_info\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=VWxqTPWiQr/3V9D4rokffw_Products\n\n#XTIT: this is the title for the Notes Tab\nNOTES=ejyBcMd+eO8em7NDlatcdA_Notes\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=XQEk3CkaqKb1Bp3VTBqWBw_Attachments\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=6656/fcIhk3CO6gOu9gnTg_Competitors\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=RfrcWxfUF45r2lPcmqVwtA_Participants\n\n#XFLD, 30: Field Account on List\nACCOUNT=U2H7HvKV8vYb3GtTINe1uQ_Account\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=3KjEqb6eiuKP8Y/xKo9AXw_Opportunity ID\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=Van5F6mol/wHMAviiANIZg_Start Date\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=nETbDIVwGxwajh5jJ8hlGQ_Closing Date\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=bIEXYLagkpl9lC43qCX5sg_Chance of Success\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=xfX1iQ4wMdrylihlwl0wzg_Status\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=V8UC7A+4ohSdBRHzK1oO/w_Sales Stage\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=QupEN35hWyu1ebX7zEjDeg_Priority\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=xz1x9+dTQX36vzwZc6TyhQ_Product\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=3AyeUaOrEavk6PN67PAQPg_Quantity\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=/jbaq9DXQc1cs6/TH0/E5Q_Net Value\n\n#XFLD, 30: Field "Exp.Total Value" on Product tab\nVOLUME=WIcwWiUyTS2XxV7jDsX0yg_Exp.Total Value\n\n#XBUT: edit button text\nEDIT=FjETFkZv5rKxXbDmykzkwA_Edit\n\n#XBUT: Save button text\nSAVE=ixFuF26ed5T+s1OPOMQAjA_Save\n\n#XBUT: Cancel button text\nCANCEL=wOcMrRVkBJwIf5EKNot99g_Cancel\n\n#XBUT: Add More Products button text\nADD_PROD=YlmrtoWjImd3rmrSUlhnoQ_Add More Products\n\n#XBUT: Add Products button text\nADD=pyHc2wvWpdbmIwpr8UBuCw_Add \n\n#XBUT: Add Contacts button text\nADDCONTACT=khcrNYjixjTnf4llpGuX/g_Add Contact\n\n#YMSG: lead saved\nOPP_SAVED=Kc/eWZ/XJK3EZk2EDoN63Q_Opportunity saved\n\n#YMSG: lead could not be saved\nSAVE_FAILED=U9rrTBpMifVDqcuRsEi0SQ_Could not save the Opportunity \n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=SYsR6bSB8XqQgt74t5qHnA_Account Logo\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=r/6Hz6R0LiIhpF7EBWKvnQ_Name\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=TOYzy5atTEEZL02dHnMBsA_Main Contact\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=f4ITSnwY0anTRKwSfz1uIw_Expected Sales Volume \n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=8w5ysCOtVUPV+kL0wfVUnQ_Log of Changes\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=CJcdT8yNf9Ljp6tV5CCBFw_View\n\n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=cF4Tvwz81LcKNh4j/pXpAg_Product Basket\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=GlX/m+2i2TfOSH07Yr9k1w_Exp. Sales Volume (Weighted) \n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=kEYCS9Reo8Imfp6z6hR6Cg_Forecast Relevance \n\n#XFLD, 30: Field "In" on Detail Header\nIN=8H/IA+c/ssACRM9UM8q6YA_in  \n\n#XFLD, 30: Field "From" on View tab\nFROM=M0gDx3uxLQwob0ok9yeFRw_From \n\n#XFLD, 30: Field "To" on View tab\nTO=dpXsCmmZrMxavCIn6OzRug_To \n\n#XFLD, 30: Field "ON" on View tab\nON=pY8oN/igJicSbuMM5JSB7w_On \n\n#XFLD, 30: Field "OFF" on View tab\nOFF=Gmc8SbcpWKoVhbs1Ihqj1Q_Off \n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=jZ7NOF9O0NXh0aV945mHmA_Changed\n\n#XTIT: contact title for contact F4\nCONTACT=tFkqf1GfpAZ96FZ1D/611g_Contact\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=xgaZsONKvU7WUQgbk4mL7A_Search contacts\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=5AOyEx3bjlBikOd5sbPbHg_Product Catalog\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=vhWyWhtwjYlgD+jETnydYQ_Empty Product Basket\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=JZyhi5VlPqNVgMsY/2trDA_Partner Function \\:\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=DKJdnuNsmgQdf+GoHJ9W1Q_Select Transaction Type\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=5EDItrb2BiYi2Inh2qev6g_Sort\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=vt2qHi2Qdzbvnwm16td59A_Opportunity is Saved\n\n#XBUT: OK button text\nOK=S23p5k8WBTMEZknboIk77g_Ok \n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=GSCc0zJdhllV1eFWiNh/dg_No competitors are currently available\n\n#YMSG, 60:  no products\nNOPRODUCTS=N5yJmHh7gCmBYNljr7W88A_No products are currently available\n\n#YMSG, 30:  no salesteam\nNOPARTIES=snb7JtQZS7dbGiJaYkInNw_No parties involved are currently available\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=XbvnTWQbw0OXbZjZyP4QJA_No changes found\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT=EP9RwXTw0cWTrMGutDAAJw_You can only view business cards of accounts or contacts\n\n#YMSG: no transaction types  present\nFOLLOWUPERROR=ZNZy9kubqcPdf+kVp8MDAg_No Follow Up types exist\n\n#YMSG: detailed error message shown when no transaction types are present\nFOLLOWUPDETAILERROR=40ae0C2avA0CRj4m2q22sw_Either the current opportunity has errors or there are no follow up transaction types maintained in the Customizing\n\n#YMSG: account is null\nACCOUNT_IS_NULL=2r51o4AOWIyg/K4r+5uqcg_To view a business card, there must be details available for the specified account\n\n#YMSG: some info missing\nINFO_MISSING=O5281m/2hIjYtmNrcRcx+A_To view a business card, all required details must be available for the specified account\n\n#YMSG, 30: error\nERROR=2LQI9eD11aKCX5TAMXUpYg_Error\n\n#YMSG: junk value entered for dates\nJUNK_DATE=EhlzMzhI5tczB/n+E8zz+w_Enter valid values for dates\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=qj9QQbd/8zhmsXqL7kptYw_Closing date must not be earlier than the start date\n\n#YMSG, 30:  Description\nMAX_CHARS=GCahRpxt2Ki7TWBEoarqJg_Add description (a maximum of 40 characters)\n\n#YMSG, 30:  no notes\nNONOTES=rOr77tMdbCjwv33ZZ3t0JA_No notes are currently available \n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=NPdAUigr508WnfFx+pp/2A_Enter values for all the mandatory fields\n\n#YMSG, 30: save note\nNOTE_SUCCESS=kw9/UTIp5JrBXT+eLWDafw_Note saved\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=j4OaRyvw4W5MCZ7Cm14J8Q_Note could not be saved\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=Q6DZedSbwi2mIsBwZh5kZQ_You are responsible for ({0}) out of ({1}) opportunities. Only your opportunities are displayed \n\n#XFLD: account ascending\nACTASC=xeibTIX6KDPuQ5xRlzSQYA_Account (Ascending)\n\n#XFLD: account descending\nACTDESC=G8bNkZgfDf4iP8XlyZO4IA_Account (Descending)\n\n#XFLD: Status ascending\nSTATASC=GmZbzbw1/LgjXt46zeo2UQ_Status (Ascending)\n\n#XFLD: Status descending\nSTATDESC=tV36hWWPCDOvVBW3movgsQ_Status (Descending)\n\n#XFLD: Closing Date ascending\nCLSDATEASC=z4Ym9fDxsFt/NURvTiaJ5g_Closing Date (Ascending)\n\n#XFLD: Closing Date descending\nCLSDATEDESC=uewlC5ZsbnRx8pMWvkJuBw_Closing Date (Descending)\n\n#YMSG, 50: text in Dialogbox\nFILTER=dedRlall+Ofvjtf+3xoe8Q_Filter by Account \n\n#XTIT: title for currency dialog box\nCURRENCY=+9il/3E8d1+TL7CQeI2ZOw_Currency\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=IeoiVeQn5u7WLXJe5Hd8NQ_K\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=QYD/i9wead6LFbv7sPMQjg_MN\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=V/iljMIhkQQQgEu/aXRprQ_BN\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=ifHKqFcVhOfnfxlVa/sXew_No opportunity found\n\n#YMSG: Place holder message\nSEARCH=4m6hJ+EmSs0YwdrOKDzdmg_Search\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=Uo+2upQaOXv+6st/B6HY0A_Select Account\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=39Zuwv0kUfBlvJy6TY1frg_Select Currency\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=8WRTpntstPbgx8No+VBiZA_Select Contact\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID=ERv2RPONNRxd7I3oyG4O4w_{0} {1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY=a6+1wTXLN8U7NV9sHg9IfQ_{0} {1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=WwAxf3ZerhmlrYBnIW2bHQ_Sort By\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=bYWFUZSnMIBO04FXRoPeGg_Share On JAM\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=cGS5+0AYMTBynW21sOlAuQ_Discuss on JAM\n\n#XFLD: Currency label\nLBL_CURRENCY=j/kedInIKLiNCXvrgAuJ3w_Currency\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=miG6WkKSKNfy4Sw+EMdUUg_Search...\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=Bxk9Ik7tK7PRAGjSnf/LmA_Loading...\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=G9/GwUb/tETWnUIhcIcu1Q_No items are currently available\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=xSoLKZcnGp2iVttU0YCbrQ_%\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=LDnGs+QU2Fp3RZyu/JqwLw_Changed\\: {0} from Off to On\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=AjbrTUvbRBZvMocNxYLwRw_Changed\\: {0} from On to Off\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=MV9Ru7UqGNN4m/tUq5U7lQ_Changed\\: {0} from No Value to {1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=hqqB6L6H1+6WrsHltkip1g_Changed\\: {0} from {1} to {2}\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=NRzEQW7CBg1aXQ3Rc0K9NA_Opportunity saved with errors\n\n#XFLD,20: No contacts\nNO_CONTACTS=vHOA1YxMY9undQcZpwpKCA_No contacts are currently available \n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT=Sg+Hws/fgrnoQdUN355Myg_You can only view business cards of contacts that has been assigned to this account\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=Z2VCytiukriCHSij6lsElg_Exp. Sales Volume in {0}\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=73lIiza+W8Pa1ZNgMGDCTQ_Product/Category\n\n#XTIT: Product Category\nCATEGORY=aBh1evD1S0iX2bfTVxTffg_Product Category\n\n#XTIT: Warning title for data loss pop-up\nWARNING=irN4nI7+6bd++eqtR/155Q_Warning\n\n#YMSG: data loss message\nDATA_LOSS=4vV+XuHzt8AkZdkYNiffcA_Any unsaved changes will be lost.Are you sure you want to continue?\n\n#XBUT: continue buttonn\nCONTINUE=SAuhu8h8FJLTgzgQZdMFbA_Continue\n\n#YMSG: successful followup message in message toast\nfollowupsuccessful=VxZxTYaJn5/ATyGgRnQDxA_Follow up opportunity saved successfully\n\n#XBUT: create appointment\nCREATE_APPOINTMENT=p2sN6x9Zp1xtnBczmDOcpw_Follow up Appointment\n\n#XBUT: create appointment\nFOLLOW_UP=Tlp6V3sU8GoDCZnkJCxVUw_Follow Up\n\n#XBUT: create task\nCREATE_TASK=XDhtMDKy+sNu9YGQKkTg3A_Follow up Task\n\n#XBUT: create opportunity\nCREATE_OPPORTUNITY=Gz2Y+/tIsa12DCJlcnLpHg_Follow up Opportunity\n\n#XTIT \nEMPLOYEE_TITLE=W1T5rO/wHI9sVQiSn/uzcw_Employees\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=9EmecWt1fkl8MkUr5xZWow_Employee Responsible\n\n#XACT\nSEARCH_EMPLOYEE=7EHbi48XNnPyfH2EcYkRTA_Search employees\n\n#XTIT: sales team \nPARTICIPANTS=eVTyqtBt+DgGXPteAIbKRQ_Participants ({0})\n\n#YMSG: no participants\nNO_PARTICIPANTS=0pVTNalqbvOliVNgWyC14w_No participants found\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=9toOykQDRxS+Ix3VEFLgIQ_Search for participants\n\n#XTIT: select participant\nADD_PARTICIPANTS=GU+vK2DGs0xoEV57i6fLnA_Add Participants\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=y6RAE3UUot9p7vNzYsXhyA_You must select a minimum of {0} participants for this participant type\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS_1=kuegwTva6edkELfuYhrs7g_You must select a minimum of {0} participant for this participant type\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=mk8ZAOjHk3eTnLFluu4LKQ_You can only select a maximum of {0} participants for this participant type\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS_1=KUMV7WqoVhQoWX+QNWPGYw_You can only select a maximum of {0} participant for this participant type\n\n#YMSG: invalid currency message\nINVALID_CURRENCY=JqmuGlQlB7a+Kh7VqNs+Ow_You have entered an invalid currency. Do you want to save this data?\n\n#YMSG: null currency message\nNULL_CURRENCY=XjiO8NHtVykV+TFqxxBTwA_You have not provided a currency. Do you want to save this data?\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS=pDS4GgaKPvTD3TDodVAcrg_You must have a minimum of {0} participants for this participant type\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS_1=0ecUv0NbueELRonzcS+yAQ_You must have a minimum of {0} participant for this participant type\n\n#YMSG:participant already exists\nPARTICIPANT_EXISTS=8QZhTDvVEylrpKW69fzXpA_{0} has already been added as a participant with the participant type {1}\n\n#XFLD, 30: Field Transaction Type on Info Form\nTYPE=p8K7vu81p/vG2hs9WqkEkA_Type\n',
	"cus/crm/opportunity/i18n/i18n_es.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Oportunidades ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Crear\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Visualizar opciones\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Opciones\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=N\\u00FAmero m\\u00E1ximo de oportunidades para mostrar\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Tenga en cuenta que si hay un gran n\\u00FAmero de oportunidades, se ver\\u00E1 afectado el rendimiento de la aplicaci\\u00F3n.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Oportunidad\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Editar oportunidad\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Oportunidades\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Informaci\\u00F3n\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Productos\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notas\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Anexos\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Competidores\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Participantes\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Cliente\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID de oportunidad\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Fecha de inicio\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Fecha de cierre\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Posibilidad de \\u00E9xito\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Estado\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Fase de ventas\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Prioridad\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Producto\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Cantidad\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Valor neto\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Valor total previsto\r\n\r\n#XBUT: edit button text\r\nEDIT=Editar\r\n\r\n#XBUT: Save button text\r\nSAVE=Guardar\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Cancelar\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=A\\u00F1adir m\\u00E1s productos\r\n\r\n#XBUT: Add Products button text\r\nADD=A\\u00F1adir\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=A\\u00F1adir contacto\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Oportunidad guardada\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=No se ha podido guardar la oportunidad\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logotipo del cliente\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Nombre\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Contacto principal\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Volumen de ventas esperado\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Log de modificaciones\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Ver\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Cesta de productos\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Volumen ventas esp.(ponderado)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Relevancia de la previsi\\u00F3n\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=en\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Desde\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=Hasta\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Activados\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Desactivados\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Modificados\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Contacto\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Buscar\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Cat\\u00E1logo de productos\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Cesta de productos\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Funci\\u00F3n de socio comercial\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Seleccionar tipo de transacci\\u00F3n\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Clasificar\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Oportunidad guardada\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=No hay competidores disponibles actualmente\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=No hay productos disponibles actualmente\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=No hay participantes disponibles actualmente\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=No hay modificaciones\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Solo puede ver las tarjetas de presentaci\\u00F3n de clientes o contactos.\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=No existen tipos de seguimiento\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=O la oportunidad actual tiene errores o no se han actualizado tipos de transacci\\u00F3n de seguimiento en el Customizing\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Para ver una tarjeta de presentaci\\u00F3n, debe haber detalles disponibles para el cliente especificado.\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Para ver la tarjeta de presentaci\\u00F3n, todos los detalles necesarios deben estar disponibles para el cliente especificado.\r\n\r\n#YMSG, 30: error\r\nERROR=Error\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Introduzca valores para fechas v\\u00E1lidos\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=La fecha de cierre no puede ser anterior a la de inicio\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=A\\u00F1adir descripci\\u00F3n (m\\u00E1ximo de 40 caracteres)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=No hay notas disponibles actualmente\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Introduzca valores para todos los campos obligatorios\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Nota guardada\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=No se ha podido guardar la nota\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Es responsable de {0} de {1} oportunidades. Solo se muestran sus oportunidades. \r\n\r\n#XFLD: account ascending\r\nACTASC=Cliente (ascendente)\r\n\r\n#XFLD: account descending\r\nACTDESC=Cliente (descendiente)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Estado (ascendente)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Estado (descendente)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Fecha de cierre (ascendente)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Fecha de cierre (descendente)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrado por cliente\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Moneda\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=m\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=No hay oportunidades disponibles actualmente\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Buscar\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Seleccionar cliente\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Seleccionar moneda\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Seleccionar contacto\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Clasificar por\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Compartir en JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Debatir en JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Moneda\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Buscar\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Cargando...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Actualmente no hay posiciones disponibles\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Modificado el\\:  "{0} de "Desactivado" a "Activado"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Modificado el\\: "{0} de "Activado" a "Desactivado"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Modificado el\\: {0} de "Ning\\u00FAn valor" a  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Modificado el\\: "{0}" de "{1}" a "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Oportunidad guardada con errores\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=No hay contactos disponibles actualmente\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Solo puede ver las tarjetas de presentaci\\u00F3n de contactos asignados a este cliente.\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Volumen de ventas esperado en {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Producto/Categor\\u00EDa\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Categor\\u00EDa de producto\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Advertencia\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Se perder\\u00E1n las modificaciones sin guardar. \\u00BFSeguro que desea continuar?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Continuar\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Oportunidad de seguimiento grabada\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Cita\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Seguimiento\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Tarea\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Oportunidad\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Empleados\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Empleado responsable\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Buscar empleados\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Participantes ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=No hay participantes\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Buscar participantes\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=A\\u00F1adir participantes\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Debe seleccionar un m\\u00EDnimo de {0} participantes para este tipo de participante\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Debe seleccionar un m\\u00EDnimo de {0} participantes para este tipo de participante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Solo puede seleccionar un m\\u00E1ximo de {0} participantes para este tipo de participante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Solo puede seleccionar un m\\u00E1ximo de {0} participantes para este tipo de participante\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Ha introducido una moneda no v\\u00E1lida. \\u00BFDesea guardar estos datos?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=No ha indicado una moneda. \\u00BFDesea guardar estos datos?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Se necesitan al menos {0} participantes para este tipo de participante\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Se necesitan al menos {0} participantes para este tipo de participante\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} ya se ha a\\u00F1adido como participante con el tipo {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Tipo\r\n',
	"cus/crm/opportunity/i18n/i18n_fr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Opportunit\\u00E9s ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Cr\\u00E9er\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Options d\'affichage\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Options\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Nombre maximal d\'opportunit\\u00E9s \\u00E0 afficher \\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Notez que si le nombre d\'opportunit\\u00E9s est important, la performance de l\'application en sera affect\\u00E9e.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Opportunit\\u00E9\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Modifier l\\u2019opportunit\\u00E9\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Opportunit\\u00E9s\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Infos\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produits\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notes\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Pi\\u00E8ces jointes\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Concurrents\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Participants\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Compte\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID d\'opportunit\\u00E9\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Date de d\\u00E9but\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Date de cl\\u00F4ture\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Chance de r\\u00E9ussite\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Statut\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=\\u00C9tape de vente\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorit\\u00E9\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produit\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Quantit\\u00E9\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Valeur nette\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Valeur tot. escompt\\u00E9e\r\n\r\n#XBUT: edit button text\r\nEDIT=Modifier\r\n\r\n#XBUT: Save button text\r\nSAVE=Sauvegarder\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Interrompre\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Ajouter plus de produits\r\n\r\n#XBUT: Add Products button text\r\nADD=Ajouter\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Ajouter contact\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Opportunit\\u00E9 sauvegard\\u00E9e\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Impossible de sauvegarder l\'opportunit\\u00E9\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logo compte\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Nom\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Contact principal\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Volume d\'affaires escompt\\u00E9\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Journal des modifications\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Afficher\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Panier de produits\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Vol. affaires escompt\\u00E9 (pond.)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Pertinence de la pr\\u00E9vision\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=en\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=du\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=au\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Activ\\u00E9\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=D\\u00E9sactiv\\u00E9\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Modifi\\u00E9\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Contact\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Rechercher\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Catalogue de produits\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Panier de produits vide\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Fonction partenaire\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=S\\u00E9lectionner type de transaction\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Trier\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Opportunit\\u00E9 sauvegard\\u00E9e\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Aucun concurrent disponible actuellement\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Aucun produit disponible actuellement\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Aucun participant (personnes/organisations concern\\u00E9es) disponible(s) actuellement\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Aucune modification trouv\\u00E9e\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Vous pouvez uniquement afficher les cartes de visite de comptes ou contacts.\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Aucun type d\'op\\u00E9ration suivante n\'existe\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Soit l\'opportunit\\u00E9 actuelle content des erreurs, soit aucun type d\'op\\u00E9ration suivante n\'est g\\u00E9r\\u00E9 dans le Customizing.\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Pour afficher une carte de visite, les d\\u00E9tails du compte indiqu\\u00E9 doivent \\u00EAtre disponibles.\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Pour afficher une carte de visite, tous les d\\u00E9tails requis du compte indiqu\\u00E9 doivent \\u00EAtre disponibles.\r\n\r\n#YMSG, 30: error\r\nERROR=Erreur\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Saisissez des valeurs valides pour les dates.\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Date de cl\\u00F4ture ne doit pas \\u00EAtre ant\\u00E9rieure \\u00E0 la date de d\\u00E9but\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Ajouter description (40 caract\\u00E8res maximum)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Aucune note disponible actuellement\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Renseignez toutes les zones obligatoires\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Note sauvegard\\u00E9e\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Impossible de sauvegarder la note\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Vous \\u00EAtes responsable de {0}\\u00A0/\\u00A0{1} opportunit\\u00E9s. Seules vos t\\u00E2ches s\'\'affichent. \r\n\r\n#XFLD: account ascending\r\nACTASC=Compte (croissant)\r\n\r\n#XFLD: account descending\r\nACTDESC=Compte (d\\u00E9croissant)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Statut (croissant)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Statut (d\\u00E9croissant)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Date de cl\\u00F4ture (croissant)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Date de cl\\u00F4ture (d\\u00E9croissant)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtr\\u00E9 par compte \\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Devise\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=mlle\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=mln\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=mrd\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Aucune opportunit\\u00E9 disponible actuellement\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Rechercher\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=S\\u00E9lectionner compte\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=S\\u00E9lectionner devise\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=S\\u00E9lectionner contact\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Trier par\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Partager dans JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Discuter dans JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Devise\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Rechercher\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Chargement...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Aucun \\u00E9l\\u00E9ment disponible actuellement\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Modifi\\u00E9\\u00A0\\:  "{0}" de "D\\u00E9sactiv\\u00E9" \\u00E0 "Activ\\u00E9"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Modifi\\u00E9\\u00A0\\: "{0}" d\'\'"Activ\\u00E9" \\u00E0 "D\\u00E9sactiv\\u00E9"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Modifi\\u00E9\\u00A0\\: {0} de "Aucune valeur" \\u00E0  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Modifi\\u00E9\\u00A0\\: "{0}" de "{1}" \\u00E0 "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Opportunit\\u00E9 sauvegard\\u00E9e avec erreurs\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Aucun contact disponible actuellement\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Vous pouvez uniquement afficher les cartes de visite des contacts affect\\u00E9s \\u00E0 ce compte.\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Volume d\'\'affaires esc. en {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produit/Cat\\u00E9gorie\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Cat\\u00E9gorie de produit\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Avertissement\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Toutes les modifications non sauvegard\\u00E9es seront perdues. Voulez-vous continuer ?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Suite\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Opportunit\\u00E9 suivante sauvegard\\u00E9e\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Rendez-vous\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Activit\\u00E9 suivante\r\n\r\n#XBUT: create task\r\nCREATE_TASK=T\\u00E2che\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Opportunit\\u00E9\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Salari\\u00E9s\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Responsable\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Rechercher des salari\\u00E9s\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Personnes/Organisations concern\\u00E9es ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Aucune personne/organisation concern\\u00E9e trouv\\u00E9e\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Rechercher personne/organisation concern\\u00E9e\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Ajout de personne/organisation concern\\u00E9e\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Vous devez s\\u00E9lectionner au moins {0} personnes/organisations pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Vous devez s\\u00E9lectionner au moins {0} personnes/organisations pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Vous pouvez s\\u00E9lectionner au maximum {0} personnes/organisations pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Vous pouvez s\\u00E9lectionner au maximum {0} personnes/organisations pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Vous avez saisi une devise non valide. Voulez-vous sauvegarder ces donn\\u00E9es ?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Vous n\'avez saisi aucune devise. Voulez-vous sauvegarder ces donn\\u00E9es ?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Au moins {0} personnes/organisations sont requises pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Au moins {0} personnes/organisations sont requises pour ce type de personne/d\'\'organisation.\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} a d\\u00E9j\\u00E0 \\u00E9t\\u00E9 ajout\\u00E9 comme personne/organisation avec le type de personne/d\'\'organisation {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Type\r\n',
	"cus/crm/opportunity/i18n/i18n_hu.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Opportunity-k ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=L\\u00E9trehoz\\u00E1s\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Be\\u00E1ll\\u00EDt\\u00E1sok megjelen\\u00EDt\\u00E9se\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Be\\u00E1ll\\u00EDt\\u00E1sok\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Megjelen\\u00EDtend\\u0151 opportunityk maxim\\u00E1lis sz\\u00E1ma\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*K\\u00E9rem, vegye figyelembe, hogy amennyiben nagy sz\\u00E1m\\u00FA lehet\\u0151s\\u00E9g \\u00E1ll rendelkez\\u00E9sre, az az alkalmaz\\u00E1si performance-ot is \\u00E9rinti.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Opportunity\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Opportunity feldolgoz\\u00E1sa\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Opportunityk\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Inform\\u00E1ci\\u00F3\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Term\\u00E9kek\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Megjegyz\\u00E9sek\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Mell\\u00E9kletek\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Versenyt\\u00E1rsak\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=R\\u00E9sztvev\\u0151k\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=\\u00DCgyf\\u00E9l\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=Opportunity-ID\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Kezd\\u0151 d\\u00E1tum\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Z\\u00E1r\\u00F3 d\\u00E1tum\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Siker val\\u00F3sz\\u00EDn\\u0171s\\u00E9ge\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=St\\u00E1tus\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=\\u00C9rt\\u00E9kes\\u00EDt\\u00E9si f\\u00E1zis\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorit\\u00E1s\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Term\\u00E9k\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Mennyis\\u00E9g\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Nett\\u00F3 \\u00E9rt\\u00E9k\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=V\\u00E1rhat\\u00F3 \\u00F6ssz\\u00E9rt\\u00E9k\r\n\r\n#XBUT: edit button text\r\nEDIT=Feldolgoz\\u00E1s\r\n\r\n#XBUT: Save button text\r\nSAVE=Ment\\u00E9s\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=M\\u00E9gse\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=T\\u00F6bb term\\u00E9k hozz\\u00E1ad\\u00E1sa\r\n\r\n#XBUT: Add Products button text\r\nADD=Hozz\\u00E1ad\\u00E1s\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=T\\u00E1rgyal\\u00F3partner hozz\\u00E1ad\\u00E1sa\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Opportunity mentve\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Nem siker\\u00FClt elmenteni az opportunityt\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Fi\\u00F3klog\\u00F3\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=N\\u00E9v\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=F\\u0151 t\\u00E1rgyal\\u00F3partner\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=V\\u00E1rhat\\u00F3 forgalom\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=M\\u00F3dos\\u00EDt\\u00E1snapl\\u00F3\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Megjelen\\u00EDt\\u00E9s\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Term\\u00E9kkos\\u00E1r\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=V\\u00E1rt forgalom (s\\u00FAlyozott)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Progn\\u00F3zisrelevancia\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=\\:\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Kezd\\u00E9s\\:\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=A k\\u00F6vetkez\\u0151ig\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Ekkor\\:\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Ki\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=M\\u00F3dos\\u00EDtott\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=T\\u00E1rgyal\\u00F3partner\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Keres\\u00E9s\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Term\\u00E9kkatal\\u00F3gus\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=\\u00DCres term\\u00E9kkos\\u00E1r\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Partnerfunkci\\u00F3\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Tranzakci\\u00F3fajta kiv\\u00E1laszt\\u00E1sa\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Rendez\\u00E9s\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Opportunity mentve\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Jelenleg nincs el\\u00E9rhet\\u0151 versenyt\\u00E1rs\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Jelenleg nincs el\\u00E9rhet\\u0151 term\\u00E9k\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Jelenleg nem \\u00E1ll rendelkez\\u00E9sre r\\u00E9sztvev\\u0151 (\\u00E9rintett)\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Nem tal\\u00E1lhat\\u00F3k m\\u00F3dos\\u00EDt\\u00E1sok\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Csak fi\\u00F3kok vagy t\\u00E1rgyal\\u00F3partnerek n\\u00E9vjegyk\\u00E1rty\\u00E1it l\\u00E1thatja\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Nncsenek k\\u00F6vetkez\\u0151 t\\u00EDpusok\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Vagy hib\\u00E1s a jelenlegi lehet\\u0151s\\u00E9g, vagy nincs karbantartva k\\u00F6vetkez\\u0151 tranzakci\\u00F3t\\u00EDpus a customizingban\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=N\\u00E9vjegyk\\u00E1rtya megtekint\\u00E9s\\u00E9hez rendelkez\\u00E9sre kell \\u00E1lljanak a megadott fi\\u00F3k r\\u00E9szletei\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=N\\u00E9vjegyk\\u00E1rtya megtekint\\u00E9s\\u00E9hez rendelkez\\u00E9sre kell \\u00E1lljon a megadott fi\\u00F3k \\u00F6sszes sz\\u00FCks\\u00E9ges r\\u00E9szlete\r\n\r\n#YMSG, 30: error\r\nERROR=Hiba\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Adjon meg az adatokhoz \\u00E9rv\\u00E9nyes \\u00E9rt\\u00E9keket\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=A z\\u00E1r\\u00F3 d\\u00E1tum nem lehet kor\\u00E1bbi a kezd\\u0151 d\\u00E1tumn\\u00E1l\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Le\\u00EDr\\u00E1s hozz\\u00E1ad\\u00E1sa (maximum 40 karakter)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Jelenleg nem \\u00E1llnak rendelkez\\u00E9sre megjegyz\\u00E9sek\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Adjon meg \\u00E9rt\\u00E9ket az \\u00F6sszes k\\u00F6telez\\u0151 mez\\u0151h\\u00F6z\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Megjegyz\\u00E9s elmentve\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Nem siker\\u00FClt elmenteni\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=\\u00D6n felel\\u0151s {0} opportunity-\\u00E9rt {1} opportuny-b\\u0151l. Csak a saj\\u00E1t opportunty-k jelennek meg. \r\n\r\n#XFLD: account ascending\r\nACTASC=Fi\\u00F3k (n\\u00F6vekv\\u0151)\r\n\r\n#XFLD: account descending\r\nACTDESC=Fi\\u00F3k (cs\\u00F6kken\\u0151)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=St\\u00E1tus (n\\u00F6vekv\\u0151)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=St\\u00E1tus (cs\\u00F6kken\\u0151)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Z\\u00E1r\\u00F3 d\\u00E1tum (cs\\u00F6kken\\u0151)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Z\\u00E1r\\u00F3 d\\u00E1tum (n\\u00F6vekv\\u0151)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Sz\\u0171r\\u00E9s fi\\u00F3k szerint\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=P\\u00E9nznem\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=K\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Nem \\u00E9rhet\\u0151k el jelenleg opportunityk\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Keres\\u00E9s\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Sz\\u00E1mla kiv\\u00E1laszt\\u00E1sa\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=P\\u00E9nznem kiv\\u00E1laszt\\u00E1sa\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=T\\u00E1rgyal\\u00F3partner kiv\\u00E1laszt\\u00E1sa\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Rendez\\u00E9s a k\\u00F6vetkez\\u0151 szerint\\:\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Megoszt\\u00E1s JAM-ben\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Vita JAM-ben\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=P\\u00E9nznem\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Keres\\u00E9s\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Bet\\u00F6lt\\u00E9s...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Jelenleg nem \\u00E1ll rendelkez\\u00E9sre t\\u00E9tel\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=M\\u00F3dosult\\:  "{0} Ki -> Be\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=M\\u00F3dosult\\: "{0} Be -> Ki\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=M\\u00F3dosult\\: {0} "Nincs \\u00E9rt\\u00E9k" -> erre\\:  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=M\\u00F3dosult\\: "{0}" err\\u0151l "{1}" erre "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Opportunity el van mentve, de hib\\u00E1kkal\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Jelenleg nem \\u00E1llnak rendelkez\\u00E9sre t\\u00E1rgyal\\u00F3partnerek\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Csak olyan t\\u00E1rgyal\\u00F3partnerek n\\u00E9vjegyk\\u00E1rty\\u00E1it l\\u00E1thatja, akik hozz\\u00E1 vannak rendelve ehhez a fi\\u00F3khoz\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=V\\u00E1rt forgalom a k\\u00F6vetkez\\u0151ben\\: {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Term\\u00E9k/kateg\\u00F3ria\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Term\\u00E9kkateg\\u00F3ria\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Figyelmeztet\\u00E9s\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Elv\\u00E9sz minden el nem mentett m\\u00F3dos\\u00EDt\\u00E1s. Val\\u00F3ban szeretn\\u00E9 folytatni?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Folytat\\u00E1s\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=K\\u00F6vetkez\\u0151 tranzakci\\u00F3 mentve\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Tal\\u00E1lkoz\\u00F3\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=K\\u00F6vet\\u0151 m\\u0171velet\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Feladat\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Opportunity\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Alkalmazottak\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Illet\\u00E9kes dolgoz\\u00F3\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Dolgoz\\u00F3k keres\\u00E9se\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=R\\u00E9sztvev\\u0151k ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Nem tal\\u00E1lhat\\u00F3 r\\u00E9sztvev\\u0151\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=R\\u00E9sztvev\\u0151k keres\\u00E9se\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=R\\u00E9sztvev\\u0151k hozz\\u00E1ad\\u00E1sa\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Legal\\u00E1bb {0} r\\u00E9sztvev\\u0151t ki kell v\\u00E1lasztani enn\\u00E9l a r\\u00E9sztvev\\u0151t\\u00EDpusn\\u00E1l\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Legal\\u00E1bb {0} r\\u00E9sztvev\\u0151t ki kell v\\u00E1lasztani enn\\u00E9l a r\\u00E9sztvev\\u0151t\\u00EDpusn\\u00E1l\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Maximum {0} r\\u00E9sztvev\\u0151t lehet kiv\\u00E1lasztani enn\\u00E9l a r\\u00E9sztvev\\u0151t\\u00EDpusn\\u00E1l\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Maximum {0} r\\u00E9sztvev\\u0151t lehet kiv\\u00E1lasztani enn\\u00E9l a r\\u00E9sztvev\\u0151t\\u00EDpusn\\u00E1l\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=\\u00C9rv\\u00E9nytelen p\\u00E9nznemet adott meg. Elmenti ezt az adatot?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Nem adott meg p\\u00E9nznemet. Elmenti ezt az adatot?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Legal\\u00E1bb {0} r\\u00E9sztvev\\u0151 sz\\u00FCks\\u00E9ges ehhez a r\\u00E9sztvev\\u0151t\\u00EDpushoz\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Legal\\u00E1bb {0} r\\u00E9sztvev\\u0151 sz\\u00FCks\\u00E9ges ehhez a r\\u00E9sztvev\\u0151t\\u00EDpushoz\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} m\\u00E1r hozz\\u00E1 van adva r\\u00E9sztvev\\u0151k\\u00E9nt r\\u00E9sztvev\\u0151t\\u00EDpussal {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=T\\u00EDpus\r\n',
	"cus/crm/opportunity/i18n/i18n_it.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Opportunit\\u00E0 ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Crea\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Visualizza impostazioni\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Impostazioni\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Numero massimo di opportunit\\u00E0 da visualizzare\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Si noti che un numero elevato di opportunit\\u00E0 incide negativamente sulla performance dell\'applicazione.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Opportunit\\u00E0\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Elabora opportunit\\u00E0\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Opportunit\\u00E0\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Informazioni\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Prodotti\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Note\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Allegati\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Concorrenti\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Partecipanti\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Cliente\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID opportunit\\u00E0\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Data di inizio\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Data di chiusura\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Possibilit\\u00E0 di riuscita\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Stato\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Livello vendite\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorit\\u00E0\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Prodotto\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Quantit\\u00E0\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Valore netto\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Valore totale previsto\r\n\r\n#XBUT: edit button text\r\nEDIT=Elabora\r\n\r\n#XBUT: Save button text\r\nSAVE=Salva\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Annulla\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Aggiungi altri prodotti\r\n\r\n#XBUT: Add Products button text\r\nADD=Aggiungi\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Aggiungi contatto\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Opportunit\\u00E0 salvata\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Opportunit\\u00E0 non salvata\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logo cliente\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Nome\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Contatto principale\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Fatturato previsto\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Registro modifiche\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Visualizza\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Cestino prodotti\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Fatturato previsto (ponderato)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Rilevanza previsione\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=in\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Da\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=A\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Attivato\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Disattivato\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Modificato\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Contatto\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Cerca\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Catalogo prodotti\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Cestino prodotti vuoto\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Funzione partner\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Seleziona tipo di transazione\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Classifica\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Opportunit\\u00E0 salvata\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Nessun concorrente attualmente disponibile\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Nessun prodotto attualmente disponibile\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Nessun partecipante (parte interessata) attualmente disponibile\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Modifiche non trovate\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Puoi visualizzare solo biglietti da visita di clienti o contatti\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Non esistono tipi successivi\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=L\'attuale opportunit\\u00E0 presenta degli errori oppure nel customizing non sono aggiornati tipi di transazione successivi\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Per vedere un biglietto da visita, devono esistere dei dettagli per il cliente indicato\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Per vedere un biglietto da visita, devono esistere tutti i necessari dettagli per il cliente indicato\r\n\r\n#YMSG, 30: error\r\nERROR=Errore\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Inserisci valori validi per le date\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=La data di chiusura non deve precedere la data di inizio\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Aggiungi descrizione (massimo 40 caratteri)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Nessuna nota attualmente disponibile\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Inserisci valori in tutti i campi obbligatori\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Nota salvata\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Nota non salvata\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Sei responsabile di {0} opportunit\\u00E0 su un totale di {1}. Vengono visualizzate solo le tue opportunit\\u00E0. \r\n\r\n#XFLD: account ascending\r\nACTASC=Cliente (crescente)\r\n\r\n#XFLD: account descending\r\nACTDESC=Cliente (decrescente)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Stato (crescente)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Stato (decrescente)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Data di chiusura (crescente)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Data di chiusura (decrescente)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrato in base al cliente\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Divisa\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=MLL\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=MLL\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=MLD\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Nessuna opportunit\\u00E0 attualmente disponibile\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Cerca\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Seleziona cliente\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Seleziona divisa\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Seleziona contatto\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Classifica in base a\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Condividi in JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Discuti in JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Divisa\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Cerca\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=In caricamento...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Nessuna posizione attualmente disponibile\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Modifica\\:  "{0}" da "Disattivato" ad "Attivato"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Modifica\\: "{0}" da "Attivato" a "Disattivato"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Modifica\\: {0} da "Nessun valore" a  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Modifica\\: "{0}" da "{1}" a "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Opportunit\\u00E0 salvata con errori\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Nessun contatto attualmente disponibile\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Puoi visualizzare solo biglietti da visita di contatti attribuiti a questo cliente\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Fatturato previsto in {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Prodotto/Categoria\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Categoria di prodotto\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Avvertimento\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Le modifiche non salvate andranno perse. Proseguire ugualmente?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Continua\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Opportunit\\u00E0 successiva salvata\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Appuntamento\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Task successivo\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Task\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Opportunit\\u00E0\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Dipendenti\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Dipendente responsabile\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Cerca dipendenti\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Partecipanti ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Nessun partecipante trovato\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Cerca partecipanti\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Aggiungi partecipanti\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=\\u00C8 necessario selezionare un minimo di {0} partecipanti per questo tipo di partecipante\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=\\u00C8 necessario selezionare un minimo di {0} partecipanti per questo tipo di partecipante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=\\u00C8 possibile selezionare un massimo di {0} partecipanti per questo tipo di partecipante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=\\u00C8 possibile selezionare un massimo di {0} partecipanti per questo tipo di partecipante\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=\\u00C8 stata inserita una divisa non valida. Salvare questi dati?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=La divisa non \\u00E8 stata fornita. Salvare questi dati?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Per questo tipo di partecipante sono richiesti almeno {0} partecipanti\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Per questo tipo di partecipante sono richiesti almeno {0} partecipanti\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} \\u00E8 stato gi\\u00E0 aggiunto come partecipante con il tipo di partecipante {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Tipo\r\n',
	"cus/crm/opportunity/i18n/i18n_iw.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA ({0})\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=\\u05E6\\u05D5\\u05E8\n\n#XBUT : show result\nSHOW_SETTING=\\u05D4\\u05E6\\u05D2 \\u05D4\\u05D2\\u05D3\\u05E8\\u05D5\\u05EA\n\n#XBUT : list setting button text\nLIST_SETTING=\\u05D4\\u05D2\\u05D3\\u05E8\\u05D5\\u05EA\n\n#XTXT : Show instruction\nSHOW_INS=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05DE\\u05E7\\u05E1\\u05D9\\u05DE\\u05DC\\u05D9 \\u05E9\\u05DC \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA \\u05DC\\u05D4\\u05E6\\u05D2\\u05D4\\:\n\n#XTXT : Show noteS\nSHOW_INS_NOTES=*\\u05E9\\u05D9\\u05DD \\u05DC\\u05D1 \\u05DB\\u05D9 \\u05D0\\u05DD \\u05D9\\u05E9 \\u05DE\\u05E1\\u05E4\\u05E8 \\u05E8\\u05D1 \\u05E9\\u05DC \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA, \\u05D1\\u05D9\\u05E6\\u05D5\\u05E2\\u05D9 \\u05D4\\u05D9\\u05D9\\u05E9\\u05D5\\u05DD \\u05D9\\u05D5\\u05E9\\u05E4\\u05E2\\u05D5.\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=\\u05E2\\u05E8\\u05D5\\u05DA \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA\n\n#XTIT: Application title\nSHELL_TITLE=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA\n\n#XTIT: this is the title for the Info Tab\nINFO=\\u05DE\\u05D9\\u05D3\\u05E2\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=\\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD\n\n#XTIT: this is the title for the Notes Tab\nNOTES=\\u05D4\\u05E2\\u05E8\\u05D5\\u05EA\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=\\u05E7\\u05D1\\u05E6\\u05D9\\u05DD \\u05DE\\u05E6\\u05D5\\u05E8\\u05E4\\u05D9\\u05DD\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=\\u05DE\\u05EA\\u05D7\\u05E8\\u05D9\\u05DD\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=\\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD\n\n#XFLD, 30: Field Account on List\nACCOUNT=\\u05DC\\u05E7\\u05D5\\u05D7\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=\\u05D6\\u05D9\\u05D4\\u05D5\\u05D9 \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05E1\\u05D2\\u05D9\\u05E8\\u05D4\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=\\u05E1\\u05D9\\u05DB\\u05D5\\u05D9 \\u05D4\\u05E6\\u05DC\\u05D7\\u05D4\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=\\u05E9\\u05DC\\u05D1 \\u05D1\\u05DE\\u05DB\\u05D9\\u05E8\\u05D5\\u05EA\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=\\u05E2\\u05D3\\u05D9\\u05E4\\u05D5\\u05EA\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=\\u05DE\\u05D5\\u05E6\\u05E8\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=\\u05DB\\u05DE\\u05D5\\u05EA\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=\\u05E2\\u05E8\\u05DA \\u05E0\\u05D8\\u05D5\n\n#XFLD, 30: Field "Exp.Total Value" on Product tab\nVOLUME=\\u05E2\\u05E8\\u05DA \\u05DB\\u05D5\\u05DC\\u05DC \\u05E6\\u05E4\\u05D5\\u05D9\n\n#XBUT: edit button text\nEDIT=\\u05E2\\u05E8\\u05D5\\u05DA\n\n#XBUT: Save button text\nSAVE=\\u05E9\\u05DE\\u05D5\\u05E8\n\n#XBUT: Cancel button text\nCANCEL=\\u05D1\\u05D8\\u05DC\n\n#XBUT: Add More Products button text\nADD_PROD=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05E2\\u05D5\\u05D3 \\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD\n\n#XBUT: Add Products button text\nADD=\\u05D4\\u05D5\\u05E1\\u05E3\n\n#XBUT: Add Contacts button text\nADDCONTACT=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D0\\u05D9\\u05E9 \\u05E7\\u05E9\\u05E8\n\n#YMSG: lead saved\nOPP_SAVED=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4\n\n#YMSG: lead could not be saved\nSAVE_FAILED=\\u05DC\\u05D0 \\u05E0\\u05D9\\u05EA\\u05DF \\u05D4\\u05D9\\u05D4 \\u05DC\\u05E9\\u05DE\\u05D5\\u05E8 \\u05D0\\u05EA \\u05D4\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA\n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=\\u05E1\\u05DE\\u05DC \\u05DE\\u05E1\\u05D7\\u05E8\\u05D9 \\u05E9\\u05DC \\u05DC\\u05E7\\u05D5\\u05D7\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=\\u05E9\\u05DD\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=\\u05D0\\u05D9\\u05E9 \\u05E7\\u05E9\\u05E8 \\u05E8\\u05D0\\u05E9\\u05D9\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=\\u05E0\\u05E4\\u05D7 \\u05DE\\u05DB\\u05D9\\u05E8\\u05D5\\u05EA \\u05E6\\u05E4\\u05D5\\u05D9\n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=\\u05D9\\u05D5\\u05DE\\u05DF \\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=\\u05D4\\u05E6\\u05D2\n\n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=\\u05E1\\u05DC \\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=\\u05E0\\u05E4\\u05D7 \\u05DE\\u05DB\\u05D9\\u05E8\\u05D5\\u05EA \\u05E6\\u05E4\\u05D5\\u05D9 (\\u05DE\\u05E9\\u05D5\\u05E7\\u05DC\\u05DC)\n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=\\u05E8\\u05DC\\u05D5\\u05D5\\u05E0\\u05D8\\u05D9\\u05D5\\u05EA \\u05E9\\u05DC \\u05EA\\u05D7\\u05D6\\u05D9\\u05EA\n\n#XFLD, 30: Field "In" on Detail Header\nIN=\\u05D1-\n\n#XFLD, 30: Field "From" on View tab\nFROM=\\u05DE-\n\n#XFLD, 30: Field "To" on View tab\nTO=\\u05E2\\u05D3\n\n#XFLD, 30: Field "ON" on View tab\nON=\\u05E4\\u05D5\\u05E2\\u05DC\n\n#XFLD, 30: Field "OFF" on View tab\nOFF=\\u05DB\\u05D1\\u05D5\\u05D9\n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=\\u05E9\\u05D5\\u05E0\\u05D4\n\n#XTIT: contact title for contact F4\nCONTACT=\\u05D0\\u05D9\\u05E9 \\u05E7\\u05E9\\u05E8\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=\\u05D7\\u05E4\\u05E9\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=\\u05E7\\u05D8\\u05DC\\u05D5\\u05D2 \\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=\\u05E1\\u05DC \\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD \\u05E8\\u05D9\\u05E7\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=\\u05E4\\u05D5\\u05E0\\u05E7\\u05E6\\u05D9\\u05D9\\u05EA \\u05E9\\u05D5\\u05EA\\u05E3\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=\\u05D1\\u05D7\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05EA\\u05E0\\u05D5\\u05E2\\u05D4\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=\\u05DE\\u05D9\\u05D9\\u05DF\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4\n\n#XBUT: OK button text\nOK=OK\n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05DE\\u05EA\\u05D7\\u05E8\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n#YMSG, 60:  no products\nNOPRODUCTS=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05DE\\u05D5\\u05E6\\u05E8\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n#YMSG, 30:  no salesteam\nNOPARTIES=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD (\\u05D2\\u05D5\\u05E8\\u05DE\\u05D9\\u05DD \\u05DE\\u05E2\\u05D5\\u05E8\\u05D1\\u05D9\\u05DD) \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=\\u05DC\\u05D0 \\u05E0\\u05DE\\u05E6\\u05D0\\u05D5 \\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT=\\u05D1\\u05D0\\u05E4\\u05E9\\u05E8\\u05D5\\u05EA\\u05DA \\u05E8\\u05E7 \\u05DC\\u05D4\\u05E6\\u05D9\\u05D2 \\u05DB\\u05E8\\u05D8\\u05D9\\u05E1\\u05D9 \\u05D1\\u05D9\\u05E7\\u05D5\\u05E8 \\u05E9\\u05DC \\u05DC\\u05E7\\u05D5\\u05D7\\u05D5\\u05EA \\u05D0\\u05D5 \\u05D0\\u05E0\\u05E9\\u05D9 \\u05E7\\u05E9\\u05E8\n\n#YMSG: no transaction types  present\nFOLLOWUPERROR=\\u05DC\\u05D0 \\u05E7\\u05D9\\u05D9\\u05DE\\u05D9\\u05DD \\u05E1\\u05D5\\u05D2\\u05D9 \\u05DE\\u05E2\\u05E7\\u05D1\n\n#YMSG: detailed error message shown when no transaction types are present\nFOLLOWUPDETAILERROR=\\u05D9\\u05D9\\u05EA\\u05DB\\u05DF \\u05DB\\u05D9 \\u05D1\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA \\u05D4\\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\\u05EA \\u05E7\\u05D9\\u05D9\\u05DE\\u05D5\\u05EA \\u05E9\\u05D2\\u05D9\\u05D0\\u05D5\\u05EA \\u05D0\\u05D5 \\u05DB\\u05D9 \\u05D0\\u05D9\\u05DF \\u05E1\\u05D5\\u05D2\\u05D9 \\u05EA\\u05E0\\u05D5\\u05E2\\u05D5\\u05EA \\u05DE\\u05E2\\u05E7\\u05D1 \\u05E9\\u05EA\\u05D5\\u05D7\\u05D6\\u05E7\\u05D5 \\u05D1\\u05D4\\u05EA\\u05D0\\u05DE\\u05D4 \\u05D0\\u05D9\\u05E9\\u05D9\\u05EA\n\n#YMSG: account is null\nACCOUNT_IS_NULL=\\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05E6\\u05D9\\u05D2 \\u05DB\\u05E8\\u05D8\\u05D9\\u05E1 \\u05D1\\u05D9\\u05E7\\u05D5\\u05E8, \\u05D7\\u05D9\\u05D9\\u05D1\\u05D9\\u05DD \\u05DC\\u05D4\\u05D9\\u05D5\\u05EA \\u05E4\\u05E8\\u05D8\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05D4\\u05DC\\u05E7\\u05D5\\u05D7 \\u05E9\\u05E6\\u05D5\\u05D9\\u05DF\n\n#YMSG: some info missing\nINFO_MISSING=\\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05E6\\u05D9\\u05D2 \\u05DB\\u05E8\\u05D8\\u05D9\\u05E1 \\u05D1\\u05D9\\u05E7\\u05D5\\u05E8, \\u05DB\\u05DC \\u05D4\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD \\u05D4\\u05D3\\u05E8\\u05D5\\u05E9\\u05D9\\u05DD \\u05D7\\u05D9\\u05D9\\u05D1\\u05D9\\u05DD \\u05DC\\u05D4\\u05D9\\u05D5\\u05EA \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05D4\\u05DC\\u05E7\\u05D5\\u05D7 \\u05E9\\u05E6\\u05D5\\u05D9\\u05DF\n\n#YMSG, 30: error\nERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4\n\n#YMSG: junk value entered for dates\nJUNK_DATE=\\u05D4\\u05D6\\u05DF \\u05E2\\u05E8\\u05DB\\u05D9\\u05DD \\u05D7\\u05D5\\u05E7\\u05D9\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05EA\\u05D0\\u05E8\\u05D9\\u05DB\\u05D9\\u05DD\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05E1\\u05D2\\u05D9\\u05E8\\u05D4 \\u05DC\\u05D0 \\u05D9\\u05DB\\u05D5\\u05DC \\u05DC\\u05D7\\u05D5\\u05DC \\u05DC\\u05E4\\u05E0\\u05D9 \\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05D4\\u05D4\\u05EA\\u05D7\\u05DC\\u05D4\n\n#YMSG, 30:  Description\nMAX_CHARS=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05EA\\u05D9\\u05D0\\u05D5\\u05E8 (\\u05DE\\u05E7\\u05E1\\u05D9\\u05DE\\u05D5\\u05DD 40 \\u05EA\\u05D5\\u05D5\\u05D9\\u05DD)\n\n#YMSG, 30:  no notes\nNONOTES=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05D4\\u05E2\\u05E8\\u05D5\\u05EA \\u05D6\\u05DE\\u05D9\\u05E0\\u05D5\\u05EA\n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=\\u05D4\\u05D6\\u05DF \\u05E2\\u05E8\\u05DB\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05DB\\u05DC \\u05E9\\u05D3\\u05D5\\u05EA \\u05D4\\u05D7\\u05D5\\u05D1\\u05D4\n\n#YMSG, 30: save note\nNOTE_SUCCESS=\\u05D4\\u05E2\\u05E8\\u05D4 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=\\u05DC\\u05D0 \\u05E0\\u05D9\\u05EA\\u05DF \\u05D4\\u05D9\\u05D4 \\u05DC\\u05E9\\u05DE\\u05D5\\u05E8 \\u05D4\\u05E2\\u05E8\\u05D4\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=\\u05D0\\u05EA\\u05D4 \\u05D0\\u05D7\\u05E8\\u05D0\\u05D9 \\u05DC-{0} \\u05DE\\u05EA\\u05D5\\u05DA {1} \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA.\\u05E8\\u05E7 \\u05D4\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA \\u05E9\\u05DC\\u05DA \\u05DE\\u05D5\\u05E6\\u05D2\\u05D5\\u05EA. \n\n#XFLD: account ascending\nACTASC=\\u05DC\\u05E7\\u05D5\\u05D7 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05E2\\u05D5\\u05DC\\u05D4)\n\n#XFLD: account descending\nACTDESC=\\u05DC\\u05E7\\u05D5\\u05D7 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05D9\\u05D5\\u05E8\\u05D3)\n\n#XFLD: Status ascending\nSTATASC=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05E2\\u05D5\\u05DC\\u05D4)\n\n#XFLD: Status descending\nSTATDESC=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05D9\\u05D5\\u05E8\\u05D3)\n\n#XFLD: Closing Date ascending\nCLSDATEASC=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05E1\\u05D2\\u05D9\\u05E8\\u05D4 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05E2\\u05D5\\u05DC\\u05D4)\n\n#XFLD: Closing Date descending\nCLSDATEDESC=\\u05EA\\u05D0\\u05E8\\u05D9\\u05DA \\u05E1\\u05D2\\u05D9\\u05E8\\u05D4 (\\u05D1\\u05E1\\u05D3\\u05E8 \\u05D9\\u05D5\\u05E8\\u05D3)\n\n#YMSG, 50: text in Dialogbox\nFILTER=\\u05E1\\u05D5\\u05E0\\u05DF \\u05DC\\u05E4\\u05D9 \\u05DC\\u05E7\\u05D5\\u05D7\\:\n\n#XTIT: title for currency dialog box\nCURRENCY=\\u05DE\\u05D8\\u05D1\\u05E2\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=K\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=M\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=B\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05D9\\u05D5\\u05EA \\u05D6\\u05DE\\u05D9\\u05E0\\u05D5\\u05EA\n\n#YMSG: Place holder message\nSEARCH=\\u05D7\\u05E4\\u05E9\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=\\u05D1\\u05D7\\u05E8 \\u05DC\\u05E7\\u05D5\\u05D7\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=\\u05D1\\u05D7\\u05E8 \\u05DE\\u05D8\\u05D1\\u05E2\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=\\u05D1\\u05D7\\u05E8 \\u05D0\\u05D9\\u05E9 \\u05E7\\u05E9\\u05E8\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID={0} {1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY={0} {1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=\\u05DE\\u05D9\\u05D9\\u05DF \\u05DC\\u05E4\\u05D9\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=\\u05E9\\u05EA\\u05E3 \\u05D1-JAM\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=\\u05E7\\u05D9\\u05D9\\u05DD \\u05D3\\u05D9\\u05D5\\u05DF \\u05D1-JAM\n\n#XFLD: Currency label\nLBL_CURRENCY=\\u05DE\\u05D8\\u05D1\\u05E2\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=\\u05D7\\u05E4\\u05E9\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=\\u05D8\\u05D5\\u05E2\\u05DF...\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05E4\\u05E8\\u05D9\\u05D8\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=%\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=\\u05D4\\u05E9\\u05EA\\u05E0\\u05D4\\:  "{0}" \\u05DE\'\'\\u05DB\\u05D1\\u05D5\\u05D9\'\' \\u05DC\'\'\\u05E4\\u05D5\\u05E2\\u05DC\'\'\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=\\u05D4\\u05E9\\u05EA\\u05E0\\u05D4\\: "{0}" \\u05DE\'\'\\u05E4\\u05D5\\u05E2\\u05DC\'\' \\u05DC\'\'\\u05DB\\u05D1\\u05D5\\u05D9\'\'\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=\\u05D4\\u05E9\\u05EA\\u05E0\\u05D4\\: {0} \\u05DE\'\'\\u05DC\\u05DC\\u05D0 \\u05E2\\u05E8\\u05DA\'\' \\u05DC-  {1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=\\u05D4\\u05E9\\u05EA\\u05E0\\u05D4\\: "{0}" \\u05DE"{1}" \\u05DC"{2}"\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=\\u05D4\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4 \\u05E2\\u05DD \\u05E9\\u05D2\\u05D9\\u05D0\\u05D5\\u05EA\n\n#XFLD,20: No contacts\nNO_CONTACTS=\\u05D0\\u05D9\\u05DF \\u05DB\\u05E8\\u05D2\\u05E2 \\u05D0\\u05E0\\u05E9\\u05D9 \\u05E7\\u05E9\\u05E8 \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT=\\u05D1\\u05D0\\u05E4\\u05E9\\u05E8\\u05D5\\u05EA\\u05DA \\u05E8\\u05E7 \\u05DC\\u05D4\\u05E6\\u05D9\\u05D2 \\u05DB\\u05E8\\u05D8\\u05D9\\u05E1\\u05D9 \\u05D1\\u05D9\\u05E7\\u05D5\\u05E8 \\u05E9\\u05DC \\u05D0\\u05E0\\u05E9\\u05D9 \\u05E7\\u05E9\\u05E8 \\u05E9\\u05D4\\u05D5\\u05E7\\u05E6\\u05D5 \\u05DC\\u05DC\\u05E7\\u05D5\\u05D7 \\u05D6\\u05D4\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=\\u05E0\\u05E4\\u05D7 \\u05DE\\u05DB\\u05D9\\u05E8\\u05D5\\u05EA \\u05E6\\u05E4\\u05D5\\u05D9 \\u05D1-{0}\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=\\u05DE\\u05D5\\u05E6\\u05E8/\\u05E7\\u05D8\\u05D2\\u05D5\\u05E8\\u05D9\\u05D4\n\n#XTIT: Product Category\nCATEGORY=\\u05E7\\u05D8\\u05D2\\u05D5\\u05E8\\u05D9\\u05D9\\u05EA \\u05DE\\u05D5\\u05E6\\u05E8\n\n#XTIT: Warning title for data loss pop-up\nWARNING=\\u05D0\\u05D6\\u05D4\\u05E8\\u05D4\n\n#YMSG: data loss message\nDATA_LOSS=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D0\\u05D1\\u05D3\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D0\\u05EA\\u05D4 \\u05D1\\u05D8\\u05D5\\u05D7 \\u05E9\\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\n\n#XBUT: continue buttonn\nCONTINUE=\\u05D4\\u05DE\\u05E9\\u05DA\n\n#YMSG: successful followup message in message toast\nfollowupsuccessful=\\u05E0\\u05E9\\u05DE\\u05E8\\u05D4 \\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA \\u05DE\\u05E2\\u05E7\\u05D1\n\n#XBUT: create appointment\nCREATE_APPOINTMENT=\\u05E4\\u05D2\\u05D9\\u05E9\\u05D4\n\n#XBUT: create appointment\nFOLLOW_UP=\\u05DE\\u05E2\\u05E7\\u05D1\n\n#XBUT: create task\nCREATE_TASK=\\u05DE\\u05E9\\u05D9\\u05DE\\u05D4\n\n#XBUT: create opportunity\nCREATE_OPPORTUNITY=\\u05D4\\u05D6\\u05D3\\u05DE\\u05E0\\u05D5\\u05EA\n\n#XTIT \nEMPLOYEE_TITLE=\\u05E2\\u05D5\\u05D1\\u05D3\\u05D9\\u05DD\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u05E2\\u05D5\\u05D1\\u05D3 \\u05D0\\u05D7\\u05E8\\u05D0\\u05D9\n\n#XACT\nSEARCH_EMPLOYEE=\\u05D7\\u05E4\\u05E9 \\u05D0\\u05D7\\u05E8 \\u05E2\\u05D5\\u05D1\\u05D3\\u05D9\\u05DD\n\n#XTIT: sales team \nPARTICIPANTS=\\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD ({0})\n\n#YMSG: no participants\nNO_PARTICIPANTS=\\u05DC\\u05D0 \\u05E0\\u05DE\\u05E6\\u05D0\\u05D5 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=\\u05D7\\u05E4\\u05E9 \\u05D0\\u05D7\\u05E8 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD\n\n#XTIT: select participant\nADD_PARTICIPANTS=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=\\u05E2\\u05DC\\u05D9\\u05DA \\u05DC\\u05D1\\u05D7\\u05D5\\u05E8 \\u05DE\\u05D9\\u05E0\\u05D9\\u05DE\\u05D5\\u05DD {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05DE\\u05E9 \\u05D6\\u05D4\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS_1=\\u05E2\\u05DC\\u05D9\\u05DA \\u05DC\\u05D1\\u05D7\\u05D5\\u05E8 \\u05DE\\u05D9\\u05E0\\u05D9\\u05DE\\u05D5\\u05DD {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05DE\\u05E9 \\u05D6\\u05D4\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=\\u05D1\\u05D0\\u05E4\\u05E9\\u05E8\\u05D5\\u05EA\\u05DA \\u05DC\\u05D1\\u05D7\\u05D5\\u05E8 \\u05DE\\u05E7\\u05E1\\u05D9\\u05DE\\u05D5\\u05DD {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05DE\\u05E9 \\u05D6\\u05D4\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS_1=\\u05D1\\u05D0\\u05E4\\u05E9\\u05E8\\u05D5\\u05EA\\u05DA \\u05DC\\u05D1\\u05D7\\u05D5\\u05E8 \\u05DE\\u05E7\\u05E1\\u05D9\\u05DE\\u05D5\\u05DD {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05DE\\u05E9 \\u05D6\\u05D4\n\n#YMSG: invalid currency message\nINVALID_CURRENCY=\\u05D4\\u05D6\\u05E0\\u05EA \\u05DE\\u05D8\\u05D1\\u05E2 \\u05DC\\u05D0 \\u05D7\\u05D5\\u05E7\\u05D9. \\u05D4\\u05D0\\u05DD \\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05E9\\u05DE\\u05D5\\u05E8 \\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05D0\\u05DC\\u05D4?\n\n#YMSG: null currency message\nNULL_CURRENCY=\\u05DC\\u05D0 \\u05E1\\u05D9\\u05E4\\u05E7\\u05EA \\u05DE\\u05D8\\u05D1\\u05E2. \\u05D4\\u05D0\\u05DD \\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05E9\\u05DE\\u05D5\\u05E8 \\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05D0\\u05DC\\u05D4?\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS=\\u05DC\\u05E4\\u05D7\\u05D5\\u05EA {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E0\\u05D3\\u05E8\\u05E9\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E3 \\u05D6\\u05D4\n\n#YMSG: enter further participants\nMUST_HAVE_PARTICIPANTS_1=\\u05DC\\u05E4\\u05D7\\u05D5\\u05EA {0} \\u05DE\\u05E9\\u05EA\\u05EA\\u05E4\\u05D9\\u05DD \\u05E0\\u05D3\\u05E8\\u05E9\\u05D9\\u05DD \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05EA\\u05EA\\u05E3 \\u05D6\\u05D4\n\n#YMSG:participant already exists\nPARTICIPANT_EXISTS={0} \\u05DB\\u05D1\\u05E8 \\u05E0\\u05D5\\u05E1\\u05E3 \\u05DB\\u05DE\\u05E9\\u05EA\\u05EA\\u05E3 \\u05E2\\u05DD \\u05E1\\u05D5\\u05D2 \\u05D4\\u05DE\\u05E9\\u05EA\\u05EA\\u05E3 {1}\n\n#XFLD, 30: Field Transaction Type on Info Form\nTYPE=\\u05E1\\u05D5\\u05D2\n',
	"cus/crm/opportunity/i18n/i18n_ja.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=\\u6848\\u4EF6 ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=\\u767B\\u9332\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=\\u8A2D\\u5B9A\\u8868\\u793A\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=\\u8A2D\\u5B9A\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=\\u8868\\u793A\\u3055\\u308C\\u308B\\u6848\\u4EF6\\u306E\\u6700\\u5927\\u6570\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*\\u591A\\u6570\\u306E\\u6848\\u4EF6\\u304C\\u5B58\\u5728\\u3059\\u308B\\u5834\\u5408\\u306F\\u3001\\u30A2\\u30D7\\u30EA\\u30B1\\u30FC\\u30B7\\u30E7\\u30F3\\u306E\\u30D1\\u30D5\\u30A9\\u30FC\\u30DE\\u30F3\\u30B9\\u304C\\u5F71\\u97FF\\u3092\\u53D7\\u3051\\u308B\\u53EF\\u80FD\\u6027\\u304C\\u3042\\u308B\\u3053\\u3068\\u306B\\u6CE8\\u610F\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=\\u6848\\u4EF6\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=\\u6848\\u4EF6\\u7DE8\\u96C6\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=\\u6848\\u4EF6\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=\\u60C5\\u5831\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=\\u88FD\\u54C1\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=\\u30E1\\u30E2\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=\\u6DFB\\u4ED8\\u6587\\u66F8\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=\\u7AF6\\u5408\\u4ED6\\u793E\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=\\u53C2\\u52A0\\u8005\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=\\u9867\\u5BA2\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=\\u6848\\u4EF6 ID\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=\\u958B\\u59CB\\u65E5\\u4ED8\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=\\u898B\\u8FBC\\u6210\\u7D04\\u65E5\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=\\u53D7\\u6CE8\\u898B\\u8FBC\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=\\u55B6\\u696D\\u30D5\\u30A7\\u30FC\\u30BA\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=\\u512A\\u5148\\u5EA6\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=\\u88FD\\u54C1\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=\\u6570\\u91CF\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=\\u6B63\\u5473\\u984D\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=\\u898B\\u8FBC\\u5408\\u8A08\\u984D\r\n\r\n#XBUT: edit button text\r\nEDIT=\\u7DE8\\u96C6\r\n\r\n#XBUT: Save button text\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=\\u4E2D\\u6B62\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=\\u88FD\\u54C1\\u3092\\u8FFD\\u52A0\r\n\r\n#XBUT: Add Products button text\r\nADD=\\u8FFD\\u52A0\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u8FFD\\u52A0\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=\\u6848\\u4EF6\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=\\u6848\\u4EF6\\u3092\\u4FDD\\u5B58\\u3067\\u304D\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=\\u9867\\u5BA2\\u30ED\\u30B4\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=\\u6C0F\\u540D\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=\\u4E3B\\u8981\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=\\u898B\\u8FBC\\u8CA9\\u58F2\\u984D\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=\\u5909\\u66F4\\u30ED\\u30B0\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=\\u30D3\\u30E5\\u30FC\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=\\u88FD\\u54C1\\u30D0\\u30B9\\u30B1\\u30C3\\u30C8\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=\\u898B\\u8FBC\\u8CA9\\u58F2\\u984D (\\u52A0\\u91CD)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=\\u4E88\\u6E2C\\u95A2\\u9023\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=/\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=\\u958B\\u59CB\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=\\u7D42\\u4E86\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=\\u30AA\\u30F3\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=\\u30AA\\u30D5\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=\\u5909\\u66F4\\u6E08\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=\\u691C\\u7D22\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=\\u88FD\\u54C1\\u30AB\\u30BF\\u30ED\\u30B0\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=\\u7A7A\\u306E\\u88FD\\u54C1\\u30D0\\u30B9\\u30B1\\u30C3\\u30C8\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=\\u53D6\\u5F15\\u5148\\u6A5F\\u80FD\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=\\u30C8\\u30E9\\u30F3\\u30B6\\u30AF\\u30B7\\u30E7\\u30F3\\u30BF\\u30A4\\u30D7\\u9078\\u629E\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=\\u30BD\\u30FC\\u30C8\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=\\u6848\\u4EF6\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u7AF6\\u5408\\u4ED6\\u793E\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u88FD\\u54C1\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u53C2\\u52A0\\u8005 (\\u95A2\\u4FC2\\u8005) \\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=\\u5909\\u66F4\\u304C\\u898B\\u3064\\u304B\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=\\u9867\\u5BA2\\u307E\\u305F\\u306F\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u306E\\u540D\\u523A\\u306E\\u307F\\u8868\\u793A\\u3059\\u308B\\u3053\\u3068\\u304C\\u3067\\u304D\\u307E\\u3059\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=\\u30D5\\u30A9\\u30ED\\u30FC\\u30A2\\u30C3\\u30D7\\u30C8\\u30E9\\u30F3\\u30B6\\u30AF\\u30B7\\u30E7\\u30F3\\u30BF\\u30A4\\u30D7\\u304C\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=\\u73FE\\u5728\\u306E\\u6848\\u4EF6\\u3067\\u30A8\\u30E9\\u30FC\\u304C\\u767A\\u751F\\u3057\\u3066\\u3044\\u308B\\u304B\\u3001\\u307E\\u305F\\u306F\\u30AB\\u30B9\\u30BF\\u30DE\\u30A4\\u30B8\\u30F3\\u30B0\\u3067\\u30D5\\u30A9\\u30ED\\u30FC\\u30A2\\u30C3\\u30D7\\u30C8\\u30E9\\u30F3\\u30B6\\u30AF\\u30B7\\u30E7\\u30F3\\u30BF\\u30A4\\u30D7\\u304C\\u66F4\\u65B0\\u3055\\u308C\\u3066\\u3044\\u307E\\u305B\\u3093\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=\\u540D\\u523A\\u3092\\u8868\\u793A\\u3059\\u308B\\u306B\\u306F\\u3001\\u6307\\u5B9A\\u3057\\u305F\\u9867\\u5BA2\\u306B\\u3064\\u3044\\u3066\\u8A73\\u7D30\\u304C\\u767B\\u9332\\u3055\\u308C\\u3066\\u3044\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=\\u540D\\u523A\\u3092\\u8868\\u793A\\u3059\\u308B\\u306B\\u306F\\u3001\\u6307\\u5B9A\\u3057\\u305F\\u9867\\u5BA2\\u306B\\u3064\\u3044\\u3066\\u5FC5\\u8981\\u306A\\u8A73\\u7D30\\u304C\\u3059\\u3079\\u3066\\u767B\\u9332\\u3055\\u308C\\u3066\\u3044\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\r\n\r\n#YMSG, 30: error\r\nERROR=\\u30A8\\u30E9\\u30FC\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=\\u65E5\\u4ED8\\u306B\\u6709\\u52B9\\u306A\\u5024\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=\\u898B\\u8FBC\\u6210\\u7D04\\u65E5\\u3092\\u958B\\u59CB\\u65E5\\u4ED8\\u3088\\u308A\\u3082\\u524D\\u306B\\u3059\\u308B\\u3053\\u3068\\u306F\\u3067\\u304D\\u307E\\u305B\\u3093\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=\\u30C6\\u30AD\\u30B9\\u30C8\\u3092\\u8FFD\\u52A0\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044 (\\u6700\\u5927 40 \\u6587\\u5B57)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u30E1\\u30E2\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=\\u3059\\u3079\\u3066\\u306E\\u5165\\u529B\\u5FC5\\u9808\\u9805\\u76EE\\u306B\\u5024\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=\\u30E1\\u30E2\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=\\u30E1\\u30E2\\u3092\\u4FDD\\u5B58\\u3067\\u304D\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS={0}/{1} \\u6848\\u4EF6\\u306E\\u8CAC\\u4EFB\\u8005\\u306B\\u306A\\u3063\\u3066\\u3044\\u307E\\u3059\\u3002\\u81EA\\u5206\\u306E\\u6848\\u4EF6\\u306E\\u307F\\u304C\\u8868\\u793A\\u3055\\u308C\\u307E\\u3059\\u3002 \r\n\r\n#XFLD: account ascending\r\nACTASC=\\u9867\\u5BA2 (\\u6607\\u9806)\r\n\r\n#XFLD: account descending\r\nACTDESC=\\u9867\\u5BA2 (\\u964D\\u9806)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9 (\\u6607\\u9806)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9 (\\u964D\\u9806)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=\\u898B\\u8FBC\\u6210\\u7D04\\u65E5 (\\u6607\\u9806)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=\\u898B\\u8FBC\\u6210\\u7D04\\u65E5 (\\u964D\\u9806)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=\\u9867\\u5BA2\\u3067\\u30D5\\u30A3\\u30EB\\u30BF\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=\\u901A\\u8CA8\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=\\u5343\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u6848\\u4EF6\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG: Place holder message\r\nSEARCH=\\u691C\\u7D22\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=\\u9867\\u5BA2\\u9078\\u629E\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=\\u901A\\u8CA8\\u9078\\u629E\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u9078\\u629E\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=\\u30BD\\u30FC\\u30C8\\u57FA\\u6E96\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Jam \\u3067\\u5171\\u6709\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Jam \\u3067\\u8A71\\u3057\\u5408\\u3046\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=\\u901A\\u8CA8\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=\\u691C\\u7D22\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=\\u30ED\\u30FC\\u30C9\\u4E2D...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u30A2\\u30A4\\u30C6\\u30E0\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=\\u5909\\u66F4\\u6E08\\:   "{0}" ("\\u30AA\\u30D5" -> "\\u30AA\\u30F3")\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=\\u5909\\u66F4\\u6E08\\:  "{0}" ("\\u30AA\\u30F3" -> "\\u30AA\\u30D5")\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=\\u5909\\u66F4\\u6E08\\:  {0}  ("\\u5024\\u306A\\u3057" -> {1})\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=\\u5909\\u66F4\\u6E08\\:  "{0}" ( "{1}" -> "{2}")\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=\\u6848\\u4EF6\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\\u304C\\u30A8\\u30E9\\u30FC\\u304C\\u767A\\u751F\\u3057\\u307E\\u3057\\u305F\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=\\u73FE\\u5728\\u5229\\u7528\\u3067\\u304D\\u308B\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u306F\\u3042\\u308A\\u307E\\u305B\\u3093\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=\\u3053\\u306E\\u9867\\u5BA2\\u306B\\u5272\\u308A\\u5F53\\u3066\\u3089\\u308C\\u3066\\u3044\\u308B\\u53D6\\u5F15\\u5148\\u62C5\\u5F53\\u8005\\u306E\\u540D\\u523A\\u306E\\u307F\\u8868\\u793A\\u3059\\u308B\\u3053\\u3068\\u304C\\u3067\\u304D\\u307E\\u3059\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=\\u898B\\u8FBC\\u8CA9\\u58F2\\u984D ({0})\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=\\u88FD\\u54C1/\\u30AB\\u30C6\\u30B4\\u30EA\r\n\r\n#XTIT: Product Category\r\nCATEGORY=\\u88FD\\u54C1\\u30AB\\u30C6\\u30B4\\u30EA\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=\\u8B66\\u544A\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\\u306F\\u5931\\u308F\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=\\u7D9A\\u884C\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=\\u30D5\\u30A9\\u30ED\\u30FC\\u30A2\\u30C3\\u30D7\\u6848\\u4EF6\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=\\u4E88\\u5B9A\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=\\u30D5\\u30A9\\u30ED\\u30FC\\u30A2\\u30C3\\u30D7\r\n\r\n#XBUT: create task\r\nCREATE_TASK=\\u30BF\\u30B9\\u30AF\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=\\u6848\\u4EF6\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=\\u5F93\\u696D\\u54E1\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u7BA1\\u7406\\u8CAC\\u4EFB\\u8005\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=\\u5F93\\u696D\\u54E1\\u691C\\u7D22\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=\\u53C2\\u52A0\\u8005 ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=\\u53C2\\u52A0\\u8005\\u304C\\u898B\\u3064\\u304B\\u308A\\u307E\\u305B\\u3093\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=\\u53C2\\u52A0\\u8005\\u691C\\u7D22\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=\\u53C2\\u52A0\\u8005\\u8FFD\\u52A0\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u6700\\u4F4E\\u3067 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u3092\\u9078\\u629E\\u3059\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u6700\\u4F4E\\u3067 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u3092\\u9078\\u629E\\u3059\\u308B\\u5FC5\\u8981\\u304C\\u3042\\u308A\\u307E\\u3059\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u6700\\u5927\\u3067 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u3057\\u304B\\u9078\\u629E\\u3067\\u304D\\u307E\\u305B\\u3093\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u6700\\u5927\\u3067 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u3057\\u304B\\u9078\\u629E\\u3067\\u304D\\u307E\\u305B\\u3093\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=\\u7121\\u52B9\\u306A\\u901A\\u8CA8\\u3092\\u5165\\u529B\\u3057\\u307E\\u3057\\u305F\\u3002\\u3053\\u306E\\u30C7\\u30FC\\u30BF\\u3092\\u4FDD\\u5B58\\u3057\\u307E\\u3059\\u304B\\u3002\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=\\u901A\\u8CA8\\u3092\\u5165\\u529B\\u3057\\u307E\\u305B\\u3093\\u3067\\u3057\\u305F\\u3002\\u3053\\u306E\\u30C7\\u30FC\\u30BF\\u3092\\u4FDD\\u5B58\\u3057\\u307E\\u3059\\u304B\\u3002\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u5C11\\u306A\\u304F\\u3068\\u3082 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u304C\\u5FC5\\u8981\\u3067\\u3059\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=\\u3053\\u306E\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7\\u3067\\u306F\\u3001\\u5C11\\u306A\\u304F\\u3068\\u3082 {0} \\u4EBA\\u306E\\u53C2\\u52A0\\u8005\\u304C\\u5FC5\\u8981\\u3067\\u3059\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} \\u306F\\u3059\\u3067\\u306B\\u53C2\\u52A0\\u8005\\u30BF\\u30A4\\u30D7 {1} \\u306E\\u53C2\\u52A0\\u8005\\u3068\\u3057\\u3066\\u8FFD\\u52A0\\u3055\\u308C\\u3066\\u3044\\u307E\\u3059\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=\\u30BF\\u30A4\\u30D7\r\n',
	"cus/crm/opportunity/i18n/i18n_no.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Salgsmuligheter ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Opprett\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Vis innstillinger\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Innstillinger\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Maksimalt antall salgsmuligheter som vises\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*V\\u00E6r oppmerksom p\\u00E5 at et stort antall salgsmuligheter vil p\\u00E5virke applikasjonen negativt\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Salgsmulighet\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Rediger salgsmulighet\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Salgsmuligheter\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Info\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produkter\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Merknader\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Vedlegg\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Konkurrenter\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Deltakere\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Kunde\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=Salgsmulighets-ID\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Startdato\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Avslutningsdato\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Sannsynlighet for suksess\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Salgsfase\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Prioritet\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produkt\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Kvantum\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Nettoverdi\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Forventet totalverdi\r\n\r\n#XBUT: edit button text\r\nEDIT=Rediger\r\n\r\n#XBUT: Save button text\r\nSAVE=Lagre\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Avbryt\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Tilf\\u00F8y flere produkter\r\n\r\n#XBUT: Add Products button text\r\nADD=Tilf\\u00F8y\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Tilf\\u00F8y kontakt\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Salgsmulighet lagret\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Kan ikke lagre salgsmulighet\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Kundelogo\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Navn\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Hovedkontakt\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Forventet omsetning\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Endringsprotokoll\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Vis\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Produktkurv\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Forventet omsetning (vektet)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Prognoserelevans\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=i\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Fra\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=Til\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Den\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Av\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Endret\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Kontakt\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=S\\u00F8k\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Produktkatalog\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Tom produktkurv\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Partnerfunksjon\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Velg transaksjonstype\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Sorter\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Salgsmulighet lagret\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Ingen konkurrenter er tilgjengelige n\\u00E5\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Ingen produkter er tilgjengelige n\\u00E5\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Ingen deltakere (involverte parter) er tilgjengelige n\\u00E5\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Finner ingen endringer\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Du kan bare vise visittkort for kunder eller kontakter\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Det finnes ingen p\\u00E5f\\u00F8lgende transaksjonstyper\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Enten har aktuell salgsmulighet feil eller ingen p\\u00E5f\\u00F8lgende transaksjonstyper er vedlikeholdt i systemtilpasningen\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=For at du skal kunne se et visittkort, m\\u00E5 det v\\u00E6re detaljer tilgjengelig for den oppgitte kunden\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=For at du skal kunne se et visittkort, m\\u00E5 alle n\\u00F8dvendige detaljer v\\u00E6re tilgjengelige for den oppgitte kunden\r\n\r\n#YMSG, 30: error\r\nERROR=Feil\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Oppgi gyldige verdier for datoer\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Avslutningsdato kan ikke komme f\\u00F8r startdato\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Tilf\\u00F8y beskrivelse (maksimalt 40 tegn)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Ingen merknader er tilgjengelige n\\u00E5\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Oppgi verdier for alle obligatoriske felt\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Merknad lagret\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Kan ikke lagre merknad\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Du er ansvarlig for {0} av {1} salgsmuligheter. Bare dine salgsmuligheter vises. \r\n\r\n#XFLD: account ascending\r\nACTASC=Kunde (stigende)\r\n\r\n#XFLD: account descending\r\nACTDESC=Kunde (synkende)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (stigende)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (synkende)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Avslutningsdato (stigende)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Avslutningsdato (synkende)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrert etter kunde\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Valuta\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=Tusen\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=Million\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=Milliard\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Ingen salgsmuligheter er tilgjengelige n\\u00E5\r\n\r\n#YMSG: Place holder message\r\nSEARCH=S\\u00F8k\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Velg kunde\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Velg valuta\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Velg kontakt\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Sorter etter\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Del p\\u00E5 JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Diskuter p\\u00E5 JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Valuta\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=S\\u00F8k\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Laster ...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Ingen varer er tilgjengelige n\\u00E5\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Endret\\:  "{0}" fra "Av" til "P\\u00E5"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Endret\\: "{0}" fra "P\\u00E5" til "Av"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Endret\\: {0} fra "Ingen verdi" til  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Endret\\: "{0}" fra "{1}" til "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Salgsmulighet lagret med feil\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Ingen kontakter er tilgjengelige n\\u00E5\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Du kan bare vise visittkort for kontakter som er tilordnet til denne kunden\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Forventet omsetning i {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produkt/kategori\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Produktkategori\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Advarsel\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Du vil miste endringer som ikke er lagret. Er du sikker p\\u00E5 at du vil fortsette?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Fortsett\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=P\\u00E5f\\u00F8lgende salgsmulighet er lagret\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Avtale\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Oppf\\u00F8lgingsaktivitet\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Oppgave\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Salgsmulighet\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Medarbeidere\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Ansvarlig medarbeider\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=S\\u00F8k etter medarbeidere\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Deltakere ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Finner ingen deltakere\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=S\\u00F8k etter deltakere\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Tilf\\u00F8y deltakere\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Du m\\u00E5 velge minst {0} deltakere for denne deltakertypen\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Du m\\u00E5 velge minst {0} deltakere for denne deltakertypen\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Du kan bare velge maksimalt {0} deltakere for denne deltakertypen\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Du kan bare velge maksimalt {0} deltakere for denne deltakertypen\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Du har oppgitt en ugyldig valuta. Vil du lagre disse dataene?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Du har ikke oppgitt en valuta. Vil du lagre disse dataene?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Minst {0} deltakere er n\\u00F8dvendig for denne deltakertypen\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Minst {0} deltakere er n\\u00F8dvendig for denne deltakertypen\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} er allerede tilf\\u00F8yd som deltaker med deltakertype {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Type\r\n',
	"cus/crm/opportunity/i18n/i18n_pl.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Szanse ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Utw\\u00F3rz\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Wy\\u015Bwietl ustawienia\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Ustawienia\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=Maksymalna liczba szans do wy\\u015Bwietlenia\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Pami\\u0119taj, \\u017Ce du\\u017Ca liczba szans mo\\u017Ce wp\\u0142ywa\\u0107 na wydajno\\u015B\\u0107 aplikacji.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Szansa\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Edytuj szans\\u0119\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Szanse\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Informacje\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produkty\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notatki\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Za\\u0142\\u0105czniki\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Konkurenci\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Uczestnicy\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Klient\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID szansy\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Data rozpocz\\u0119cia\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Data zamkni\\u0119cia\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Szansa na sukces\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Faza sprzeda\\u017Cy\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Priorytet\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produkt\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Ilo\\u015B\\u0107\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Warto\\u015B\\u0107 netto\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Oczekiwana warto\\u015B\\u0107 ca\\u0142kowita\r\n\r\n#XBUT: edit button text\r\nEDIT=Edytuj\r\n\r\n#XBUT: Save button text\r\nSAVE=Zapisz\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Anuluj\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Dodaj wi\\u0119cej produkt\\u00F3w\r\n\r\n#XBUT: Add Products button text\r\nADD=Dodaj\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Dodaj kontakt\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Zapisano szans\\u0119\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=Nie mo\\u017Cna by\\u0142o zapisa\\u0107 szansy\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logo klienta\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Nazwa\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=G\\u0142\\u00F3wny kontakt\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Oczekiwany obr\\u00F3t\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Log zmian\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Wgl\\u0105d\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Koszyk produkt\\u00F3w\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Oczekiwana sprzeda\\u017C (wa\\u017Cona)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Istotno\\u015B\\u0107 prognozy\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=w\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Od\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=Do\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=W\\u0142\\u0105czone\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Wy\\u0142\\u0105czone\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Zmieniono\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Kontakt\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Szukaj\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Katalog produkt\\u00F3w\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Pusty koszyk produkt\\u00F3w\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Funkcja partnera\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Wybierz typ transakcji\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Sortuj\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Zapisano szans\\u0119\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Aktualnie brak dost\\u0119pnych konkurent\\u00F3w\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Aktualnie brak dost\\u0119pnych produkt\\u00F3w\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Aktualnie brak dost\\u0119pnych uczestnik\\u00F3w (partner\\u00F3w)\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Nie znaleziono zmian\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Mo\\u017Cna wy\\u015Bwietla\\u0107 tylko wizyt\\u00F3wki klient\\u00F3w lub kontakt\\u00F3w\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Brak typ\\u00F3w kolejnych transakcji\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Aktualna szansa zawiera b\\u0142\\u0119dy lub nie opracowano typ\\u00F3w kolejnych transakcji w konfiguracji\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Do wy\\u015Bwietlenia wizyt\\u00F3wki musz\\u0105 by\\u0107 dost\\u0119pne szczeg\\u00F3\\u0142y okre\\u015Blonego klienta\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Do wy\\u015Bwietlenia wizyt\\u00F3wki musz\\u0105 by\\u0107 dost\\u0119pne wszystkie wymagane szczeg\\u00F3\\u0142y okre\\u015Blonego klienta\r\n\r\n#YMSG, 30: error\r\nERROR=B\\u0142\\u0105d\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Wpisz prawid\\u0142owe warto\\u015Bci dla dat\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Data zamkni\\u0119cia nie mo\\u017Ce by\\u0107 wcze\\u015Bniejsza od daty rozpocz\\u0119cia\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Dodaj opis (maksymalnie 40 znak\\u00F3w)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Aktualnie brak dost\\u0119pnych notatek\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Wpisz warto\\u015Bci dla wszystkich p\\u00F3l obowi\\u0105zkowych\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Zapisano notatk\\u0119\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Nie mo\\u017Cna zapisa\\u0107 notatki\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Jeste\\u015B odpowiedzialny za {0} z {1} szans.Wy\\u015Bwietlane s\\u0105 tylko Twoje szanse. \r\n\r\n#XFLD: account ascending\r\nACTASC=Klient (rosn\\u0105co)\r\n\r\n#XFLD: account descending\r\nACTDESC=Klient (malej\\u0105co)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (rosn\\u0105co)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (malej\\u0105co)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Data zamkni\\u0119cia (rosn\\u0105co)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Data zamkni\\u0119cia (malej\\u0105co)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrowanie wg klienta\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Waluta\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=K\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Aktualnie brak dost\\u0119pnych szans\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Szukanie\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Wybierz klienta\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Wybierz walut\\u0119\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Wybierz kontakt\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Sortuj wed\\u0142ug\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Udost\\u0119pnij w JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Om\\u00F3w w JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Waluta\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Szukaj\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Wczytywanie...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Obecnie brak dost\\u0119pnych pozycji\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Zmieniono\\:  "{0}" z "Wy\\u0142." na "W\\u0142."\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Zmieniono\\: "{0}" z "W\\u0142." na "Wy\\u0142."\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Zmieniono\\: {0} z "Brak warto\\u015Bci" na  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Zmieniono\\: "{0}" z "{1}" na "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Szansa zapisana z b\\u0142\\u0119dami\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Aktualnie brak dost\\u0119pnych kontakt\\u00F3w\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Mo\\u017Cesz wy\\u015Bwietla\\u0107 wizyt\\u00F3wki wy\\u0142\\u0105cznie kontakt\\u00F3w przypisanych do tego klienta\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Oczekiwana sprz. w {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produkt/kategoria\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Kategoria produktu\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Ostrze\\u017Cenie\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Niezapisane zmiany zostan\\u0105 utracone. Czy na pewno chcesz kontynuowa\\u0107?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Kontynuuj\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Zapisano kolejn\\u0105 szans\\u0119\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Spotkanie\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Kolejne dzia\\u0142anie\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Zadanie\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Szansa\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Pracownicy\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Odpowiedzialny pracownik\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Szukaj pracownik\\u00F3w\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Uczestnicy ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Nie znaleziono uczestnik\\u00F3w\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Szukaj uczestnik\\u00F3w\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Dodaj uczestnik\\u00F3w\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Musisz wybra\\u0107 co najmniej {0} uczestnik\\u00F3w dla tego typu uczestnika\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Musisz wybra\\u0107 co najmniej {0} uczestnik\\u00F3w dla tego typu uczestnika\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Maksymalnie mo\\u017Cesz wybra\\u0107 tylko {0} uczestnik\\u00F3w dla tego typu uczestnika\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Maksymalnie mo\\u017Cesz wybra\\u0107 tylko {0} uczestnik\\u00F3w dla tego typu uczestnika\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Wprowadzono nieprawid\\u0142ow\\u0105 walut\\u0119. Czy zapisa\\u0107 te dane?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Nie wprowadzono waluty. Czy zapisa\\u0107 te dane?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Dla tego typu uczestnika wymaganych jest co najmniej {0} uczestnik\\u00F3w\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Dla tego typu uczestnika wymaganych jest co najmniej {0} uczestnik\\u00F3w\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} zost. ju\\u017C dod. jako uczestnik typu {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Rodzaj\r\n',
	"cus/crm/opportunity/i18n/i18n_pt.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=Oportunidades ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Criar\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Exibir configura\\u00E7\\u00F5es\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Configura\\u00E7\\u00F5es\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=N\\u00BA m\\u00E1ximo de oportunidades a exibir\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*Note que se houver um grande n\\u00FAmero de oportunidades a performance do aplicativo ser\\u00E1 afetada.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=Oportunidade\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=Editar oportunidade\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=Oportunidades\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Info\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=Produtos\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notas\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Anexos\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Concorrentes\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Participantes\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=Conta\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=ID de oportunidade\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Data de in\\u00EDcio\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Data de encerramento\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Probabilidade de sucesso\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Status\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Fase de vendas\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=Prioridade\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=Produto\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Quantidade\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Valor l\\u00EDquido\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Valor total previsto\r\n\r\n#XBUT: edit button text\r\nEDIT=Editar\r\n\r\n#XBUT: Save button text\r\nSAVE=Gravar\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=Anular\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Adc.mais prds.\r\n\r\n#XBUT: Add Products button text\r\nADD=Adicionar\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=Inserir contato\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=Oportunidade gravada\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=N\\u00E3o foi poss\\u00EDvel gravar oportunidade\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=Logotipo do cliente\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Nome\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Contato principal\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Faturamento previsto\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=Log de modifica\\u00E7\\u00F5es\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=Exibir\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=Cesta de produtos\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Fatmto.previsto (ponderado)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Relev\\u00E2ncia de previs\\u00E3o\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=em\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=De\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=At\\u00E9\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=On\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Off\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=Modificado\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=Contato\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Procurar\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=Cat\\u00E1logo de produtos\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Cesta de produtos vazia\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Fun\\u00E7\\u00E3o do parceiro\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=Selecionar tipo de transa\\u00E7\\u00E3o\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=Ordenar\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=Oportunidade gravada\r\n\r\n#XBUT: OK button text\r\nOK=OK\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=Nenhum concorrente atualmente dispon\\u00EDvel\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=Nenhum produto atualmente dispon\\u00EDvel\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Nenhum participante (partes envolvidas) atualmente dispon\\u00EDvel\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=Nenhuma modifica\\u00E7\\u00E3o\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=S\\u00F3 \\u00E9 poss\\u00EDvel exibir cart\\u00F5es de visita de contas ou contatos\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=N\\u00E3o existem tipos de atividade subsequente\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=A oportunidade atual cont\\u00E9m erros ou n\\u00E3o existem tipos de transa\\u00E7\\u00E3o de atividade subsequente atualizados no customizing\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Para exibir cart\\u00E3o de visita, detalhes da respectiva conta devem estar dispon\\u00EDveis.\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Para exibir cart\\u00E3o de visita, todos os detalhes necess\\u00E1rios da respectiva conta devem estar dispon\\u00EDveis\r\n\r\n#YMSG, 30: error\r\nERROR=Erro\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Inserir valores v\\u00E1lidos de datas\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=A data de encerramento n\\u00E3o pode ser anterior \\u00E0 data de in\\u00EDcio\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Inserir descri\\u00E7\\u00E3o (m\\u00E1ximo de 40 caracteres)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=Nenhuma nota atualmente dispon\\u00EDvel\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Preencher todos os campos obrigat\\u00F3rios\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Nota gravada\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=N\\u00E3o foi poss\\u00EDvel gravar nota\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=Voc\\u00EA \\u00E9 respons\\u00E1vel por {0} de {1} oportunidades. Apenas suas responsabilidades s\\u00E3o exibidas. \r\n\r\n#XFLD: account ascending\r\nACTASC=Conta (crescente)\r\n\r\n#XFLD: account descending\r\nACTDESC=Conta (decrescente)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Status (crescente)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Status (decrescente)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Data encerramento (crescente)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Dt.encerramento (decrescente)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=Filtrado por conta\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Moeda\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=M\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=Bil\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=Nenhuma oportunidade atualmente dispon\\u00EDvel\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Procurar\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=Selecionar conta\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Selecionar moeda\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=Selecionar contato\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=Ordenar por\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=Compartilha no JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=Discutir no JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Moeda\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Procurar\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Carregando...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=Nenhum item atualmente dispon\\u00EDvel\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=Modificado\\:  "{0}" de "Off" para "On"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=Modificado\\: "{0}" de "On" para "Off"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=Modificado\\: {0} de "Nenhum valor" para  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=Modificado\\: "{0}" de "{1}" para "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=Oportunidade gravada com erros\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=Nenhum contato atualmente dispon\\u00EDvel\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=S\\u00F3 \\u00E9 poss\\u00EDvel exibir cart\\u00F5es de visita de contatos atribu\\u00EDdos a essa conta\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Faturamento previsto em {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=Produto/categoria\r\n\r\n#XTIT: Product Category\r\nCATEGORY=Categoria de produto\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Advert\\u00EAncia\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=As modifica\\u00E7\\u00F5es n\\u00E3o gravadas se perder\\u00E3o. Continuar?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Continuar\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Oportunidade de atividade subsequente gravada\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Compromisso\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Atividade subsequente\r\n\r\n#XBUT: create task\r\nCREATE_TASK=Tarefa\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=Oportunidade\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=Funcion\\u00E1rios\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Funcion\\u00E1rio respons\\u00E1vel\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=Procurar por funcion\\u00E1rios\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Participantes ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Nenhum participante encontrado\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Procurar por participantes\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Adicionar participantes\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Voc\\u00EA deve selecionar um m\\u00EDnimo de {0} participantes para o tipo de participante\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Voc\\u00EA deve selecionar um m\\u00EDnimo de {0} participantes para esse tipo de participante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Voc\\u00EA s\\u00F3 pode selecionar um m\\u00EDnimo de {0} participantes para o tipo de participante\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Voc\\u00EA s\\u00F3 pode selecionar um m\\u00EDnimo de {0} participantes para esse tipo de participante\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Voc\\u00EA inseriu uma moeda inv\\u00E1lida. Gravar essa informa\\u00E7\\u00E3o?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Voc\\u00EA n\\u00E3o indicou uma moeda. Gravar?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=S\\u00E3o necess\\u00E1rios pelo menos {0} participantes para esse tipo de participante\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=S\\u00E3o necess\\u00E1rios pelo menos {0} participantes para esse tipo de participante\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} j\\u00E1 adicionado como participante, com o tipo de participante {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=Tipo\r\n',
	"cus/crm/opportunity/i18n/i18n_ru.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0438 ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=\\u041F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0435\\u0442\\u044C \\u043D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=\\u041C\\u0430\\u043A\\u0441\\u0438\\u043C\\u0430\\u043B\\u044C\\u043D\\u043E\\u0435 \\u0447\\u0438\\u0441\\u043B\\u043E \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0435\\u0439 \\u0434\\u043B\\u044F \\u043F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0430\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*\\u0411\\u043E\\u043B\\u044C\\u0448\\u043E\\u0435 \\u0447\\u0438\\u0441\\u043B\\u043E \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0435\\u0439 \\u0432\\u043B\\u0438\\u044F\\u0435\\u0442 \\u043D\\u0430 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0443 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0438\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=\\u0418\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u044B\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u044F\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=\\u041F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u044F\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=\\u041A\\u043E\\u043D\\u043A\\u0443\\u0440\\u0435\\u043D\\u0442\\u044B\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=\\u0423\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=\\u041A\\u043B\\u0438\\u0435\\u043D\\u0442\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=\\u0418\\u0434. \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0438\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=\\u041D\\u0430\\u0447\\u0430\\u043B\\u044C\\u043D\\u0430\\u044F \\u0434\\u0430\\u0442\\u0430\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=\\u0414\\u0430\\u0442\\u0430 \\u0437\\u0430\\u043A\\u0440\\u044B\\u0442\\u0438\\u044F\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=\\u0412\\u0435\\u0440\\u043E\\u044F\\u0442\\u043D\\u043E\\u0441\\u0442\\u044C \\u0443\\u0441\\u043F\\u0435\\u0445\\u0430\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=\\u0424\\u0430\\u0437\\u0430 \\u043F\\u0440\\u043E\\u0434\\u0430\\u0436\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=\\u041F\\u0440\\u0438\\u043E\\u0440\\u0438\\u0442\\u0435\\u0442\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=\\u0421\\u0442\\u043E\\u0438\\u043C\\u043E\\u0441\\u0442\\u044C \\u043D\\u0435\\u0442\\u0442\\u043E\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u044B\\u0439 \\u0438\\u0442\\u043E\\u0433\\u043E\\u0432\\u044B\\u0439 \\u043E\\u0431\\u043E\\u0440\\u043E\\u0442\r\n\r\n#XBUT: edit button text\r\nEDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\r\n\r\n#XBUT: Save button text\r\nSAVE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0435\\u0449\\u0435 \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u044B\r\n\r\n#XBUT: Add Products button text\r\nADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0430\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=\\u041D\\u0435 \\u0443\\u0434\\u0430\\u043B\\u043E\\u0441\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=\\u041B\\u043E\\u0433\\u043E\\u0442\\u0438\\u043F \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=\\u0418\\u043C\\u044F\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=\\u041E\\u0441\\u043D\\u043E\\u0432\\u043D\\u043E\\u0439 \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u044B\\u0439 \\u043E\\u0431\\u043E\\u0440\\u043E\\u0442\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=\\u0416\\u0443\\u0440\\u043D\\u0430\\u043B \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u0439\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=\\u041F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0435\\u0442\\u044C\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u043E\\u0432\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u044B\\u0439 \\u043E\\u0431\\u043E\\u0440\\u043E\\u0442 (\\u0432\\u0437\\u0432\\u0435\\u0448\\u0435\\u043D\\u043D\\u044B\\u0439)\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=\\u0420\\u0435\\u043B\\u0435\\u0432\\u0430\\u043D\\u0442\\u043D\\u043E\\u0441\\u0442\\u044C \\u043F\\u0440\\u043E\\u0433\\u043D\\u043E\\u0437\\u0430\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=\\u0432\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=\\u0421\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=\\u041F\\u043E\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=\\u0412\\u043A\\u043B.\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=\\u0412\\u044B\\u043A\\u043B.\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u043E\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=\\u041A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=\\u041F\\u043E\\u0438\\u0441\\u043A\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=\\u041A\\u0430\\u0442\\u0430\\u043B\\u043E\\u0433 \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u043E\\u0432\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=\\u041F\\u0443\\u0441\\u0442\\u0430\\u044F \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u043E\\u0432\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=\\u0424\\u0443\\u043D\\u043A\\u0446\\u0438\\u044F \\u043F\\u0430\\u0440\\u0442\\u043D\\u0435\\u0440\\u0430\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=\\u0412\\u044B\\u0431\\u043E\\u0440 \\u0442\\u0438\\u043F\\u0430 \\u0442\\u0440\\u0430\\u043D\\u0437\\u0430\\u043A\\u0446\\u0438\\u0438\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=\\u0421\\u043E\\u0440\\u0442\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0430\r\n\r\n#XBUT: OK button text\r\nOK=\\u041E\\u041A\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=\\u041A\\u043E\\u043D\\u043A\\u0443\\u0440\\u0435\\u043D\\u0442\\u044B \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u044B \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=\\u0423\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438 (\\u0443\\u0447\\u0430\\u0441\\u0442\\u0432\\u0443\\u044E\\u0449\\u0438\\u0435 \\u0441\\u0442\\u043E\\u0440\\u043E\\u043D\\u044B) \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F \\u043D\\u0435 \\u043D\\u0430\\u0439\\u0434\\u0435\\u043D\\u044B\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=\\u0412\\u044B \\u043C\\u043E\\u0436\\u0435\\u0442\\u0435 \\u0442\\u043E\\u043B\\u044C\\u043A\\u043E \\u043F\\u0440\\u043E\\u0441\\u043C\\u0430\\u0442\\u0440\\u0438\\u0432\\u0430\\u0442\\u044C \\u0432\\u0438\\u0437\\u0438\\u0442\\u043D\\u044B\\u0435 \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u043A\\u0438 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u043E\\u0432 \\u0438\\u043B\\u0438 \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\\u043E\\u0432\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=\\u041D\\u0435\\u0442 \\u0432\\u0438\\u0434\\u043E\\u0432 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u0443\\u044E\\u0449\\u0438\\u0445 \\u043E\\u043F\\u0435\\u0440\\u0430\\u0446\\u0438\\u0439\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0430\\u044F \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C \\u0441\\u043E\\u0434\\u0435\\u0440\\u0436\\u0438\\u0442 \\u043E\\u0448\\u0438\\u0431\\u043A\\u0438, \\u043B\\u0438\\u0431\\u043E \\u0432 \\u043F\\u043E\\u043B\\u044C\\u0437. \\u043D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0435 \\u043D\\u0435 \\u0432\\u044B\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u043E \\u0432\\u0435\\u0434\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0438\\u0434\\u043E\\u0432 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u0443\\u044E\\u0449\\u0438\\u0445 \\u043E\\u043F\\u0435\\u0440\\u0430\\u0446\\u0438\\u0439\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=\\u0414\\u043B\\u044F \\u043F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0430 \\u0432\\u0438\\u0437\\u0438\\u0442\\u043D\\u044B\\u0445 \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u0435\\u043A \\u0434\\u043B\\u044F \\u0443\\u043A\\u0430\\u0437\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430 \\u0434\\u043E\\u043B\\u0436\\u043D\\u0430 \\u0431\\u044B\\u0442\\u044C \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u0430 \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0430\\u044F \\u0438\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=\\u0414\\u043B\\u044F \\u043F\\u0440\\u043E\\u0441\\u043C\\u043E\\u0442\\u0440\\u0430 \\u0432\\u0438\\u0437\\u0438\\u0442\\u043D\\u044B\\u0445 \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u0435\\u043A \\u0434\\u043B\\u044F \\u0443\\u043A\\u0430\\u0437\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430 \\u0434\\u043E\\u043B\\u0436\\u043D\\u0430 \\u0431\\u044B\\u0442\\u044C \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u0430 \\u0432\\u0441\\u044F \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0430\\u044F \\u0438\\u043D\\u0444\\u043E\\u0440\\u043C\\u0430\\u0446\\u0438\\u044F\r\n\r\n#YMSG, 30: error\r\nERROR=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u044B\\u0435 \\u0437\\u043D\\u0430\\u0447\\u0435\\u043D\\u0438\\u044F \\u0434\\u0430\\u0442\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=\\u0414\\u0430\\u0442\\u0430 \\u0437\\u0430\\u043A\\u0440\\u044B\\u0442\\u0438\\u044F \\u043D\\u0435 \\u0434\\u043E\\u043B\\u0436\\u043D\\u0430 \\u0431\\u044B\\u0442\\u044C \\u0440\\u0430\\u043D\\u044C\\u0448\\u0435 \\u0434\\u0430\\u0442\\u044B \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u043E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435 (\\u043C\\u0430\\u043A\\u0441\\u0438\\u043C\\u0443\\u043C 40 \\u0441\\u0438\\u043C\\u0432\\u043E\\u043B\\u043E\\u0432)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u044F \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0437\\u043D\\u0430\\u0447\\u0435\\u043D\\u0438\\u044F \\u0432\\u043E \\u0432\\u0441\\u0435 \\u043E\\u0431\\u044F\\u0437\\u0430\\u0442\\u0435\\u043B\\u044C\\u043D\\u044B\\u0435 \\u043F\\u043E\\u043B\\u044F\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435 \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043E\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=\\u041D\\u0435 \\u0443\\u0434\\u0430\\u043B\\u043E\\u0441\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u043F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=\\u0412\\u044B \\u043E\\u0442\\u0432\\u0435\\u0447\\u0430\\u0435\\u0442\\u0435 \\u0437\\u0430 {0} \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D. \\u0438\\u0437 {1}. \\u041E\\u0442\\u043E\\u0431\\u0440\\u0430\\u0436\\u0430\\u044E\\u0442\\u0441\\u044F \\u0442\\u043E\\u043B\\u044C\\u043A\\u043E \\u0432\\u0430\\u0448\\u0438 \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0438. \r\n\r\n#XFLD: account ascending\r\nACTASC=\\u041A\\u043B\\u0438\\u0435\\u043D\\u0442 (\\u043F\\u043E \\u0432\\u043E\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#XFLD: account descending\r\nACTDESC=\\u041A\\u043B\\u0438\\u0435\\u043D\\u0442 (\\u043F\\u043E \\u043D\\u0438\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 (\\u043F\\u043E \\u0432\\u043E\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441 (\\u043F\\u043E \\u043D\\u0438\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=\\u0414\\u0430\\u0442\\u0430 \\u0437\\u0430\\u043A\\u0440\\u044B\\u0442\\u0438\\u044F (\\u043F\\u043E \\u0432\\u043E\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=\\u0414\\u0430\\u0442\\u0430 \\u0437\\u0430\\u043A\\u0440\\u044B\\u0442\\u0438\\u044F (\\u043F\\u043E \\u043D\\u0438\\u0441\\u0445\\u043E\\u0434\\u044F\\u0449\\u0435\\u0439)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=\\u041E\\u0442\\u0444\\u0438\\u043B\\u044C\\u0442\\u0440\\u043E\\u0432\\u0430\\u043D\\u043E \\u043F\\u043E \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0443\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=\\u0412\\u0430\\u043B\\u044E\\u0442\\u0430\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=\\u0442\\u044B\\u0441.\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=\\u043C\\u043B\\u043D\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=\\u043C\\u043B\\u0440\\u0434\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u0438 \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG: Place holder message\r\nSEARCH=\\u041F\\u043E\\u0438\\u0441\\u043A\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0430\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=\\u0412\\u044B\\u0431\\u043E\\u0440 \\u0432\\u0430\\u043B\\u044E\\u0442\\u044B\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=\\u0421\\u043E\\u0440\\u0442\\u0438\\u0440\\u043E\\u0432\\u043A\\u0430 \\u043F\\u043E\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=\\u041F\\u043E\\u0434\\u0435\\u043B\\u0438\\u0442\\u044C\\u0441\\u044F/JAM\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=\\u041E\\u0431\\u0441\\u0443\\u0434\\u0438\\u0442\\u044C \\u0432 JAM\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=\\u0412\\u0430\\u043B\\u044E\\u0442\\u0430\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=\\u041F\\u043E\\u0438\\u0441\\u043A\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=\\u0412 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0442 \\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\\u0445 \\u043F\\u043E\\u0437\\u0438\\u0446\\u0438\\u0439\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u043E\\:  "{0}" \\u0441 "\\u0432\\u044B\\u043A\\u043B." \\u043D\\u0430 "\\u0432\\u043A\\u043B."\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u043E\\: "{0}" \\u0441 "\\u0432\\u043A\\u043B." \\u043D\\u0430 "\\u0432\\u044B\\u043A\\u043B."\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u043E\\: {0} \\u0441 "\\u0417\\u043D\\u0430\\u0447\\u0435\\u043D\\u0438\\u0435 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0443\\u0435\\u0442" \\u043D\\u0430  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=\\u0418\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u043E\\: "{0}" \\u0441 "{1}" \\u043D\\u0430 "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0430 \\u0441 \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430\\u043C\\u0438\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=\\u041A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\\u044B \\u0432 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043C\\u043E\\u043C\\u0435\\u043D\\u0442 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u044B\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=\\u0412\\u044B \\u043C\\u043E\\u0436\\u0435\\u0442\\u0435 \\u0442\\u043E\\u043B\\u044C\\u043A\\u043E \\u043F\\u0440\\u043E\\u0441\\u043C\\u0430\\u0442\\u0440\\u0438\\u0432\\u0430\\u0442\\u044C \\u0432\\u0438\\u0437\\u0438\\u0442\\u043D\\u044B\\u0435 \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u043A\\u0438 \\u043A\\u043E\\u043D\\u0442\\u0430\\u043A\\u0442\\u043E\\u0432, \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u043D\\u044B\\u0435 \\u044D\\u0442\\u043E\\u043C\\u0443 \\u043A\\u043B\\u0438\\u0435\\u043D\\u0442\\u0443\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=\\u041E\\u0436\\u0438\\u0434\\u0430\\u0435\\u043C\\u044B\\u0439 \\u043E\\u0431\\u043E\\u0440\\u043E\\u0442 \\u0432 {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=\\u041F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442/\\u043A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F\r\n\r\n#XTIT: Product Category\r\nCATEGORY=\\u041A\\u0430\\u0442\\u0435\\u0433\\u043E\\u0440\\u0438\\u044F \\u043F\\u0440\\u043E\\u0434\\u0443\\u043A\\u0442\\u0430\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=\\u0412\\u0441\\u0435 \\u043D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F \\u0431\\u0443\\u0434\\u0443\\u0442 \\u043F\\u043E\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=\\u0414\\u0430\\u043B\\u044C\\u0448\\u0435\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=\\u041F\\u043E\\u0441\\u043B\\u0435\\u0434\\u0443\\u044E\\u0449\\u0430\\u044F \\u0432\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0430\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=\\u0412\\u0441\\u0442\\u0440\\u0435\\u0447\\u0430\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=\\u041F\\u043E\\u0441\\u043B\\u0435\\u0434\\u0443\\u044E\\u0449\\u0430\\u044F \\u043E\\u043F\\u0435\\u0440\\u0430\\u0446\\u0438\\u044F\r\n\r\n#XBUT: create task\r\nCREATE_TASK=\\u0417\\u0430\\u0434\\u0430\\u0447\\u0430\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=\\u0412\\u043E\\u0437\\u043C\\u043E\\u0436\\u043D\\u043E\\u0441\\u0442\\u044C\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=\\u0421\\u043E\\u0442\\u0440\\u0443\\u0434\\u043D\\u0438\\u043A\\u0438\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u041E\\u0442\\u0432\\u0435\\u0442\\u0441\\u0442\\u0432\\u0435\\u043D\\u043D\\u044B\\u0439 \\u0441\\u043E\\u0442\\u0440\\u0443\\u0434\\u043D\\u0438\\u043A\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=\\u041F\\u043E\\u0438\\u0441\\u043A \\u0441\\u043E\\u0442\\u0440\\u0443\\u0434\\u043D\\u0438\\u043A\\u043E\\u0432\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=\\u0423\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438 ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=\\u0423\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438 \\u043D\\u0435 \\u043D\\u0430\\u0439\\u0434\\u0435\\u043D\\u044B\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=\\u041F\\u043E\\u0438\\u0441\\u043A \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=\\u041D\\u0435\\u043E\\u0431\\u0445\\u043E\\u0434\\u0438\\u043C\\u043E \\u0432\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043C\\u0438\\u043D\\u0438\\u043C\\u0443\\u043C {0} \\u0434\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0432\\u0438\\u0434\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=\\u0414\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0442\\u0438\\u043F\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432 \\u043D\\u0435\\u043E\\u0431\\u0445\\u043E\\u0434\\u0438\\u043C\\u043E \\u0432\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\\: \\u043C\\u0438\\u043D\\u0438\\u043C\\u0443\\u043C {0} \r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=\\u0414\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0432\\u0438\\u0434\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432 \\u043C\\u043E\\u0436\\u043D\\u043E \\u0432\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u043C\\u0430\\u043A\\u0441\\u0438\\u043C\\u0443\\u043C \\u0442\\u043E\\u043B\\u044C\\u043A\\u043E {0}\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=\\u0414\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0442\\u0438\\u043F\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432 \\u043C\\u043E\\u0436\\u043D\\u043E \\u0432\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u043E\\u0432\\: \\u043C\\u0430\\u043A\\u0441\\u0438\\u043C\\u0443\\u043C {0}\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=\\u0412\\u0432\\u0435\\u0434\\u0435\\u043D\\u0430 \\u043D\\u0435\\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0430\\u044F \\u0432\\u0430\\u043B\\u044E\\u0442\\u0430. \\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u044D\\u0442\\u0438 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=\\u0412\\u0430\\u043B\\u044E\\u0442\\u0430 \\u043D\\u0435 \\u0432\\u0432\\u0435\\u0434\\u0435\\u043D\\u0430. \\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u044D\\u0442\\u0438 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=\\u0414\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0442\\u0438\\u043F\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0430 \\u0442\\u0440\\u0435\\u0431\\u0443\\u044E\\u0442\\u0441\\u044F \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438\\: \\u043C\\u0438\\u043D\\u0438\\u043C\\u0443\\u043C {0} \r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=\\u0414\\u043B\\u044F \\u044D\\u0442\\u043E\\u0433\\u043E \\u0442\\u0438\\u043F\\u0430 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0430 \\u0442\\u0440\\u0435\\u0431\\u0443\\u044E\\u0442\\u0441\\u044F \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0438\\: \\u043C\\u0438\\u043D\\u0438\\u043C\\u0443\\u043C {0} \r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} \\u0443\\u0436\\u0435 \\u0434\\u043E\\u0431\\u0430\\u0432\\u043B\\u0435\\u043D \\u0432 \\u043A\\u0430\\u0447\\u0435\\u0441\\u0442\\u0432\\u0435 \\u0443\\u0447\\u0430\\u0441\\u0442\\u043D\\u0438\\u043A\\u0430 \\u0442\\u0438\\u043F\\u0430 {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=\\u0412\\u0438\\u0434\r\n',
	"cus/crm/opportunity/i18n/i18n_tr.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=F\\u0131rsatlar ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=Olu\\u015Ftur\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=Ayarlar\\u0131 g\\u00F6r\\u00FCnt\\u00FCle\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=Ayarlar\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=G\\u00F6r\\u00FCnt\\u00FClenecek azami f\\u0131rsat say\\u0131s\\u0131\\:\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*\\u00C7ok say\\u0131da f\\u0131rsat varsa uygulama performans\\u0131n\\u0131n etkilenece\\u011Fini unutmay\\u0131n.\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=F\\u0131rsat\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=F\\u0131rsat\\u0131 d\\u00FCzenle\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=F\\u0131rsatlar\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=Bilgi\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=\\u00DCr\\u00FCnler\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=Notlar\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=Ekler\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=Rakipler\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=Kat\\u0131l\\u0131mc\\u0131lar\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=M\\u00FC\\u015Fteri\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=F\\u0131rsat tan\\u0131t\\u0131c\\u0131s\\u0131\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=Ba\\u015Flang\\u0131\\u00E7 tarihi\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=Kapan\\u0131\\u015F tarihi\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=Ba\\u015Far\\u0131 \\u015Fans\\u0131\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=Durum\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=Sat\\u0131\\u015F a\\u015Famas\\u0131\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=\\u00D6ncelik\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=\\u00DCr\\u00FCn\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=Miktar\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=Net de\\u011Fer\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=Beklenen toplam de\\u011Fer\r\n\r\n#XBUT: edit button text\r\nEDIT=D\\u00FCzenle\r\n\r\n#XBUT: Save button text\r\nSAVE=Kaydet\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=\\u0130ptal\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=Daha fazla \\u00FCr\\u00FCn ekle\r\n\r\n#XBUT: Add Products button text\r\nADD=Ekle\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=\\u0130lgili ki\\u015Fi ekle\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=F\\u0131rsat kaydedildi\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=F\\u0131rsat kaydedilemedi\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=M\\u00FC\\u015Fteri logosu\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=Ad\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=Ana ilgili ki\\u015Fi\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=Beklenen sat\\u0131\\u015F has\\u0131lat\\u0131\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=De\\u011Fi\\u015Fiklikler g\\u00FCnl\\u00FC\\u011F\\u00FC\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=G\\u00F6r\\u00FCnt\\u00FCle\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=\\u00DCr\\u00FCn sepeti\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=Beklenen sat\\u0131\\u015F hslt.(a\\u011F\\u0131rl\\u0131kl\\u0131\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=Tahmin ili\\u015Fkisi\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=\\:\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=Ba\\u015Flang\\u0131\\u00E7\\:\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=Biti\\u015F\\:\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=Tarih\\:\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=Kapal\\u0131\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=De\\u011Fi\\u015Ftirildi\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=\\u0130lgili ki\\u015Fi\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=Ara\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=\\u00DCr\\u00FCn katalo\\u011Fu\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=Bo\\u015F \\u00FCr\\u00FCn sepeti\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=Muhatap i\\u015Flevi\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=\\u0130\\u015Flem t\\u00FCr\\u00FC se\\u00E7\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=S\\u0131ralama\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=F\\u0131rsat kaydedildi\r\n\r\n#XBUT: OK button text\r\nOK=Tamam\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=\\u015Eu anda rakip mevcut de\\u011Fil\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=\\u015Eu anda \\u00FCr\\u00FCn mevcut de\\u011Fil\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=Kat\\u0131l\\u0131mc\\u0131lar (ilgili taraflar) \\u015Fu anda mevcut de\\u011Fil\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=De\\u011Fi\\u015Fiklikler bulunamad\\u0131\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=Yaln\\u0131z m\\u00FC\\u015Fterilerin veya ilgili ki\\u015Filerin kartvizitlerini g\\u00F6r\\u00FCnt\\u00FCleyebilirsiniz\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=Sonraki t\\u00FCrler mevcut\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=Ge\\u00E7erli f\\u0131rsat hatalar i\\u00E7eriyor veya uyarlamada bak\\u0131m\\u0131 yap\\u0131lan sonraki i\\u015Flem t\\u00FCrleri yok\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=Kartviziti g\\u00F6r\\u00FCnt\\u00FClemek i\\u00E7in belirlenen m\\u00FC\\u015Fteriye ili\\u015Fkin ayr\\u0131nt\\u0131lar mevcut olmal\\u0131\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=Kartviziti g\\u00F6r\\u00FCnt\\u00FClemek i\\u00E7in belirlenen m\\u00FC\\u015Fteriye ili\\u015Fkin gerekli t\\u00FCm ayr\\u0131nt\\u0131lar mevcut olmal\\u0131\r\n\r\n#YMSG, 30: error\r\nERROR=Hata\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=Tarihler i\\u00E7in ge\\u00E7erli de\\u011Ferleri girin\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=Kapan\\u0131\\u015F tarihi ba\\u015Flang\\u0131\\u00E7 tarihinden \\u00F6nce olamaz\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=Tan\\u0131m ekle (azami 40 karakter)\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=\\u015Eu anda not mevcut de\\u011Fil\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=Zorunlu alanlar i\\u00E7in de\\u011Ferleri girin\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=Not kaydedildi\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=Not kaydedilemedi\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS={0} / {1} f\\u0131rsat i\\u00E7in sorumlusunuz. Yaln\\u0131z f\\u0131rsatlar\\u0131n\\u0131z g\\u00F6r\\u00FCnt\\u00FCleniyor. \r\n\r\n#XFLD: account ascending\r\nACTASC=M\\u00FC\\u015Fteri (artan d\\u00FCzende)\r\n\r\n#XFLD: account descending\r\nACTDESC=M\\u00FC\\u015Fteri (azalan d\\u00FCzende)\r\n\r\n#XFLD: Status ascending\r\nSTATASC=Durum (artan d\\u00FCzende)\r\n\r\n#XFLD: Status descending\r\nSTATDESC=Durum (azalan d\\u00FCzende)\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=Kapan\\u0131\\u015F tarihi (artan d\\u00FCzende)\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=Kapan\\u0131\\u015F tarihi (azalan d\\u00FCzende)\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=M\\u00FC\\u015Fteriye g\\u00F6re filtrelendi\\:\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=Para birimi\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=K\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=M\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=B\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=\\u015Eu anda f\\u0131rsat mevcut de\\u011Fil\r\n\r\n#YMSG: Place holder message\r\nSEARCH=Ara\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=M\\u00FC\\u015Fteri se\\u00E7\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=Para birimi se\\u00E7\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=\\u0130lgili ki\\u015Fi se\\u00E7\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=S\\u0131ralama \\u00F6l\\u00E7\\u00FCt\\u00FC\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=JAM\'de payla\\u015F\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=JAM\'de tart\\u0131\\u015F\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=Para birimi\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=Ara\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=Y\\u00FCkleniyor...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=\\u015Eu anda kalem yok\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=De\\u011Fi\\u015Ftirildi\\:  "{0} "Kapal\\u0131" iken "A\\u00E7\\u0131k"\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=De\\u011Fi\\u015Ftirildi\\: "{0} "A\\u00E7\\u0131k" iken "Kapal\\u0131"\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=De\\u011Fi\\u015Ftirildi\\: {0} "De\\u011Fer yok" iken  {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=De\\u011Fi\\u015Ftirildi\\: "{0}", "{1}" iken "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=F\\u0131rsat hatalarla kaydedildi\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=\\u015Eu anda ilgili ki\\u015Fi mevcut de\\u011Fil\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=Yaln\\u0131z bu m\\u00FC\\u015Fteriye tayin etti\\u011Finiz ilgili ki\\u015Filerin kartvizitlerini g\\u00F6r\\u00FCnt\\u00FCleyebilirsiniz\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=Beklenen sat\\u0131\\u015F has\\u0131lat\\u0131\\: {0}\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=\\u00DCr\\u00FCn/kategori\r\n\r\n#XTIT: Product Category\r\nCATEGORY=\\u00DCr\\u00FCn kategorisi\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=Uyar\\u0131\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=Kaydedilmeyen de\\u011Fi\\u015Fiklikler kaybolacak. Devam etmek istedi\\u011Finizden emin misiniz?\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=Devam\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=Sonraki f\\u0131rsat kaydedildi\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=Randevu\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=Sonraki i\\u015Flem\r\n\r\n#XBUT: create task\r\nCREATE_TASK=G\\u00F6rev\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=F\\u0131rsat\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=\\u00C7al\\u0131\\u015Fanlar\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=Sorumlu \\u00E7al\\u0131\\u015Fan\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=\\u00C7al\\u0131\\u015Fanlar i\\u00E7in arama\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=Kat\\u0131l\\u0131mc\\u0131lar ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=Kat\\u0131l\\u0131mc\\u0131 bulunamad\\u0131\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=Kat\\u0131l\\u0131mc\\u0131lar i\\u00E7in arama\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=Kat\\u0131l\\u0131mc\\u0131lar\\u0131 ekle\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in asgari {0} kat\\u0131l\\u0131mc\\u0131 se\\u00E7melisiniz\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in asgari {0} kat\\u0131l\\u0131mc\\u0131 se\\u00E7melisiniz\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in yaln\\u0131zca azami {0} kat\\u0131l\\u0131mc\\u0131 se\\u00E7ebilirsiniz\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in yaln\\u0131zca azami {0} kat\\u0131l\\u0131mc\\u0131 se\\u00E7ebilirsiniz\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=Ge\\u00E7ersiz bir para birimi girdiniz. Bu veriyi kaydetmek istiyor musunuz?\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=Para birimi sa\\u011Flamad\\u0131n\\u0131z. Bu veriyi kaydetmek istiyor musunuz?\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in en az {0} kat\\u0131l\\u0131mc\\u0131 gerekli\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=Bu kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC i\\u00E7in en az {0} kat\\u0131l\\u0131mc\\u0131 gerekli\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} zaten kat\\u0131l\\u0131mc\\u0131 olarak kat\\u0131l\\u0131mc\\u0131 t\\u00FCr\\u00FC ile eklendi {1}\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=T\\u00FCr\r\n',
	"cus/crm/opportunity/i18n/i18n_zh_CN.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\r\n\r\n# Note: This file was created according to the conventions that can be found at \r\n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\r\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\r\n\r\n#XTIT: this is the title for the master section\r\nMASTER_TITLE=\\u673A\\u4F1A ({0})\r\n\r\n#XTIT: this is the title for the Create section\r\nCREATE_TITLE=\\u521B\\u5EFA\r\n\r\n#XBUT : show result\r\nSHOW_SETTING=\\u663E\\u793A\\u8BBE\\u7F6E\r\n\r\n#XBUT : list setting button text\r\nLIST_SETTING=\\u8BBE\\u7F6E\r\n\r\n#XTXT : Show instruction\r\nSHOW_INS=\\u53EF\\u663E\\u793A\\u7684\\u6700\\u5927\\u673A\\u4F1A\\u6570\\uFF1A\r\n\r\n#XTXT : Show noteS\r\nSHOW_INS_NOTES=*\\u8BF7\\u6CE8\\u610F\\uFF0C\\u5982\\u679C\\u673A\\u4F1A\\u6570\\u91CF\\u8F83\\u591A\\uFF0C\\u5E94\\u7528\\u7684\\u6027\\u80FD\\u4F1A\\u53D7\\u5230\\u5F71\\u54CD\\u3002\r\n\r\n#XTIT: this is the title for the detail section\r\nDETAIL_TITLE=\\u673A\\u4F1A\r\n\r\n#XTIT: this is the title for the Create section\r\nEDIT_TITLE=\\u7F16\\u8F91\\u673A\\u4F1A\r\n\r\n#XTIT: Application title\r\nSHELL_TITLE=\\u673A\\u4F1A\r\n\r\n#XTIT: this is the title for the Info Tab\r\nINFO=\\u4FE1\\u606F\r\n\r\n#XTIT: this is the title for the Products Tab\r\nPRODUCTS=\\u4EA7\\u54C1\r\n\r\n#XTIT: this is the title for the Notes Tab\r\nNOTES=\\u6CE8\\u91CA\r\n\r\n#XTIT: this is the title for the Attachments Tab\r\nATTACHMENTS=\\u9644\\u4EF6\r\n\r\n#XTIT: this is the title for the Competitors Tab\r\nCOMPETITORS=\\u7ADE\\u4E89\\u8005\r\n\r\n#XTIT: this is the title for the SalesTeam Tab\r\nSALES_TEAM=\\u53C2\\u4E0E\\u8005\r\n\r\n#XFLD, 30: Field Account on List\r\nACCOUNT=\\u5BA2\\u6237\r\n\r\n#XFLD, 30: Field Id on Info tab\r\nOPPOR_ID=\\u673A\\u4F1A\\u6807\\u8BC6\r\n\r\n#XFLD, 30: Field Start date on Info tab\r\nSTART_DATE=\\u5F00\\u59CB\\u65E5\\u671F\r\n\r\n#XFLD, 30: Field "Close date" on Info tab\r\nCLOSE_DATE=\\u7ED3\\u675F\\u65E5\\u671F\r\n\r\n#XFLD, 30: Field "Chance of success" on Info tab\r\nCHANCE_OF_SUCCESS=\\u6210\\u529F\\u51E0\\u7387\r\n\r\n#XFLD, 30: Field "Status" on Info tab\r\nSTATUS=\\u72B6\\u6001\r\n\r\n#XFLD, 30: Field "Stage" on Info tab\r\nSTAGE=\\u9500\\u552E\\u9636\\u6BB5\r\n\r\n#XFLD, 30: Field "Priority" on Info tab\r\nPRIORITY=\\u4F18\\u5148\\u7EA7\r\n\r\n#XFLD, 30: Field "Product" on Product tab\r\nPRODUCT=\\u4EA7\\u54C1\r\n\r\n#XFLD, 30: Field "Quantity" on Product tab\r\nQUANTITY=\\u6570\\u91CF\r\n\r\n#XFLD, 30: Field "Unit Price" on Product tab\r\nUNIT_PRICE=\\u51C0\\u503C\r\n\r\n#XFLD, 30: Field "Exp.Total Value" on Product tab\r\nVOLUME=\\u9884\\u671F\\u603B\\u503C\r\n\r\n#XBUT: edit button text\r\nEDIT=\\u7F16\\u8F91\r\n\r\n#XBUT: Save button text\r\nSAVE=\\u4FDD\\u5B58\r\n\r\n#XBUT: Cancel button text\r\nCANCEL=\\u53D6\\u6D88\r\n\r\n#XBUT: Add More Products button text\r\nADD_PROD=\\u6DFB\\u52A0\\u66F4\\u591A\\u4EA7\\u54C1\r\n\r\n#XBUT: Add Products button text\r\nADD=\\u6DFB\\u52A0\r\n\r\n#XBUT: Add Contacts button text\r\nADDCONTACT=\\u6DFB\\u52A0\\u8054\\u7CFB\\u4EBA\r\n\r\n#YMSG: lead saved\r\nOPP_SAVED=\\u5DF2\\u4FDD\\u5B58\\u673A\\u4F1A\r\n\r\n#YMSG: lead could not be saved\r\nSAVE_FAILED=\\u65E0\\u6CD5\\u4FDD\\u5B58\\u673A\\u4F1A\r\n\r\n#XFLD, 30: Field "Customer logo" on create tab\r\nCUSTOMER_LOGO=\\u5BA2\\u6237\\u5FBD\\u6807\r\n\r\n#XFLD, 30: Field "Name" on Info tab\r\nNAME=\\u540D\\u79F0\r\n\r\n#XFLD, 30: Field "maincontact" on Info tab\r\nMAIN_CONTACT=\\u4E3B\\u8981\\u8054\\u7CFB\\u4EBA\r\n\r\n#XFLD, 30: Field "unweighted Volume" on Info tab\r\nUNWEIGHTED_VOLUME=\\u9884\\u671F\\u9500\\u552E\\u989D\r\n\r\n#XFLD, 30: Field "Log of Changes" on Info tab\r\nLOG_CHANGE=\\u53D8\\u66F4\\u65E5\\u5FD7\r\n\r\n#XFLD, 30: Field "View" on Info tab\r\nVIEW=\\u67E5\\u770B\r\n\r\n#XFLD, 30: Field "Product Basket" on Info tab\r\nPRODUCT_BASKET=\\u4EA7\\u54C1\\u7BEE\r\n\r\n#XFLD, 30: Field "Weighted Volume" on Info tab\r\nWEIGHTED_VOLUME=\\u9884\\u671F\\u9500\\u552E\\u989D\\uFF08\\u52A0\\u6743\\uFF09\r\n\r\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\r\nFORECAST=\\u9884\\u6D4B\\u76F8\\u5173\\u6027\r\n\r\n#XFLD, 30: Field "In" on Detail Header\r\nIN=\\u4E8E\r\n\r\n#XFLD, 30: Field "From" on View tab\r\nFROM=\\u4ECE\r\n\r\n#XFLD, 30: Field "To" on View tab\r\nTO=\\u81F3\r\n\r\n#XFLD, 30: Field "ON" on View tab\r\nON=\\u6253\\u5F00\r\n\r\n#XFLD, 30: Field "OFF" on View tab\r\nOFF=\\u5173\\u95ED\r\n\r\n#XFLD, 30: Field "Changed" on View tab\r\nCHANGED=\\u5DF2\\u66F4\\u6539\r\n\r\n#XTIT: contact title for contact F4\r\nCONTACT=\\u8054\\u7CFB\\u4EBA\r\n\r\n#XACT: search contacts place holder\r\nSEARCH_CONTACTS=\\u641C\\u7D22\r\n\r\n#XTIT: this is the title for the Product Catalog section\r\nPRODUCT_CAT=\\u4EA7\\u54C1\\u76EE\\u5F55\r\n\r\n#XFLD, 30: Field "Empty Basket" on Product Edit\r\nEMPTY_PROD=\\u7A7A\\u4EA7\\u54C1\\u7BEE\r\n\r\n#XFLD, 30: Field "PartnerFunction" on Sales Team\r\nPARTNER_FUNCTION=\\u5408\\u4F5C\\u4F19\\u4F34\\u804C\\u80FD\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nPROCESS_TYPE=\\u9009\\u62E9\\u4EA4\\u6613\\u7C7B\\u578B\r\n\r\n#XTIT: this is the title for the Process Type section\\r\t153\r\nSORT=\\u6392\\u5E8F\r\n\r\n#YMSG, 30: save opportunity\r\nSAVE_SUCCESS=\\u5DF2\\u4FDD\\u5B58\\u673A\\u4F1A\r\n\r\n#XBUT: OK button text\r\nOK=\\u786E\\u5B9A\r\n\r\n#YMSG, 60:  no competitors\r\nNOCOMPETITORS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u7ADE\\u4E89\\u8005\r\n\r\n#YMSG, 60:  no products\r\nNOPRODUCTS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u4EA7\\u54C1\r\n\r\n#YMSG, 30:  no salesteam\r\nNOPARTIES=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u53C2\\u4E0E\\u8005\\uFF08\\u76F8\\u5173\\u65B9\\uFF09\r\n\r\n#YMSG, 30:  no logchange\r\nNOLOGCHANGE=\\u672A\\u627E\\u5230\\u66F4\\u6539\r\n\r\n#YMSG: not a contact or account\r\nNOT_CONTACT_OR_ACCOUNT=\\u53EA\\u80FD\\u67E5\\u770B\\u5BA2\\u6237\\u6216\\u8054\\u7CFB\\u4EBA\\u7684\\u540D\\u7247\r\n\r\n#YMSG: no transaction types  present\r\nFOLLOWUPERROR=\\u4E0D\\u5B58\\u5728\\u8DDF\\u8FDB\\u7C7B\\u578B\r\n\r\n#YMSG: detailed error message shown when no transaction types are present\r\nFOLLOWUPDETAILERROR=\\u5F53\\u524D\\u673A\\u4F1A\\u5B58\\u5728\\u9519\\u8BEF\\u6216\\u672A\\u5728\\u5B9A\\u5236\\u4E2D\\u7EF4\\u62A4\\u8DDF\\u8FDB\\u4E8B\\u52A1\\u7C7B\\u578B\r\n\r\n#YMSG: account is null\r\nACCOUNT_IS_NULL=\\u8981\\u67E5\\u770B\\u540D\\u7247\\uFF0C\\u6307\\u5B9A\\u5BA2\\u6237\\u5FC5\\u987B\\u6709\\u53EF\\u7528\\u7684\\u8BE6\\u7EC6\\u4FE1\\u606F\r\n\r\n#YMSG: some info missing\r\nINFO_MISSING=\\u8981\\u67E5\\u770B\\u540D\\u7247\\uFF0C\\u6307\\u5B9A\\u5BA2\\u6237\\u5FC5\\u987B\\u6240\\u6709\\u6240\\u9700\\u8BE6\\u7EC6\\u4FE1\\u606F\\u90FD\\u53EF\\u7528\r\n\r\n#YMSG, 30: error\r\nERROR=\\u9519\\u8BEF\r\n\r\n#YMSG: junk value entered for dates\r\nJUNK_DATE=\\u8F93\\u5165\\u6709\\u6548\\u7684\\u65E5\\u671F\\u503C\r\n\r\n#YMSG, 30:  Closing Date\r\nINVALID_DATE=\\u7ED3\\u675F\\u65E5\\u671F\\u4E0D\\u5F97\\u65E9\\u4E8E\\u5F00\\u59CB\\u65E5\\u671F\r\n\r\n#YMSG, 30:  Description\r\nMAX_CHARS=\\u6DFB\\u52A0\\u63CF\\u8FF0\\uFF08\\u6700\\u591A 40 \\u4E2A\\u5B57\\u7B26\\uFF09\r\n\r\n#YMSG, 30:  no notes\r\nNONOTES=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u6CE8\\u91CA\r\n\r\n#YMSG, 60: mandt field in create\r\nMANDAT_FIELD=\\u5728\\u6240\\u6709\\u5FC5\\u586B\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u76F8\\u5E94\\u503C\r\n\r\n#YMSG, 30: save note\r\nNOTE_SUCCESS=\\u6CE8\\u91CA\\u5DF2\\u4FDD\\u5B58\r\n\r\n#YMSG, 50: save fail Note\r\nNOTE_FAILED=\\u65E0\\u6CD5\\u4FDD\\u5B58\\u6CE8\\u91CA\r\n#XFLD: Only your tasks are displayed\r\nLIST_FILTERED_BY_MYITEMS=\\u60A8\\u8D1F\\u8D23 {0} \\u4E2A\\u673A\\u4F1A\\uFF08\\u5171 {1} \\u4E2A\\uFF09\\u3002\\u4EC5\\u663E\\u793A\\u60A8\\u8D1F\\u8D23\\u7684\\u673A\\u4F1A\\u3002 \r\n\r\n#XFLD: account ascending\r\nACTASC=\\u5BA2\\u6237\\uFF08\\u5347\\u5E8F\\uFF09\r\n\r\n#XFLD: account descending\r\nACTDESC=\\u5BA2\\u6237\\uFF08\\u964D\\u5E8F\\uFF09\r\n\r\n#XFLD: Status ascending\r\nSTATASC=\\u72B6\\u6001\\uFF08\\u5347\\u5E8F\\uFF09\r\n\r\n#XFLD: Status descending\r\nSTATDESC=\\u72B6\\u6001\\uFF08\\u964D\\u5E8F\\uFF09\r\n\r\n#XFLD: Closing Date ascending\r\nCLSDATEASC=\\u7ED3\\u675F\\u65E5\\u671F\\uFF08\\u5347\\u5E8F\\uFF09\r\n\r\n#XFLD: Closing Date descending\r\nCLSDATEDESC=\\u7ED3\\u675F\\u65E5\\u671F\\uFF08\\u964D\\u5E8F\\uFF09\r\n\r\n#YMSG, 50: text in Dialogbox\r\nFILTER=\\u6309\\u5BA2\\u6237\\u8FC7\\u6EE4\\uFF1A\r\n\r\n#XTIT: title for currency dialog box\r\nCURRENCY=\\u8D27\\u5E01\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nTHOUSAND=\\u5343\r\n\r\n#XFLD, 30: Field "THOUSAND" on Master List\r\nMILLION=\\u767E\\u4E07\r\n\r\n#XFLD, 30: Field "BILLION" on Master List\r\nBILLION=\\u5341\\u4EBF\r\n\r\n#YMSG: No Opprtunity found\r\nNO_OPPR_ERROR=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u673A\\u4F1A\r\n\r\n#YMSG: Place holder message\r\nSEARCH=\\u641C\\u7D22\r\n\r\n#XTIT, 30: title in Account F4\r\nACCOUNT_TITLE=\\u9009\\u62E9\\u5BA2\\u6237\r\n\r\n#XTIT, 30: title in Currency F4\r\nCURRENCY_TITLE=\\u9009\\u62E9\\u8D27\\u5E01\r\n\r\n#XTIT, 30: title in Contact F4\r\nCONTACT_TITLE=\\u9009\\u62E9\\u8054\\u7CFB\\u4EBA\r\n\r\n#XFLD, 30: FullName ContactId\r\nLBL_FULLNAME_CONTACT_ID={0} {1}\r\n\r\n#XFLD, 30: Value Currency binding\r\nVALUE_CURRENCY={0} {1}\r\n\r\n#XTIT: Title for Sort By popover\r\nSORT_BY=\\u6392\\u5E8F\\u65B9\\u5F0F\r\n\r\n#XBUT: Share on Jam\r\nSHARE_ON_JAM=\\u5728 JAM \\u4E2D\\u5171\\u4EAB\r\n\r\n#XBUT: Discuss on Jam\r\nDISCUSS_ON_JAM=\\u5728 JAM \\u4E2D\\u8BA8\\u8BBA\r\n\r\n#XFLD: Currency label\r\nLBL_CURRENCY=\\u8D27\\u5E01\r\n\r\n#XFLD: Search Placeholder\r\nLBL_SEARCH_PLACEHOLDER=\\u641C\\u7D22\r\n\r\n#XFLD,20: Loading text when loading/searching list\r\nLOADING_TEXT=\\u6B63\\u5728\\u52A0\\u8F7D...\r\n\r\n#XFLD,20: No Data text when loading/searching list\r\nNO_DATA_TEXT=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u9879\\u76EE\r\n\r\n#XFLD: percentage sign\r\nPERCENTAGE_SIGN=%\r\n\r\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\r\nVALUE_TURNED_ON=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531\\u201C\\u5173\\u95ED\\u201D\\u53D8\\u4E3A\\u201C\\u5F00\\u542F\\u201D\r\n\r\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\r\nVALUE_TURNED_OFF=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531\\u201C\\u5F00\\u542F\\u201D\\u53D8\\u4E3A\\u201C\\u5173\\u95ED\\u201D\r\n\r\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\r\nVALUE_CHANGED_FROM_NULL=\\u5DF2\\u66F4\\u6539\\uFF1A{0} \\u7531\\u201C\\u65E0\\u503C\\u201D\\u53D8\\u4E3A {1}\r\n\r\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\r\nVALUE_CHANGED_FROM=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531 "{1}" \\u53D8\\u4E3A "{2}"\r\n\r\n#YMSG: opportunity saved with errors\r\nPARTIAL_SAVE=\\u673A\\u4F1A\\u5DF2\\u4FDD\\u5B58\\uFF0C\\u4F46\\u6709\\u9519\\u8BEF\r\n\r\n#XFLD,20: No contacts\r\nNO_CONTACTS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u8054\\u7CFB\\u4EBA\r\n\r\n#YMSG: contact not assigned to this account\r\nNOT_IN_MAIN_CONTACT=\\u53EA\\u80FD\\u67E5\\u770B\\u5206\\u914D\\u7ED9\\u6B64\\u5BA2\\u6237\\u7684\\u8054\\u7CFB\\u4EBA\\u7684\\u540D\\u7247\r\n\r\n#XFLD, 40: Field "Weighted Volume in" on Info tab\r\nUNWEIGHTED_VOLUME_IN=\\u9884\\u671F\\u9500\\u552E\\u989D ({0})\r\n\r\n#XFLD: column in product basket\r\nPRODUCT_OR_CATEGORY=\\u4EA7\\u54C1/\\u7C7B\\u522B\r\n\r\n#XTIT: Product Category\r\nCATEGORY=\\u4EA7\\u54C1\\u7C7B\\u522B\r\n\r\n#XTIT: Warning title for data loss pop-up\r\nWARNING=\\u8B66\\u544A\r\n\r\n#YMSG: data loss message\r\nDATA_LOSS=\\u6240\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\\u5C06\\u4E22\\u5931\\u3002\\u662F\\u5426\\u786E\\u5B9A\\u7EE7\\u7EED\\uFF1F\r\n\r\n#XBUT: continue buttonn\r\nCONTINUE=\\u7EE7\\u7EED\r\n\r\n#YMSG: successful followup message in message toast\r\nfollowupsuccessful=\\u8DDF\\u8FDB\\u673A\\u4F1A\\u5DF2\\u4FDD\\u5B58\r\n\r\n#XBUT: create appointment\r\nCREATE_APPOINTMENT=\\u9884\\u7EA6\r\n\r\n#XBUT: create appointment\r\nFOLLOW_UP=\\u8DDF\\u8FDB\r\n\r\n#XBUT: create task\r\nCREATE_TASK=\\u4EFB\\u52A1\r\n\r\n#XBUT: create opportunity\r\nCREATE_OPPORTUNITY=\\u673A\\u4F1A\r\n\r\n#XTIT \r\nEMPLOYEE_TITLE=\\u5458\\u5DE5\r\n\r\n#XFLD\r\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u8D1F\\u8D23\\u4EBA\r\n\r\n#XACT\r\nSEARCH_EMPLOYEE=\\u641C\\u7D22\\u5458\\u5DE5\r\n\r\n#XTIT: sales team \r\nPARTICIPANTS=\\u53C2\\u4E0E\\u8005 ({0})\r\n\r\n#YMSG: no participants\r\nNO_PARTICIPANTS=\\u672A\\u627E\\u5230\\u53C2\\u4E0E\\u8005\r\n\r\n#XACT: search participants place holder\r\nSEARCH_PARTICIPANTS=\\u641C\\u7D22\\u53C2\\u4E0E\\u8005\r\n\r\n#XTIT: select participant\r\nADD_PARTICIPANTS=\\u6DFB\\u52A0\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS=\\u81F3\\u5C11\\u5FC5\\u987B\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: enter further participants\r\nTOO_FEW_PARTICIPANTS_1=\\u81F3\\u5C11\\u5FC5\\u987B\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS=\\u6700\\u591A\\u53EA\\u80FD\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: too many participants\r\nTOO_MANY_PARTICIPANTS_1=\\u6700\\u591A\\u53EA\\u80FD\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: invalid currency message\r\nINVALID_CURRENCY=\\u60A8\\u8F93\\u5165\\u7684\\u8D27\\u5E01\\u65E0\\u6548\\u3002\\u662F\\u5426\\u4FDD\\u5B58\\u6B64\\u6570\\u636E\\uFF1F\r\n\r\n#YMSG: null currency message\r\nNULL_CURRENCY=\\u60A8\\u5C1A\\u672A\\u63D0\\u4F9B\\u8D27\\u5E01\\u3002\\u662F\\u5426\\u4FDD\\u5B58\\u6B64\\u6570\\u636E\\uFF1F\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS=\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u81F3\\u5C11\\u5FC5\\u987B\\u6709 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG: enter further participants\r\nMUST_HAVE_PARTICIPANTS_1=\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u81F3\\u5C11\\u5FC5\\u987B\\u6709 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\r\n\r\n#YMSG:participant already exists\r\nPARTICIPANT_EXISTS={0} \\u5DF2\\u6DFB\\u52A0\\u4E3A {1} \\u7C7B\\u578B\\u7684\\u53C2\\u4E0E\\u8005\r\n\r\n#XFLD, 30: Field Transaction Type on Info Form\r\nTYPE=\\u7C7B\\u578B\r\n',
	"cus/crm/opportunity/i18n/i18n_zh_CN_.properties":'# GUID to be created with http://www.famkruithof.net/uuid/uuidgen\n\n# Note: This file was created according to the conventions that can be found at \n# https://wiki.wdf.sap.corp/wiki/display/LeanDI/Lean+DI+Translation+Process\n# https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1445717842\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=\\u673A\\u4F1A ({0})\n\n#XTIT: this is the title for the Create section\nCREATE_TITLE=\\u521B\\u5EFA\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=\\u673A\\u4F1A\n\n#XTIT: this is the title for the Create section\nEDIT_TITLE=\\u7F16\\u8F91\\u673A\\u4F1A\n\n#XTIT: Application title\nSHELL_TITLE=\\u673A\\u4F1A\n\n#XTIT: this is the title for the Info Tab\nINFO=\\u4FE1\\u606F\n\n#XTIT: this is the title for the Products Tab\nPRODUCTS=\\u4EA7\\u54C1\n\n#XTIT: this is the title for the Notes Tab\nNOTES=\\u6CE8\\u91CA\n\n#XTIT: this is the title for the Attachments Tab\nATTACHMENTS=\\u9644\\u4EF6\n\n#XTIT: this is the title for the Competitors Tab\nCOMPETITORS=\\u7ADE\\u4E89\\u8005\n\n#XTIT: this is the title for the SalesTeam Tab\nSALES_TEAM=\\u53C2\\u4E0E\\u8005\n\n#XFLD, 30: Field Account on List\nACCOUNT=\\u5BA2\\u6237\n\n#XFLD, 30: Field Id on Info tab\nOPPOR_ID=\\u673A\\u4F1A\\u6807\\u8BC6\n\n#XFLD, 30: Field Start date on Info tab\nSTART_DATE=\\u5F00\\u59CB\\u65E5\\u671F\n\n#XFLD, 30: Field "Close date" on Info tab\nCLOSE_DATE=\\u7ED3\\u675F\\u65E5\\u671F\n\n#XFLD, 30: Field "Chance of success" on Info tab\nCHANCE_OF_SUCCESS=\\u6210\\u529F\\u51E0\\u7387\n\n#XFLD, 30: Field "Status" on Info tab\nSTATUS=\\u72B6\\u6001\n\n#XFLD, 30: Field "Stage" on Info tab\nSTAGE=\\u9500\\u552E\\u9636\\u6BB5\n\n#XFLD, 30: Field "Priority" on Info tab\nPRIORITY=\\u4F18\\u5148\\u7EA7\n\n#XFLD, 30: Field "Product" on Product tab\nPRODUCT=\\u4EA7\\u54C1\n\n#XFLD, 30: Field "Quantity" on Product tab\nQUANTITY=\\u6570\\u91CF\n\n#XFLD, 30: Field "Unit Price" on Product tab\nUNIT_PRICE=\\u51C0\\u503C\n\n#XFLD, 30: Field "Volume" on Product tab\nVOLUME=\\u9500\\u552E\\u989D\n\n#XBUT: edit button text\nEDIT=\\u7F16\\u8F91\n\n#XBUT: Save button text\nSAVE=\\u4FDD\\u5B58\n\n#XBUT: Cancel button text\nCANCEL=\\u53D6\\u6D88\n\n#XBUT: Add More Products button text\nADD_PROD=\\u6DFB\\u52A0\\u66F4\\u591A\\u4EA7\\u54C1\n\n#XBUT: Add Products button text\nADD=\\u6DFB\\u52A0\n\n#XBUT: Add Contacts button text\nADD_CONTACT=\\u6DFB\\u52A0\\u8054\\u7CFB\\u4EBA\n\n#YMSG: lead saved\nOPP_SAVED=\\u5DF2\\u4FDD\\u5B58\\u673A\\u4F1A\n\n#YMSG: lead could not be saved\nSAVE_FAILED=\\u65E0\\u6CD5\\u4FDD\\u5B58\\u673A\\u4F1A\n\n#XFLD, 30: Field "Customer logo" on create tab\nCUSTOMER_LOGO=\\u5BA2\\u6237\\u5FBD\\u6807\n\n#XFLD, 30: Field "Name" on Info tab\nNAME=\\u540D\\u79F0\n\n#XFLD, 30: Field "maincontact" on Info tab\nMAIN_CONTACT=\\u4E3B\\u8981\\u8054\\u7CFB\\u4EBA\n\n#XFLD, 30: Field "unweighted Volume" on Info tab\nUNWEIGHTED_VOLUME=\\u9884\\u671F\\u9500\\u552E\\u989D\n\n#XFLD, 30: Field "Log of Changes" on Info tab\nLOG_CHANGE=\\u53D8\\u66F4\\u65E5\\u5FD7\n\n#XFLD, 30: Field "View" on Info tab\nVIEW=\\u67E5\\u770B\n\n#XFLD, 30: Field "Product Basket" on Info tab\nPRODUCT_BASKET=\\u4EA7\\u54C1\\u7BEE\n\n#XFLD, 30: Field "Weighted Volume" on Info tab\nWEIGHTED_VOLUME=\\u9884\\u671F\\u9500\\u552E\\u989D\\uFF08\\u52A0\\u6743\\uFF09\n\n#XFLD, 30: Field "Forecast Relevance Indicator" on Info tab\nFORECAST=\\u9884\\u6D4B\\u76F8\\u5173\\u6027\n\n#XFLD, 30: Field "In" on Detail Header\nIN=\\u4E8E\n\n#XFLD, 30: Field "From" on View tab\nFROM=\\u4ECE\n\n#XFLD, 30: Field "To" on View tab\nTO=\\u81F3\n\n#XFLD, 30: Field "ON" on View tab\nON=\\u6253\\u5F00\n\n#XFLD, 30: Field "OFF" on View tab\nOFF=\\u5173\\u95ED\n\n#XFLD, 30: Field "Changed" on View tab\nCHANGED=\\u5DF2\\u66F4\\u6539\n\n#XTIT: contact title for contact F4\nCONTACT=\\u8054\\u7CFB\\u4EBA\n\n#XACT: search contacts place holder\nSEARCH_CONTACTS=\\u641C\\u7D22\n\n#XTIT: this is the title for the Product Catalog section\nPRODUCT_CAT=\\u4EA7\\u54C1\\u76EE\\u5F55\n\n#XFLD, 30: Field "Empty Basket" on Product Edit\nEMPTY_PROD=\\u7A7A\\u4EA7\\u54C1\\u7BEE\n\n#XFLD, 30: Field "PartnerFunction" on Sales Team\nPARTNER_FUNCTION=\\u5408\\u4F5C\\u4F19\\u4F34\\u804C\\u80FD\n\n#XTIT: this is the title for the Process Type section\\r\t153\nPROCESS_TYPE=\\u9009\\u62E9\\u4EA4\\u6613\\u7C7B\\u578B\n\n#XTIT: this is the title for the Process Type section\\r\t153\nSORT=\\u6392\\u5E8F\n\n#YMSG, 30: save opportunity\nSAVE_SUCCESS=\\u5DF2\\u4FDD\\u5B58\\u673A\\u4F1A\n\n#XBUT: OK button text\nOK=\\u786E\\u5B9A\n\n#YMSG, 60:  no competitors\nNOCOMPETITORS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u7ADE\\u4E89\\u8005\n\n#YMSG, 60:  no products\nNOPRODUCTS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u4EA7\\u54C1\n\n#YMSG, 30:  no salesteam\nNOPARTIES=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u53C2\\u4E0E\\u8005\\uFF08\\u76F8\\u5173\\u65B9\\uFF09\n\n#YMSG, 30:  no logchange\nNOLOGCHANGE=\\u672A\\u627E\\u5230\\u66F4\\u6539\n\n#YMSG: not a contact or account\nNOT_CONTACT_OR_ACCOUNT=\\u53EA\\u80FD\\u67E5\\u770B\\u5BA2\\u6237\\u6216\\u8054\\u7CFB\\u4EBA\\u7684\\u540D\\u7247\n\n#YMSG: account is null\nACCOUNT_IS_NULL=\\u8981\\u67E5\\u770B\\u540D\\u7247\\uFF0C\\u6307\\u5B9A\\u5BA2\\u6237\\u5FC5\\u987B\\u6709\\u53EF\\u7528\\u7684\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#YMSG: some info missing\nINFO_MISSING=\\u8981\\u67E5\\u770B\\u540D\\u7247\\uFF0C\\u6307\\u5B9A\\u5BA2\\u6237\\u5FC5\\u987B\\u6240\\u6709\\u6240\\u9700\\u8BE6\\u7EC6\\u4FE1\\u606F\\u90FD\\u53EF\\u7528\n\n#YMSG, 30: error\nERROR=\\u9519\\u8BEF\n\n#YMSG: junk value entered for dates\nJUNK_DATE=\\u8F93\\u5165\\u6709\\u6548\\u7684\\u65E5\\u671F\\u503C\n\n#YMSG, 30:  Closing Date\nINVALID_DATE=\\u7ED3\\u675F\\u65E5\\u671F\\u4E0D\\u5F97\\u65E9\\u4E8E\\u5F00\\u59CB\\u65E5\\u671F\n\n#YMSG, 30:  Description\nMAX_CHARS=\\u6DFB\\u52A0\\u63CF\\u8FF0\\uFF08\\u6700\\u591A 40 \\u4E2A\\u5B57\\u7B26\\uFF09\n\n#YMSG, 30:  no notes\nNONOTES=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u6CE8\\u91CA\n\n#YMSG, 60: mandt field in create\nMANDAT_FIELD=\\u5728\\u6240\\u6709\\u5FC5\\u586B\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u76F8\\u5E94\\u503C\n\n#YMSG, 30: save note\nNOTE_SUCCESS=\\u6CE8\\u91CA\\u5DF2\\u4FDD\\u5B58\n\n#YMSG, 50: save fail Note\nNOTE_FAILED=\\u65E0\\u6CD5\\u4FDD\\u5B58\\u6CE8\\u91CA\n#XFLD: Only your tasks are displayed\nLIST_FILTERED_BY_MYITEMS=\\u60A8\\u8D1F\\u8D23 {0} \\u4E2A\\u673A\\u4F1A\\uFF08\\u5171 {1} \\u4E2A\\uFF09\\u3002\\u4EC5\\u663E\\u793A\\u60A8\\u8D1F\\u8D23\\u7684\\u673A\\u4F1A\\u3002 \n\n#XFLD: account ascending\nACTASC=\\u5BA2\\u6237\\uFF08\\u5347\\u5E8F\\uFF09\n\n#XFLD: account descending\nACTDESC=\\u5BA2\\u6237\\uFF08\\u964D\\u5E8F\\uFF09\n\n#XFLD: Status ascending\nSTATASC=\\u72B6\\u6001\\uFF08\\u5347\\u5E8F\\uFF09\n\n#XFLD: Status descending\nSTATDESC=\\u72B6\\u6001\\uFF08\\u964D\\u5E8F\\uFF09\n\n#XFLD: Closing Date ascending\nCLSDATEASC=\\u7ED3\\u675F\\u65E5\\u671F\\uFF08\\u5347\\u5E8F\\uFF09\n\n#XFLD: Closing Date descending\nCLSDATEDESC=\\u7ED3\\u675F\\u65E5\\u671F\\uFF08\\u964D\\u5E8F\\uFF09\n\n#YMSG, 50: text in Dialogbox\nFILTER=\\u6309\\u5BA2\\u6237\\u8FC7\\u6EE4\\uFF1A\n\n#XTIT: title for currency dialog box\nCURRENCY=\\u8D27\\u5E01\n\n#XFLD, 30: Field "THOUSAND" on Master List\nTHOUSAND=\\u5343\n\n#XFLD, 30: Field "THOUSAND" on Master List\nMILLION=\\u767E\\u4E07\n\n#XFLD, 30: Field "BILLION" on Master List\nBILLION=\\u5341\\u4EBF\n\n#YMSG: No Opprtunity found\nNO_OPPR_ERROR=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u673A\\u4F1A\n\n#YMSG: Place holder message\nSEARCH=\\u641C\\u7D22\n\n#XTIT, 30: title in Account F4\nACCOUNT_TITLE=\\u9009\\u62E9\\u5BA2\\u6237\n\n#XTIT, 30: title in Currency F4\nCURRENCY_TITLE=\\u9009\\u62E9\\u8D27\\u5E01\n\n#XTIT, 30: title in Contact F4\nCONTACT_TITLE=\\u9009\\u62E9\\u8054\\u7CFB\\u4EBA\n\n#XFLD, 30: FullName ContactId\nLBL_FULLNAME_CONTACT_ID={0} {1}\n\n#XFLD, 30: Value Currency binding\nVALUE_CURRENCY={0} {1}\n\n#XTIT: Title for Sort By popover\nSORT_BY=\\u6392\\u5E8F\\u65B9\\u5F0F\n\n#XBUT: Share on Jam\nSHARE_ON_JAM=\\u5728 JAM \\u4E2D\\u5171\\u4EAB\n\n#XBUT: Discuss on Jam\nDISCUSS_ON_JAM=\\u5728 JAM \\u4E2D\\u8BA8\\u8BBA\n\n#XFLD: Currency label\nLBL_CURRENCY=\\u8D27\\u5E01\n\n#XFLD: Search Placeholder\nLBL_SEARCH_PLACEHOLDER=\\u641C\\u7D22\n\n#XFLD,20: Loading text when loading/searching list\nLOADING_TEXT=\\u6B63\\u5728\\u52A0\\u8F7D...\n\n#XFLD,20: No Data text when loading/searching list\nNO_DATA_TEXT=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u9879\\u76EE\n\n#XFLD: percentage sign\nPERCENTAGE_SIGN=%\n\n#XFLD, 40: Field "Changed: [value] from off to on" on View tab\nVALUE_TURNED_ON=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531\\u201C\\u5173\\u95ED\\u201D\\u53D8\\u4E3A\\u201C\\u5F00\\u542F\\u201D\n\n#XFLD, 40: Field "Changed: [value] from on to off" on View tab\nVALUE_TURNED_OFF=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531\\u201C\\u5F00\\u542F\\u201D\\u53D8\\u4E3A\\u201C\\u5173\\u95ED\\u201D\n\n#XFLD, 40: Field "Changed: [value] from No value to [new value]" on View tab\nVALUE_CHANGED_FROM_NULL=\\u5DF2\\u66F4\\u6539\\uFF1A{0} \\u7531\\u201C\\u65E0\\u503C\\u201D\\u53D8\\u4E3A {1}\n\n#XFLD, 40: Field "Changed: [value] from [old value] to [new value]" on View tab\nVALUE_CHANGED_FROM=\\u5DF2\\u66F4\\u6539\\uFF1A  "{0}" \\u7531 "{1}" \\u53D8\\u4E3A "{2}"\n\n#YMSG: opportunity saved with errors\nPARTIAL_SAVE=\\u673A\\u4F1A\\u5DF2\\u4FDD\\u5B58\\uFF0C\\u4F46\\u6709\\u9519\\u8BEF\n\n#XFLD,20: No contacts\nNO_CONTACTS=\\u5F53\\u524D\\u65E0\\u53EF\\u7528\\u8054\\u7CFB\\u4EBA\n\n#YMSG: contact not assigned to this account\nNOT_IN_MAIN_CONTACT=\\u53EA\\u80FD\\u67E5\\u770B\\u5206\\u914D\\u7ED9\\u6B64\\u5BA2\\u6237\\u7684\\u8054\\u7CFB\\u4EBA\\u7684\\u540D\\u7247\n\n#XFLD, 40: Field "Weighted Volume in" on Info tab\nUNWEIGHTED_VOLUME_IN=\\u9884\\u671F\\u9500\\u552E\\u989D ({0})\n\n#XFLD: column in product basket\nPRODUCT_OR_CATEGORY=\\u4EA7\\u54C1/\\u7C7B\\u522B\n\n#XTIT: Product Category\nCATEGORY=\\u4EA7\\u54C1\\u7C7B\\u522B\n\n#XTIT: Warning title for data loss pop-up\nWARNING=\\u8B66\\u544A\n\n#YMSG: data loss message\nDATA_LOSS=\\u6240\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\\u5C06\\u4E22\\u5931\\u3002\\u662F\\u5426\\u786E\\u5B9A\\u7EE7\\u7EED\\uFF1F\n\n#XBUT: continue buttonn\nCONTINUE=\\u7EE7\\u7EED\n\n#XBUT: create appointment\nCREATE_APPOINTMENT=\\u521B\\u5EFA\\u9884\\u7EA6\n\n#XBUT: create appointment\nFOLLOW_UP=\\u8DDF\\u8FDB\n\n#XBUT: create task\nCREATE_TASK=\\u521B\\u5EFA\\u4EFB\\u52A1\n\n#XTIT \nEMPLOYEE_TITLE=\\u5458\\u5DE5\n\n#XFLD\nS4.FORM.EMPLOYEE_RESPONSIBLE=\\u8D1F\\u8D23\\u4EBA\n\n#XACT\nSEARCH_EMPLOYEE=\\u641C\\u7D22\\u5458\\u5DE5\n\n#XTIT: sales team \nS3.PARTICIPANTS=\\u53C2\\u4E0E\\u8005 ({0})\n\n#YMSG: no participants\nNO_PARTICIPANTS=\\u672A\\u627E\\u5230\\u53C2\\u4E0E\\u8005\n\n#XACT: search participants place holder\nSEARCH_PARTICIPANTS=\\u641C\\u7D22\\u53C2\\u4E0E\\u8005\n\n#XTIT: select participant\nADD_PARTICIPANTS=\\u6DFB\\u52A0\\u53C2\\u4E0E\\u8005\n\n#YMSG: enter further participants\nTOO_FEW_PARTICIPANTS=\\u81F3\\u5C11\\u5FC5\\u987B\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\n\n#YMSG: too many participants\nTOO_MANY_PARTICIPANTS=\\u6700\\u591A\\u53EA\\u80FD\\u4E3A\\u6B64\\u53C2\\u4E0E\\u8005\\u7C7B\\u578B\\u9009\\u62E9 {0} \\u4E2A\\u53C2\\u4E0E\\u8005\n\n#YMSG: invalid currency message\n\n#YMSG: null currency message\n\n\n\n',
	"cus/crm/opportunity/util/Formatter.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");
jQuery.sap.require("sap.ca.ui.model.format.QuantityFormat");

// NLUN - CodeScan Changes - Global variable / Bad definition
cus.crm.opportunity.util.Formatter = {
    Date: function (oValue) {
    	if(oValue){
    		return sap.ca.ui.model.format.DateFormat.getDateInstance({style: "short"}).format(oValue);
    	}
    	else {
    		return "";
    	}
    },

    currencycode: function (value1) {
    	if(value1){
    		return  sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("UNWEIGHTED_VOLUME_IN",[value1]);
    	}
    	else{
    		return "";
    	}
    },

    statusState: function (value) {

        if (value) {
            if (value == "E0001") {
                return "None";
            }
            if (value == "E0002") {
                return "Warning";
            }
            if (value == "E0003") {
                return "Success";
            }
            if (value == "E0004") {
                return "Error";
            }

        }
        else
            return "None";
    },

    quantity: function (value, value2) {
    	//return sap.ca.ui.model.format.NumberFormat.getInstance().format(value)+" "+ value2;
    	//maybe quantityformatter is even better 
    	
    	var val = cus.crm.opportunity.util.Formatter.formatQuantityEdit(value, value2);
    	return val+" "+ value2;
    },
    
    formatQuantityEdit: function (value, value2) {
    	if(value % 1 == 0)
    		return sap.ca.ui.model.format.QuantityFormat.FormatQuantityStandard(value, value2, "0");
    	else
    		return sap.ca.ui.model.format.QuantityFormat.FormatQuantityStandard(value, value2, "3");
    },
 
    weightedvolume: function (value, value1, value2) {
        var val = value * value1 * 1.00 / 100.00;
        return sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency(val , value2 );
        //if you don't want any decimals  return sap.ca.ui.model.format.AmountFormat.FormatAmountStandardWithCurrency(val , value2, 0);
    },


    formatDescription: function (sText, sDescription) {
        return sText + " : " + sDescription;
    },
    concatenateNameAndId: function (sText, sDescription) {
        return sText + " " + sDescription;
    },   

    volumeFormatter: function (value, currency) {
    	return sap.ca.ui.model.format.AmountFormat.FormatAmountStandard(value , currency );
    },


    dateFormatter: function (oValue) {
   	if(oValue === "" || oValue === null || oValue === undefined)
		return "";
   	
   	if(!(oValue instanceof Date)){
   		 oValue = new Date(oValue);
   	}
   	
  // 	oValue.setMinutes(oValue.getTimezoneOffset());
   	
	var locale = new sap.ui.core.Locale(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().sLocale);
	var formatter = sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},locale);
	return formatter.format(oValue);
   	 
   },


   texttonumber: function (value) {
   	return Number(value);

   },
   
   infotexttonumber: function (value) {
	   	return Number(value) + sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("PERCENTAGE_SIGN") ;

	   },

    checkValue: function (value, value1, val3) {
        // NLUN - CodeScan Changes - Global variable
        var val;
        if (value1 === "X") {
        	val=sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("VALUE_TURNED_ON",[val3]);
        }
        else if ((value === "X")) {
        	val=sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("VALUE_TURNED_OFF",[val3]);
        }
        else{
        	if(value1 === " "){
        		val=sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("VALUE_CHANGED_FROM_NULL",[val3,value1]);
        	}
        	else{
        		val=sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("VALUE_CHANGED_FROM",[val3, value, value1]);
        	}
        }
        return val;

    },


    forecast: function (value) {
        if (value === "X"){
            return true;
        }
        else
        {
            return false;
        }
    },


    mimeTypeFormatter: function (value) {

        switch (value) {
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.ms-powerpoint':
                return 'pptx';
                break;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'doc';
                break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'xls';
                break;
            case 'image/jpeg':
            case 'image/png':
            case 'image/tiff':
            case 'image/gif':
                return 'jpg';
                break;
            case 'application/pdf':
                return 'pdf';
                break;
            case 'text/plain':
                return 'txt';
                break;
            default:
                return 'unknown';
        }
    },
    resetFooterContentRightWidth: function (oController) {
    	// BTHI - Formatter scan : this file should be in the controller not in the formatter file
        var oPage = oController.getView().getContent()[0];
        var rightBar = jQuery.sap.byId(oPage.getFooter().getId() + "-BarRight");
        var iRBWidth = rightBar.outerWidth(true);
        if (iRBWidth > 0) {
            oController.iRBWidth = iRBWidth;
        }
        if (rightBar.width() === 0 && oController.iRBWidth) {
            jQuery.sap.log.info('Update footer contentRight Width=' + oController.iRBWidth);
            rightBar.width(oController.iRBWidth);
        }

    },

    truncateVolume: function(sValue, sCurrency){
    	if(sValue > 0 ){
            return sap.ca.ui.model.format.AmountFormat.FormatAmountShort(sValue , sCurrency );
    	}
    	return "";
    },

//    pictureUrlFormatter: function (accountID) {
//        var URl;
//        var container = sap.ca.scfld.md.app.Application.getImpl().oSplitContainer;
//
//        var oModel = container.getCurrentMasterPage().getModel();
//
//        //else
//        //var oModel = sap.ca.scfld.md.app.Application.getImpl().oSplitContainer.getDetailPages()[0].getController().byId('Sales_Team').getModel();
//
//
//        var oLogo = "sap-icon://person-placeholder";
//
//
//        if (accountID != "" && accountID != undefined) {
//            var sPath = "/AccountCollection('" + accountID + "')";
//            var that = this;
//
//
//            oModel.read(sPath, null, ["$expand=Logo"], false, function (odata, response) {
//                jQuery.sap.log.info("oData account response");
//                if (odata.Logo && odata.Logo.__metadata) {
//                    // defaul account log tbd
//                    var oMetadata = odata.Logo.__metadata.media_src ? odata.Logo.__metadata.media_src: "sap-icon://person-placeholder";
//                    //oLogo = cus.crm.opportunity.util.Formatter.urlConverter(oMetadata);
//                    URl = oMetadata.replace(/^https:\/\//i, 'http://');
//                    oLogo = URl.toString();
//
//                }
//                ;
//
//            });
//            return oLogo;
//        }
//        else {
//            return oLogo;
//        }
//    },

    urlConverter: function (value) {
        var sapServer = jQuery.sap.getUriParameters().get("sap-server");
        var sapHost = jQuery.sap.getUriParameters().get("sap-host");
        var sapHostHttp = jQuery.sap.getUriParameters().get("sap-host-http");
        var sapClient = jQuery.sap.getUriParameters().get("sap-client");
        var oUriString;

        var oUri = URI(value);
        var sCurrentProtocol = location.protocol.replace(':', '');
        if (sCurrentProtocol !== oUri.protocol())
            oUri.protocol(sCurrentProtocol);

        if (sapServer)
            oUri.addSearch('sap-server', sapServer);

        if (sapHost)
            oUri.addSearch('sap-host', sapHost);

        if (sapHostHttp)
            oUri.addSearch('sap-host-http', sapHostHttp);

        if (sapClient)
            oUri.addSearch('sap-client', sapClient);

        oUriString = oUri.toString();
        if (oUriString == "") {
            value = value.replace("https", "http");
            return value;
        }
        else {
            return oUri.toString();
        }
        ;

    },
    
    salesteamplacement : function(value)
    {
    	return "  " + " : " + "  " + value ;
    },
    formatQuantityField : function(oValue)
	{
		
		if(oValue === null)
			return false;
		
		return true;
		
	},
	formatDeleteButton : function(oValue)
	{
		
		if(oValue === null)
			return false;
		
		return true;
		
	},
	formatProdClassification : function(oValue)
	{
		var oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel.getResourceBundle();
		if(oValue !== null)
			return oResourceBundle.getText('PRODUCT');
		else
			return oResourceBundle.getText('CATEGORY');
		
		
		
	},
	formatProductName : function(oValue)
	{
		
		if(oValue !== null)
			return this.getBindingContext('json').getObject().ProductName;
		return this.getBindingContext('json').getObject().ProductCategory;
		
	},
	formatAddMoreProductsText : function(sText){
		
		if(jQuery.device.is.phone)
			return "";
		
		return sText;
		
		
	},
	formatParticipant : function(sPartnerFunctionCode){
		
		var s3Controller = this.getParent().getParent().data("controller");
		
		//check backend schema versioning - if it is less than 2.0 the visibility should be false 
		var dataServiceVersion= parseFloat(s3Controller.sBackendVersion);
		if(dataServiceVersion < 2)	
			return false;
		
		var oPartnerFunctionRule = s3Controller.getRuleForPartnerFunction(sPartnerFunctionCode);
		
		if(oPartnerFunctionRule === null){
			return false;
		}
		
		/*if(!s3Controller.partnerFunctionMap.hasOwnProperty(sPartnerFunctionCode)){
		      s3Controller.partnerFunctionMap[sPartnerFunctionCode] = 1;	
		}
		else{
			
			  s3Controller.partnerFunctionMap[sPartnerFunctionCode]++;
		}
		
		if(!oPartnerFunctionRule.ChangeableFlag && s3Controller.partnerFunctionMap[sPartnerFunctionCode] >  oPartnerFunctionRule.CountHigh){
			
			return true;
		}
		
        if(!oPartnerFunctionRule.ChangeableFlag && s3Controller.partnerFunctionMap[sPartnerFunctionCode] <=  oPartnerFunctionRule.CountHigh){
			
			return false;
		}*/
		
		if(!oPartnerFunctionRule.ChangeableFlag){
			return false;
		}
		
		
		
		return true;
	},
	
	formatParticipantDelete : function(sPartnerFunctionCode){
    	
    	
    	var s3Controller = this.getParent().getParent().data("controller");
    	
    	//check backend schema versioning - if it is less than 2.0 the visibility should be false
    	if(parseFloat(s3Controller.sBackendVersion)   < 2)
    		return false;
		
    	var oPartnerFunctionRule = s3Controller.getRuleForPartnerFunction(sPartnerFunctionCode);
		
		if(oPartnerFunctionRule === null){
			return false;
		}
		
	/*	if(!s3Controller.partnerFunctionMap.hasOwnProperty(sPartnerFunctionCode)){
		      s3Controller.partnerFunctionMap[sPartnerFunctionCode] = 1;	
		}
		else{
			
			  s3Controller.partnerFunctionMap[sPartnerFunctionCode]++;
		}
		
		if(!oPartnerFunctionRule.ChangeableFlag && s3Controller.partnerFunctionMap[sPartnerFunctionCode] >  oPartnerFunctionRule.CountHigh){
			
			return true;
		}
		
        if(!oPartnerFunctionRule.ChangeableFlag && s3Controller.partnerFunctionMap[sPartnerFunctionCode] <=  oPartnerFunctionRule.CountHigh){
			
			return false;
		}
		*/
	    
		if(!oPartnerFunctionRule.ChangeableFlag){
			return false;
		}
		
		
		return true;
    	
    },
    formatEmployeeRespField : function(sBackendVersion){	
		     if(parseInt(sBackendVersion) < 2){	
		      return false;	
		     }
		    return true;
	},
	//filling account id if account name is empty - for view page
	 formatProspect:function(prospect_name,prospect_number)
	    {
	    	if(prospect_name==="")
	    		return prospect_number;
	    	return prospect_name;
	    },
	    formatBusinessCardCaller : function(sPartnerName,sPartnerNumber){
			
			var s3Controller = this.getParent().getParent().getParent().data("controller");
		    var sPartnerFunctionCode = this.getBindingContext('json').getObject().PartnerFunctionCode;
				switch (sPartnerFunctionCode){
				case  '00000014' :
					                this.attachPress(s3Controller.onEmpBusCardLaunch,s3Controller);
			    break;
				case  '00000015' :
				case  '00000021' :	
				   this.attachPress(s3Controller.onEmployeeLaunch,s3Controller);
					break;
			    default : 
			    	this.attachPress(s3Controller.onAccountBusCardLaunch,s3Controller);
				}
				
				
			return (sPartnerName === "") ? sPartnerNumber : sPartnerName;	
			},
			formatPhotoUrl : function(mediaUrl) {
				return mediaUrl ? mediaUrl : "sap-icon://person-placeholder";
			},
			/*urlConverter : function(value) {

				var sapServer = jQuery.sap.getUriParameters().get("sap-server");
				var sapHost = jQuery.sap.getUriParameters().get("sap-host");
				var sapHostHttp = jQuery.sap.getUriParameters().get("sap-host-http");
				var sapClient = jQuery.sap.getUriParameters().get("sap-client");
				var oUriString;
									
				var oUri = URI(value);
				var sCurrentProtocol = location.protocol.replace(':','');
				if (sCurrentProtocol !== oUri.protocol()) {
						oUri.protocol(sCurrentProtocol);
				}
				if (sapServer) {
					oUri.addSearch('sap-server', sapServer);
				}
				if (sapHost) {
					oUri.addSearch('sap-host', sapHost);		
				}
				if (sapHostHttp) {
					oUri.addSearch('sap-host-http', sapHostHttp);
				}
				if (sapClient) {
					oUri.addSearch('sap-client', sapClient);		
				}
				oUriString = oUri.toString();
				if (oUriString == "") {
					value = value.replace("https", "http");
					return value;
				}
				else {
					return oUri.toString();
				}
					
			},*/
			formatAccountF4Description : function(accountID, city, country){
				
				var sReturn = accountID;
				
				if(city){
					sReturn += " / " + city;
					if(country){
						sReturn += ", " + country; 
					}
					
				}
				else{
					if(country){
						sReturn += " / " + country;
					}
					
				}
				
				return sReturn;
			}	,
			getAccountF4Title : function(fullName){
				var text = " ";
				
				if (fullName){
					text = fullName;
				}
				
				return text;
			},
			
			removeMarginInPhone : function(sImgSrc){
				
				if(jQuery.device.is.phone){
					this.addStyleClass("removeMargin");
				}
				return sImgSrc;
			},
			
			addLayoutPadding : function(bPhone){
				if(bPhone){
					this.addStyleClass("ImagePaddingMobile");
				}
				else{
					this.addStyleClass("ImagePadding");
				}
				
				return true;
			},
			
			formatPartnerName : function(sPartnerName,sPartnerNumber){
				return (sPartnerName === "") ? sPartnerNumber : sPartnerName;
			},
			
			notesDateFormatter: function (oValue) {
				   	if(oValue === "" || oValue === null || oValue === undefined)
						return "";
				   	
				   	if(!(oValue instanceof Date)){
				   		 oValue = new Date(oValue);
				   	}
				   	
				   	oValue.setMinutes(oValue.getTimezoneOffset());
				   	
					var locale = new sap.ui.core.Locale(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().sLocale);
					var formatter = sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},locale);
					return formatter.format(oValue);
				   	 
				   }
			
			

		    

};


},
	"cus/crm/opportunity/util/schema.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cus.crm.opportunity.util.schema");

cus.crm.opportunity.util.schema = {
		
		_getEntityAnnotation : function(oModel, sAnnotationName,
				sEntityName) {
			// retrieve the metadata of the passed OData model
			var oModelMetadata = oModel.getServiceMetadata();
			// check for proper metadata structure
			if ((oModelMetadata != null)
					&& (oModelMetadata.dataServices != null)
					&& (oModelMetadata.dataServices.schema != null)
					&& (oModelMetadata.dataServices.schema.length > 0)
					&& (oModelMetadata.dataServices.schema[0].entityType != null)) {
				// determine the annotation by name using the first
				// annotated entity
				var entityTypes = oModelMetadata.dataServices.schema[0].entityType;
				// loop the entities
				for ( var i = 0; i < entityTypes.length; i++) {
					if (sEntityName === entityTypes[i].name
							&& entityTypes[i].extensions != null)
						// loop the annotations of the the entity
						for ( var j = 0; j < entityTypes[i].extensions.length; j++) {
							if (entityTypes[i].extensions[j].name === sAnnotationName)
								return entityTypes[i].extensions[j].value;
						}

				}
			}
			return null;
		},

		_getServiceSchemaVersion : function(oModel, sEntityName) { 
			var version = this._getEntityAnnotation(oModel,
					"service-schema-version", sEntityName);
			// defaults to initial service schema version (1)
			return (version != null) ? version : "1";
		},

		_getServiceVersion : function(oModel, sEntityName) {
			var version = this._getEntityAnnotation(oModel,
					"service-version", sEntityName);
			// defaults to initial service version (1)
			return (version != null) ? parseInt(version) : 1;
		},
      
	
		
};
},
	"cus/crm/opportunity/view/AccountSelectDialog.fragment.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<SelectDialog\r\n        xmlns="sap.m"\r\n        xmlns:core="sap.ui.core"\r\n      \r\n        title="{i18n>ACCOUNT_TITLE}"\r\n        noDataText="{i18n>LOADING_TEXT}"\r\n        multiSelect=""\r\n        confirm="setAccount"\r\n        search="searchAccount">\r\n        \r\n</SelectDialog>',
	"cus/crm/opportunity/view/ChangeLog.fragment.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<Dialog xmlns:ca="sap.ca.ui" xmlns="sap.m" title="{i18n>LOG_CHANGE}" id="logchange" placement="Top" contentWidth="480px" contentHeight="720px" class="DialogPadding"> \r\n\r\n\t\t<content>\r\n\t\t\t<List  noDataText="{i18n>LOADING_TEXT}" items="{/OpportunityChangeDocs}">\r\n\r\n\t\t\t\t<items>\r\n\t\t\t\t\t<ca:ExpansibleFeedListItem  showIcon="false"\r\n\t\t\t\t\t\tsender="{PartnerName}"\r\n\t\t\t\t\t\ttext="{parts:[{path:\'OldValue\'}, {path:\'NewValue\'}, {path:\'UpdateFieldText\'}], formatter:\'cus.crm.opportunity.util.Formatter.checkValue\'}"\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\ttimestamp="{path: \'UpdateDate\', formatter:\'cus.crm.opportunity.util.Formatter.dateFormatter\'}">\r\n\r\n\t\t\t\t\t</ca:ExpansibleFeedListItem>\r\n\t\t\t\t</items>\r\n\t\t\t</List>\r\n\t\t</content>\r\n\r\n\t\t\t<beginButton>\r\n\t\t\t<Button text="{i18n>OK}" press="onCancelLogChange"></Button>\r\n\t\t</beginButton>\r\n\r\n\t</Dialog>\r\n',
	"cus/crm/opportunity/view/ContactF4.fragment.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n <Dialog id="dialogContactF4" xmlns="sap.m" title="{i18n>CONTACT_TITLE}"\r\n\tcontentWidth="480px" contentHeight="720px" class="DialogPadding">\r\n\r\n\r\n\t<subHeader>\r\n\t\t<Bar>\r\n\t\t\t<contentLeft>\r\n\t\t\t\t<SearchField placeholder="{i18n>SEARCH_CONTACTS}"\r\n\t\t\t\t\tsearch="searchContact"></SearchField>\r\n\t\t\t</contentLeft>\r\n\t\t</Bar>\r\n\r\n\t</subHeader>\r\n\t<content>\r\n\t\t<List id="contactList" noDataText="{i18n>NO_CONTACTS}" mode="SingleSelectMaster"\r\n\t\t\titems="{json>/ContactCollection}" selectionChange="setContact"\r\n\t\t\tgrowing="true">\r\n\t\t\t<items>\r\n\t\t\t\t<ObjectListItem\r\n\t\t\t\t\ttitle="{parts: [{path:\'i18n>LBL_FULLNAME_CONTACT_ID\'}, {path:\'json>fullName\'} ,{path:\'json>contactID\'}], formatter:\'jQuery.sap.formatMessage\'}">\r\n\t\t\t\t\t<attributes>\r\n\t\t\t\t\t\t<ObjectAttribute text="{json>company}">\r\n\t\t\t\t\t\t</ObjectAttribute>\r\n\t\t\t\t\t\t<ObjectAttribute text="{json>function}">\r\n\t\t\t\t\t\t</ObjectAttribute>\r\n\t\t\t\t\t</attributes>\r\n\t\t\t\t</ObjectListItem>\r\n\t\t\t</items>\r\n\t\t\t<infoToolbar>\r\n\t\t\t\t<Toolbar id="contactF4Toolbar" active="false">\r\n\t\t\t\t\t<content>\r\n\t\t\t\t\t\t<Label id="filterByLabel" text=""></Label>\r\n\t\t\t\t\t\t<ToolbarSpacer></ToolbarSpacer>\r\n\t\t\t\t\t\t<Button id="XButton" type="Transparent" icon="sap-icon://sys-cancel-2"\r\n\t\t\t\t\t\t\tpress="closeToolbar"></Button> \r\n\r\n\t\t\t\t\t</content>\r\n\t\t\t\t</Toolbar>\r\n\t\t\t</infoToolbar>\r\n\t\t</List>\r\n\t</content>\r\n\t<beginButton>\r\n\t\t<Button text="{i18n>CANCEL}" press="closeContactF4">\r\n\t\t</Button>\r\n\t</beginButton>\r\n</Dialog>\r\n',
	"cus/crm/opportunity/view/CurrencySelectDialog.fragment.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<SelectDialog\r\n        xmlns="sap.m"\r\n        xmlns:core="sap.ui.core"\r\n      \r\n        title="{i18n>CURRENCY_TITLE}"\r\n        noDataText="{i18n>NO_DATA_TEXT}"\r\n        multiSelect=""\r\n        items="{path : \'json>/Currencies\',  parameters: {expand: \'MainAddress\'}}"\r\n        search="searchCurrency"\r\n        confirm="setCurrency">\r\n    <StandardListItem title="{json>CurrencyText}" description="{json>CurrencyKey}">\r\n        <customData>\r\n            <core:CustomData key="CurrencyKey" value="{json>CurrencyKey}"/>\r\n        </customData>\r\n    </StandardListItem>\r\n</SelectDialog>',
	"cus/crm/opportunity/view/EmployeeF4.fragment.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<Dialog id="dialogEmployeeF4" xmlns="sap.m" title="{i18n>EMPLOYEE_TITLE}"\n\tcontentWidth="480px" contentHeight="720px" class="DialogPadding">\n\n\n\t<subHeader>\n\t\t<Bar>\n\t\t\t<contentLeft>\n\t\t\t\t<SearchField placeholder="{i18n>SEARCH_EMPLOYEE}"\n\t\t\t\t\tsearch="searchEmployee"></SearchField>\n\t\t\t</contentLeft>\n\t\t</Bar>\n\n\t</subHeader>\n\t<content>\n\t\t<List id="employeeList" noDataText="{i18n>NO_DATA_TEXT}" mode="SingleSelectMaster"\n\t\t\titems="{json>/EmployeeCollection}" selectionChange="setEmployee"\n\t\t\tgrowing="true" value="true">\n\t\t\t<items>\n\t\t\t\t<ObjectListItem\n\t\t\t\t\ttitle="{path:\'json>fullName\'}">\n\t\t\t\t\t<attributes>\n\t\t\t\t\t\t<ObjectAttribute text="{json>employeeID}">\n\t\t\t\t\t\t</ObjectAttribute>\n\t\t\t\t\t\t\n\t\t\t\t\t</attributes>\n\t\t\t\t</ObjectListItem>\n\t\t\t</items>\n\t\t\t<infoToolbar>\n\t\t\t\t<Toolbar id="employeeF4Toolbar" active="false">\n\t\t\t\t\t<content>\n\t\t\t\t\t\t<Label id="filterByLabel" text=""></Label>\n\t\t\t\t\t\t<ToolbarSpacer></ToolbarSpacer>\n\t\t\t\t\t\t<Button id="XButton" type="Transparent" icon="sap-icon://sys-cancel-2"\n\t\t\t\t\t\t\tpress="closeEmpToolbar"></Button>\n\n\t\t\t\t\t</content>\n\t\t\t\t</Toolbar>\n\t\t\t</infoToolbar>\n\t\t</List>\n\t</content>\n\n\t<beginButton>\n\t\t<Button text="{i18n>CANCEL}" press="closeEmployeeF4" />\n\t</beginButton>\n\n</Dialog>\n',
	"cus/crm/opportunity/view/ParticipantsF4.fragment.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<Dialog id="dialogParticipantsF4" xmlns="sap.m" xmlns:core="sap.ui.core"\n\ttitle="{i18n>ADD_PARTICIPANTS}" contentWidth="480px" contentHeight="720px">\n\t<Select id="selectParticipants" items="{json>/PartnerFunctions}" autoAdjustWidth="false" width=\'100%\' >\n\t\t<items>\n\t\t\t\t<core:Item text="{json>PartnerFunctionName}" key="{json>PartnerFunctionCategory}"> </core:Item >\n\t\t</items>\n\t</Select>\n\t<SearchField \n\t\tsearch="searchParticipants" liveChange="searchEmployee"></SearchField>\n\t<content>\n\t\t<List id="participantsList"  mode="MultiSelect"\n\t\t selectionChange="checkMinMaxRules"\n\t\t\tgrowing="true">\n\t   </List>\n\t</content>\n\t<beginButton>\n\t\t<Button text="{i18n>ADD}" press="addParticipants">\n\t\t</Button>\n\t</beginButton>\n\t<endButton>\n\t\t<Button text="{i18n>CANCEL}" press="closeParticipantsF4">\n\t\t</Button>\n\t</endButton>\n</Dialog>\n',
	"cus/crm/opportunity/view/ProcessTypeDialog.fragment.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<SelectDialog\n        xmlns="sap.m"\n        xmlns:core="sap.ui.core"\n        \n        title="{i18n>PROCESS_TYPE}"\n        \n        multiSelect=""\n        items="{json>/ProcessTypes}"\n       \tsearch="searchProcess"\n        confirm="selectProcess">\n    <StandardListItem title="{json>Description}" description="{json>ProcessTypeCode}">\n        <customData>\n            <core:CustomData key="ProcessTypeCode" value="{json>ProcessTypeCode}"/>\n            <core:CustomData key="ProcessTypeDescription" value="{json>Description}" />\n            <core:CustomData key="PrivateFlag" value="{json>PrivateFlag}" />\n        </customData>\n    </StandardListItem>\n</SelectDialog>\n\n <!--  -->',
	"cus/crm/opportunity/view/ProductBasketDialog.fragment.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n\t<Dialog title="{i18n>PRODUCT_CAT}" xmlns="sap.m"  contentHeight="720px">\r\n\t\t<subHeader>\r\n\t\t\t<Bar>\r\n\t\t\t\t<contentLeft>\r\n\t\t\t\t\t<SearchField  search="onSearchProduct"\r\n\t\t\t\t\t\tplaceholder="{i18n>SEARCH}"></SearchField>\r\n\t\t\t\t</contentLeft>\r\n\t\t\t</Bar>\r\n\r\n\t\t</subHeader>\r\n\r\n\t\t<content>\r\n\t\t\t<List  noDataText="{i18n>LOADING_TEXT}" counter="3" items="{json>/Products}"\r\n\t\t\t\tmode="MultiSelect" growing="true" selectionChange="enableProductsAddButton">\r\n\t\t\t\t<items>\r\n\t\t\t\t\t<ObjectListItem  title="{json>ProductDescription}">\r\n\r\n\t\t\t\t\t\t<attributes>\r\n\t\t\t\t\t\t\t<ObjectAttribute text="{json>BaseCategoryText}" />\r\n\r\n\t\t\t\t\t\t</attributes>\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t</ObjectListItem>\r\n\r\n\t\t\t\t</items>\r\n\r\n\t\t\t</List>\r\n\t\t</content>\r\n\r\n\t\t<beginButton>\r\n\r\n\t\t\t<Button text="{i18n>ADD}" press="onAddDialog" ></Button>\r\n\t\t</beginButton>\r\n\t\t<endButton>\r\n\t\t\t<Button  text="{i18n>CANCEL}" press="onCancelDialog"></Button>\r\n\t\t</endButton>\r\n\t</Dialog>',
	"cus/crm/opportunity/view/S2.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseMasterController");

sap.ca.scfld.md.controller.BaseMasterController
		.extend(
				"cus.crm.opportunity.view.S2",
				{
					processType : "",
					numberOfOpportunity : 0,
					firstCall : "",
					desc : undefined,
					nGuid : undefined,
					bAppLaunched : true,
					onInit : function() {

						// execute the onInit for the base class
						// BaseDetailController
						sap.ca.scfld.md.controller.BaseMasterController.prototype.onInit
								.call(this);
						var oControllers = new sap.ui.model.json.JSONModel({s2Controller : this});						
						this.oApplicationFacade.setApplicationModel("s2Controller",oControllers);
						
						var view = this.getView();
						var self = this;
						this.guid = undefined;
						this.accountID = undefined;
						this.opportunityID = undefined;

						// When Coming from Account app
						// Get accountID query parameter
						var sComponentId = sap.ui.core.Component
								.getOwnerIdFor(this.getView());
						var myComponent = sap.ui.component(sComponentId);

						this.oResourceBundle = sap.ca.scfld.md.app.Application
								.getImpl().getResourceBundle();

						if (myComponent
								&& myComponent.getComponentData()
								&& myComponent.getComponentData().startupParameters) {
							var startupParameters = myComponent
									.getComponentData().startupParameters;
							jQuery.sap.log.debug("startup parameters are "
									+ JSON.stringify(startupParameters));
							if (myComponent.QtyForAccountID) {
								this.QtyForAccountID = myComponent.QtyForAccountID;
							}
							if (startupParameters.accountID != null) {
								if (undefined != startupParameters.accountID) {
									this.accountID = startupParameters.accountID[0];
								}
							} else if (startupParameters.opportunityID != null) {
								this.opportunityID = startupParameters.opportunityID[0];
							} else {
								if (startupParameters.guid != null) {
									if (undefined != startupParameters.guid) {
										this.guid = startupParameters.guid[0];
									}
								}
							}

						}
						this.oShowSheet = sap.ui.xmlfragment(this
								.createId("showFragment"),
								"cus.crm.opportunity.view.showMaxHit",

								this);
						// Binding moved to here from xml so that filters can be
						// dynamically(Needed to pass account id dynamically)
						var oList = this.getList();
						var oTemplate = oList.getItems()[0].clone();
						var afilters = this.getFilters();
						oList.bindAggregation("items", {
							path : '/Opportunities',
							template : oTemplate,
							filters : afilters
						});
						var oModel = this.getView().getModel();

						oModel.bRefreshAfterChange = false;
						// register success handler

						var successHandler = function(oEvent) {
							var numberOfOpps = this.getList().getBinding(
									'items').getLength();

							if (this.nGuid !== undefined) {
								this.byId("labelInfo").setText(this.desc);
								this.byId("toolbarInfo").setVisible(true);

							}
							if (this.accountID != undefined
									&& this.desc === undefined) {
								if (!this.bAccountNameFound) {
									this.setAccountName();
								} else {
									this.byId("labelInfo").setText(
											this.sProspectName);
									this.byId('toolbarInfo').setVisible(true);
								}
							}
							if (typeof cus.crm.myaccounts !== 'undefined'
									&& typeof cus.crm.myaccounts.NavigationHelper !== 'undefined'
									&& typeof cus.crm.myaccounts.NavigationHelper.qty !== 'undefined') {
								if (cus.crm.myaccounts.NavigationHelper.qty > numberOfOpps
										&& typeof this.accountID !== 'undefined') {
									sap.ca.ui.message
											.showMessageToast(this.oApplicationFacade
													.getResourceBundle()
													.getText(
															"LIST_FILTERED_BY_MYITEMS",
															[
																	numberOfOpps,
																	cus.crm.myaccounts.NavigationHelper.qty ]));

								}
								;

								// Not needed again. Clear the variable
								cus.crm.myaccounts.NavigationHelper.qty = undefined;
							}
							;
						};

						if (oModel != undefined)
							oModel.attachRequestCompleted(jQuery.proxy(
									successHandler, this));

						var numberOfOpps = this.getList().getBinding('items')
								.getLength();
						/* Set No data text when zero opp found */
						if (numberOfOpps <= 0) {
							this.getList().setNoDataText(
									sap.ca.scfld.md.app.Application.getImpl()
											.getResourceBundle().getText(
													"NO_DATA_TEXT"));
						}

					},

					setAccountName : function() {
						var oList = this.getList(), aItems = oList.getItems(), oBindingContext, oElement;
						if (aItems.length > 0) {
							oBindingContext = aItems[0].getBindingContext();
							if (oBindingContext && oBindingContext.sPath) {
								this.byId("toolbarInfo").setVisible(true);
								oElement = oList.getModel().getProperty(
										oBindingContext.sPath);
								if (oElement
										&& oElement.ProspectNumber === this.accountID) {
									this.byId("labelInfo").setText(
											sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('FILTER')
													+ " "
													+ oElement.ProspectName);
									this.bAccountNameFound = true;
									this.sProspectName = (oElement.ProspectName !== "") ? oElement.ProspectName
											: oElement.ProspectNumber;
								} else {
									this.bAccountNameFound = false;
									this.byId("toolbarInfo").setVisible(false);
								}
							}
						}
					},

					onBeforeRendering : function() {

						this.getView().getModel("controllers").getData().s2Controller = this;
					},
					// get filter to set Accound(needed for cross app nav)
					getFilters : function() {
						var filters = [];

						if (undefined != this.accountID
								&& this.nGuid === undefined) {
							// Guid from create screen gets preference over
							// accountID
							filters.push(new sap.ui.model.Filter(
									"ProspectNumber",
									sap.ui.model.FilterOperator.EQ,
									this.accountID));
						}

						if (undefined != this.opportunityID) {
							filters.push(new sap.ui.model.Filter("Id",
									sap.ui.model.FilterOperator.EQ,
									this.opportunityID));
						}
						if (undefined != this.nGuid) {
							filters
									.push(new sap.ui.model.Filter("Guid",
											sap.ui.model.FilterOperator.EQ,
											this.nGuid));
						}
						if (undefined != this.guid) {
							filters.push(new sap.ui.model.Filter("Guid",
									sap.ui.model.FilterOperator.EQ, this.guid));
						}
						return filters;
					},

					// Select Item to set the detail in S3
					setListItem : function(oItem) {
						if (this.bAppLaunched)
							this.prevItem = oItem;
						this.oItem = oItem;
						this.getList().removeSelections();

						if (this.prevItem) {
							this.getList().setSelectedItem(this.prevItem);
						}

						var currentDetailPage = sap.ca.scfld.md.app.Application
								.getImpl().oSplitContainer
								.getCurrentDetailPage();
						var editController = this.getView().getModel(
								'controllers').getData().s4Controller;
						var createController = this.getView().getModel(
								'controllers').getData().s5Controller;
						if (!this.bAppLaunched
								&& currentDetailPage
								&& editController
								&& (editController.getView() === currentDetailPage)) {
							// we are in the edit page

							var s4Controller = this.getS4Controller();
							if (s4Controller && s4Controller._checkDataLoss()) {
								sap.ca.ui.dialog.confirmation
										.open(
												{
													question : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText(
																	'DATA_LOSS'),
													title : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText('WARNING'),
													confirmButtonLabel : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText('CONTINUE')

												}, jQuery.proxy(
														this.datalossDismissed,
														this));

								return;
							}

						}
						if (!this.bAppLaunched
								&& currentDetailPage
								&& createController
								&& (createController.getView() === currentDetailPage)) {

							sap.ca.ui.dialog.confirmation
									.open(
											{
												question : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('DATA_LOSS'),
												title : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('WARNING'),
												confirmButtonLabel : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('CONTINUE')

											}, jQuery.proxy(
													this.datalossDismissed,
													this));
							return;
						}
						this.goToDetailPage(oItem);

					},

					goToDetailPage : function(oItem) {

						var oList = this.getList();
						oList.removeSelections();
						oItem.setSelected(true);
						oList.setSelectedItem(oItem, true);
						this.prevItem = oItem;
						// needed to enable the buttons, when list is selected
						// again during create
						if (this.firstCall != "") {
							this.firstCall = "";
							this.setBtnEnabled("sort", true);
							this.setBtnEnabled("BTN_S2_ADD", true);
							this.setBtnEnabled("BTN_S2_SHOW", true);
						}
						var sComponentId = sap.ui.core.Component
								.getOwnerIdFor(this.getView());
						var myComponent = sap.ui.component(sComponentId);

						// not coming from sp, need master deail both

						this.oRouter.navTo("detail", {
							contextPath : oItem.getBindingContext().sPath
									.substr(1)
						});

					},
					datalossDismissed : function(oResult) {
						var s4Controller = this.getS4Controller();
						// clear batch anyway that was framed during
						// pageNeedsUpate of s4 controller
						this.getList().getModel().clearBatch();
						if (oResult.isConfirmed === false) {
							this.getList().setSelectedItem(this.prevItem);
							return;
						}

						// cleaning up buffer as we move to another page and
						// discard any changes in edit page
						if (s4Controller)
							s4Controller.deleteBuffer = [];
						this.goToDetailPage(this.oItem);
					},

					getS3Controller : function() {

						return this.getView().getModel('controllers').getData().s3Controller;
					},

					getS4Controller : function() {
						return this.getView().getModel('controllers').getData().s4Controller;

					},

					// To get the Header(search) and footer part
					getHeaderFooterOptions : function() {
						var that = this;
						var numberofOpportunity = 0;
						var oBinding = this.byId("list").getBinding("items");
						if (oBinding != undefined && oBinding != "") {
							numberofOpportunity = oBinding.length;
						}
						var oHeaderFooterOptions = {
							onBack : jQuery.proxy(this.onBack, this),
							sI18NMasterTitle : this.oApplicationFacade
									.getResourceBundle()
									.getText("MASTER_TITLE",
											numberofOpportunity),
							oSortOptions : {
								sId : "sort",
								aSortItems : [
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('CLSDATEASC'),
											key : "ClosingDate"
										},
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('CLSDATEDESC'),
											key : "ClosingDate2"
										},
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('ACTASC'),
											key : "ProspectName"
										},
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('ACTDESC'),
											key : "ProspectName2"
										},
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('STATASC'),
											key : "UserStatusText"
										},
										{
											text : sap.ca.scfld.md.app.Application
													.getImpl()
													.getResourceBundle()
													.getText('STATDESC'),
											key : "UserStatusText2"
										} ],
								onSortSelected : function(key) {

									that.applySort(key);

								}
							},
							buttonList : [ {
								sI18nBtnTxt : sap.ca.scfld.md.app.Application
								.getImpl()
								.getResourceBundle()
								.getText('LIST_SETTING'),
								sId : "BTN_S2_SHOW",
								sIcon : "sap-icon://show",
								onBtnPressed : function(sKey) {
									jQuery.proxy(that.onShow(sKey), this);
								}
							}, ],
							oAddOptions : {
								sId : "BTN_S2_ADD",
								onBtnPressed : function(sKey) {
									jQuery.proxy(that.onCreate(sKey), this);
								}
							}
						};
						// EXTENSION POINT to be able to extend header footer
						// options
						/**
						 * @ControllerHook extHookGetHeaderFooterOptions is the
						 *                 controller hook where the
						 *                 headerFooterOptions can be extended.
						 *                 Attributes like master list title,
						 *                 filters can be defined in addition to
						 *                 the existing headerFooterOptions
						 * 
						 * @callback cus.crm.opportunity.S2.controller~extHookGetHeaderFooterOptions
						 * @param {object}
						 *            oHeaderFooterOptions
						 * @return {void}
						 */
						if (this.extHookGetHeaderFooterOptions)
							this
									.extHookGetHeaderFooterOptions(oHeaderFooterOptions);
						return oHeaderFooterOptions;
					},

					// Handle Sort
					applySort : function(key) {
						if (key === "ProspectName2"
								|| key === "UserStatusText2"
								|| key === "ClosingDate2") {
							if (key === "ProspectName2") {
								key = "ProspectName";
							} else if (key === "UserStatusText2") {
								key = "UserStatusText";
							} else
								key = "ClosingDate";
							var oSorter = new sap.ui.model.Sorter(key, true,
									false);
						} else
							var oSorter = new sap.ui.model.Sorter(key, false,
									false);
						this.getHeaderFooterOptions().oSortOptions.sSelectedItemKey = key;
						this.getView().byId('list').getBinding("items").aSorters = [];
						this.getView().byId('list').getBinding("items").aSorters = [ oSorter ];
						this.getView().byId('list').getBinding("items").sort(
								oSorter);
					},

					/**
					 * @override
					 * 
					 * @param oItem
					 * @param sFilterPattern
					 * @returns {*}
					 */
					isBackendSearch : function() {
						sap.ca.scfld.md.controller.BaseMasterController.prototype.applyBackendSearchPattern
								.call(this);
						return true;
					},

					// For backend Search
					applyBackendSearchPattern : function(sFilterPattern,
							oBinding) {
						var filters = this.getFilters();
						var olist = this.getList();
						this.getList().setNoDataText(
								sap.ca.scfld.md.app.Application.getImpl()
										.getResourceBundle().getText(
												"LOADING_TEXT"));
						var sValue = sFilterPattern;
						if (sValue && sValue.length > 0) {
							filters.push(new sap.ui.model.Filter("Description",
									sap.ui.model.FilterOperator.Contains,
									sValue));
						}
						oBinding.aApplicationFilters = [];
						// update master list binding
						oBinding.filter(filters);

						var oListBinding = this.getList().getBinding("items");
						if (!jQuery.device.is.phone) {
							// oListBinding.attachChange(this._selectFirstElement,
							// this);
						}
						if (this.nGuid != undefined)
							oListBinding.attachChange(this._selectContextPath,
									this);
						this.getView().byId("toolbarInfo").setVisible(false);

					},

					// Click on create button
					onCreate : function(oEvent) {

						// if (!this.oActionSheet) {
  
						var oModel = this.getView().getModel();
                    	var data1;
						oModel.read("ProcessTypes", null, null, false,
								jQuery.proxy(function(oData, resp) // [
														// "$filter=ProcessType
														// eq '" + pType+ "'" ]
								{
									data1 = {
										ProcessTypes : resp.data.results
									};
									
									if (data1.ProcessTypes.length == 1) {
										this.onlyOneProcessType = true;
										this.processType = data1.ProcessTypes[0].ProcessTypeCode;
										this.processTypeDesc = data1.ProcessTypes[0].ProcessTypeDescription;
										this.selectProcess();

									} else {

										this.oActionSheet = sap.ui
												.xmlfragment(
														"cus.crm.opportunity.view.ProcessTypeDialog",

														this);
										this.oActionSheet.setModel(this.getView().getModel(
												"i18n"), "i18n");
										var jsonModel = new sap.ui.model.json.JSONModel();
										jsonModel.setData(data1);
										this.oActionSheet.setModel(jsonModel, "json");
										this.oActionSheet._searchField
												.setPlaceholder(sap.ca.scfld.md.app.Application
														.getImpl().getResourceBundle()
														.getText("SEARCH"));
										this.oActionSheet._list
												.setGrowingScrollToLoad(true);
										this.oActionSheet._dialog
												.setVerticalScrolling(true);
										this.oActionSheet.open();
									}

								},this),jQuery.proxy(function(oError){
							        this.handleErrors(oError);
								},this));

				
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
					onShow : function(oEvent) {
						var that = this;
						var oModel = this.getView().getModel();
						var maxHitData;

						oModel
								.read(
										"RetrieveMaxHit",
										null,
										null,
										false,
										function(oData, resp) {
											maxHitData = {
												RetrieveMaxHit : resp.data.RetrieveMaxHit
											};

										});
						this.oldValue = maxHitData.RetrieveMaxHit.MaxHitNumber;

						this.oShowSheet.setModel(this.getView()
								.getModel("i18n"), "i18n");
						var jsonModel = new sap.ui.model.json.JSONModel();
						jsonModel.setData(maxHitData);
						this.oShowSheet.setModel(jsonModel, "showJson");

						this.oShowSheet.open();

					},

					closeShow : function(oEvent) {

						this.oShowSheet.close();
					},

					saveMaxHit : function(oEvent) {

						this.oModel = this.getView().getModel();
						var value = this.oShowSheet.getContent()[1].getValue();
						var that = this;
						if (value != this.oldValue)

							this.oModel.create("UpdateMaxHit", null, {
								success : jQuery.proxy(function() {

									this.oModel.bRefreshAfterChange = false;
									this.oModel.refresh();

								}, this),
								error : jQuery.proxy(function(oError) {
									this.handleErrors(oError);

									this.oModel.bRefreshAfterChange = false;
								}, this),
								async : true,
								urlParameters : [ "MaxHitNumber='" + value
										+ "'" ]
							});

						this.oShowSheet.close();
					},
					// Select process before create
					selectProcess : function(oEvent) {
						if (!this.onlyOneProcessType) {
							var selectedItem = oEvent
									.getParameter("selectedItem");
							if (selectedItem) {
								this.processType = selectedItem
										.data("ProcessTypeCode");
								this.processTypeDesc = selectedItem
										.data("ProcessTypeDescription");
							}
						}

						this.getView().getController().setBtnEnabled("sort",
								false);
						this.getView().getController().setBtnEnabled(
								"BTN_S2_ADD", false);
						this.getView().getController().setBtnEnabled(
								"BTN_S2_SHOW", false);

						// Enable footer buttons in Set ListItem
						this.firstCall = "X";
						// sap.ui.getCore().byId('ProcessDialog').close();
						var oList = this.getList();
						var oItem = oList.getSelectedItem();
						if (oItem) {
							var cPath = oItem.getBindingContext().sPath
									.substr(1);
						} else
							var cPath = " ";
						sap.ca.ui.utils.busydialog.requireBusyDialog();
						this.oRouter.navTo("create", {
							contextPath : cPath,
							processType : this.processType
						}, !jQuery.device.is.phone);
						this.onlyOneProcessType = false;
						sap.ca.ui.utils.busydialog.releaseBusyDialog();
					},
					// search in process type dialog
					searchProcess : function(oEvent) {
						var itemsBinding = oEvent.getParameter("itemsBinding");
						var that = this;
						var data_len;
						this.getList().setNoDataText(
								sap.ca.scfld.md.app.Application.getImpl()
										.getResourceBundle().getText(
												"LOADING_TEXT"));
						var sValue = oEvent.getParameter("value");
						if (sValue !== undefined) {
							// apply the filter to the bound items, and the
							// Select Dialog will update
							itemsBinding.filter([ new sap.ui.model.Filter(
									"Description",
									sap.ui.model.FilterOperator.Contains,
									sValue) ]);
							data_len = itemsBinding
									.filter([ new sap.ui.model.Filter(
											"Description",
											sap.ui.model.FilterOperator.Contains,
											sValue) ]);

							if (data_len.iLength == 0) {
								this.getList().setNoDataText(
										sap.ca.scfld.md.app.Application
												.getImpl().getResourceBundle()
												.getText("NO_DATA_TEXT"));

							}
						}
					},

					// toolbar only when coming back from save
					_handleToolBar : function() {
						var aFilters, oListBinding;
						this.byId("toolbarInfo").setVisible(false);
						var bDescCleared = false;

						if (this.desc !== undefined) {
							if (this.accountID !== undefined) {
								// clear desc filter first then retain account
								// filter

								this.nGuid = undefined;
							} else {
								// no application filters exist, we can safely
								// hide the toolbar
								this.byId("toolbarInfo").setVisible(false);

							}
							this.nGuid = undefined;
							this.desc = undefined;
							bDescCleared = true;
						}

						if (!bDescCleared) {
							if (this.accountID !== undefined) {
								this.accountID = undefined;
								// no more application filters exist, hide the
								// toolbar
								this.byId("toolbarInfo").setVisible(false);
							}
						}

						aFilters = this.getFilters();

						var searchPattern = this._oControlStore.oMasterSearchField
								.getValue();

						if (searchPattern && searchPattern.length > 0) {
							aFilters.push(new sap.ui.model.Filter(
									"Description",
									sap.ui.model.FilterOperator.Contains,
									searchPattern));
						}
						oListBinding = this.getList().getBinding("items");
						if (oListBinding) {
							oListBinding.aApplicationFilters = [];

							// update master list binding
							oListBinding.filter(aFilters);

							if (!jQuery.device.is.phone) {
								// oListBinding.attachChange(this._selectFirstElement,
								// this);
							}
							// this.updateMasterTitle();
						}
					},

					_selectContextPath : function(oEvent) {
						var oList = this.getList(), aItems = oList.getItems(), oModel, oElement, i, len, sPath, oBindingContext;
						// this.byId("toolbarInfo").setVisible(false);
						if (aItems.length > 0 && this.nGuid) {
							oEvent.oSource.detachChange(
									this._selectContextPath, this);
							oModel = oList.getModel();
							sPath = "/Opportunities(guid'" + this.nGuid + "')";
							oElement = oModel.getProperty(sPath);
							if (oElement) {
								for (i = 0, len = aItems.length; i < len; i++) {
									oBindingContext = aItems[i]
											.getBindingContext();
									if (oBindingContext
											&& oBindingContext.sPath === sPath) {
										if (!jQuery.device.is.phone)
											this.setListItem(aItems[i],
													jQuery.device.is.phone);
										this.byId("toolbarInfo").setVisible(
												true);
										this.byId("labelInfo").setText(
												this.desc);
										return;
									}
								}
							} else {
								if (oList._oGrowingDelegate._iItemCount < this.iNumberOfContacts) {
									oList._oGrowingDelegate.requestNewPage();
									oEvent.oSource.attachChange(
											this._selectContextPath, this);
								} else {
									this.navToEmptyView();
								}
							}
						}
					},

					// always selecting first item of list
					_selectFirstElement : function(oEvent) {
						var oList = this.getList(), aItems = oList.getItems(), oBinding, i, len, sPath, oBindingContext, oElement;
						var currentDetailPage = sap.ca.scfld.md.app.Application
								.getImpl().oSplitContainer
								.getCurrentDetailPage();
						var createController = this.getView().getModel(
								'controllers').getData().s5Controller;
						if (currentDetailPage
								&& createController
								&& (createController.getView() === currentDetailPage))
							return;
						if (aItems.length > 0) {
							oEvent.oSource.detachChange(
									this._selectFirstElement, this);
							for (i = 0, len = aItems.length; i < len; i++) {
								oBindingContext = aItems[i].getBindingContext();
								if (oBindingContext && oBindingContext.sPath) {

									this.setListItem(aItems[i],
											jQuery.device.is.phone);
									return;
								}
							}
						}

						this.navToEmptyView();
					},
					// nav to empty page
					navToEmptyView : function() {

						var s4Controller = this.getView().getModel(
								'controllers').getData().s4Controller;
						if (s4Controller && s4Controller.bEmployeeUpdateSuccess) {
							s4Controller.bEmployeeUpdateSuccess = false;
							return;
						}
						var s3controller = this.getView().getModel(
								'controllers').getData().s3Controller;

						if (this.bCreateOppt) {
							this.bCreateOppt = false;
							return;
						} else if (s3controller && s3controller.navToOtherApp) {

							s3controller.navToOtherApp = false;
							return;

						}

						this.getList().setNoDataText(
								sap.ca.scfld.md.app.Application.getImpl()
										.getResourceBundle().getText(
												"NO_DATA_TEXT"));
						this.oRouter.navTo("noData", {
							viewTitle : "DETAIL_TITLE",
							languageKey : "NO_ITEMS_AVAILABLE"
						});
					},

					_modifyListAfterCreate : function() {
						var aFilters, oListBinding;
						aFilters = this.getFilters();
						oListBinding = this.getList().getBinding("items");
						if (oListBinding) {
							oListBinding.aApplicationFilters = [];
							/* update master list binding */
							oListBinding.filter(aFilters);
							this.byId("toolbarInfo").setVisible(true);
							this.byId("labelInfo").setText(this.desc);
							if (!jQuery.device.is.phone)
								oListBinding.attachChange(
										this._selectContextPath, this);
						}
					},
					onDataLoaded : function() {
						if (this.bAppLaunched) {
							// attaching leadsRefreshed as callback whenever the
							// list gets refreshed,filtered,searched
							this.getList().getBinding('items').attachChange(
									this.opptListRefreshed, this);

							// selectDetail selects ths first element of the
							// list if any, shows empty view otherwise - only on
							// app launch
							this._selectDetail();

							// app has launched - all one time operations are
							// prevented from further execution with an if check
							// upon this attribute
							this.bAppLaunched = false;
						} else {
							if (this.getList().getBinding('items').getLength() === 0) {
								this.getList().setNoDataText(
										this.oResourceBundle
												.getText('NO_DATA_TEXT'));

								// navigate to empty view only on contextual
								// filter
								// - accountID
								if (this.accountID !== undefined)
									this.navToEmptyView();

							} else {
								// checking the possibility of a selected list
								// item
								// with an empty detail page - changing to
								// detail
								// page if so
								var item = this.getList().getSelectedItem();
								if (item
										&& this.getSplitContainer()
												.getCurrentDetailPage().sViewName === "sap.ca.scfld.md.view.empty") {
									if (!jQuery.device.is.phone
											&& this.getS3Controller())

										this.oRouter.navTo("detail", {
											contextPath : item
													.getBindingContext().sPath
													.substr(1)
										}, !jQuery.device.is.phone);

								}

							}
						}
					},
					opptListRefreshed : function(oEvent) {
						this.getList().setNoDataText(
								this.oResourceBundle.getText('LOADING_TEXT'));
					},

					applyFilterFromContext : function(sContext) {
						// to allow bookmarking for growing list
						// if(!jQuery.device.is.phone)
						this.sContext = sContext;

						var list = this.getList();
						if (list.attachUpdateFinished) {
							list.attachUpdateFinished(null,
									this.onGrowingFinished, this);
						}

						if (this.getS3Controller()) {
							this.oRouter.navTo("detail", {
								contextPath : sContext.substr(1)
							}, !jQuery.device.is.phone);
						}
					},
					onBack : function(oEvent) {
						var currentDetailPage = sap.ca.scfld.md.app.Application
								.getImpl().oSplitContainer
								.getCurrentDetailPage();
						var editController = this.getView().getModel(
								'controllers').getData().s4Controller;

						if (currentDetailPage
								&& editController
								&& (editController.getView() === currentDetailPage)) {
							if (editController._checkDataLoss()) {
								this.getList().getModel().clearBatch();
								sap.ca.ui.dialog.confirmation
										.open(
												{
													question : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText(
																	'DATA_LOSS'),
													title : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText('WARNING'),
													confirmButtonLabel : sap.ca.scfld.md.app.Application
															.getImpl()
															.getResourceBundle()
															.getText('CONTINUE')

												}, jQuery.proxy(
														this.dataLossForExit,
														this));

								return;
							}
						}
						var createController = this.getView().getModel(
								'controllers').getData().s5Controller;
						if (currentDetailPage
								&& createController
								&& (createController.getView() === currentDetailPage)) {
							sap.ca.ui.dialog.confirmation
									.open(
											{
												question : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('DATA_LOSS'),
												title : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('WARNING'),
												confirmButtonLabel : sap.ca.scfld.md.app.Application
														.getImpl()
														.getResourceBundle()
														.getText('CONTINUE')

											}, jQuery.proxy(
													this.dataLossForExit, this));

							return;
						}
						window.history.back(1);
					},
					dataLossForExit : function(oResult) {
						if (oResult.isConfirmed === true) {
							window.history.back(1);
						}
					},
					onGrowingFinished : function(oEvent) {
						if (this.sContext) {
							var list = this.getList();
							var items = list.getItems();
							for (var i = 0; i < items.length; i++) {
								if (this.sContext === items[i]
										.getBindingContextPath()) {
									items[i].setSelected(true);
									this.sContext = null;
									list.detachUpdateFinished(
											this.onGrowingFinished, this);
									this.prevItem = items[i];
								} else {
									items[i].setSelected(false);
								}
							}
						}
					}
				});

},
	"cus/crm/opportunity/view/S2.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core" xmlns="sap.m"\n\tcontrollerName="cus.crm.opportunity.view.S2">\n\t<Page id="page" title="{i18n>MASTER_TITLE}">\n\n\t\t<!-- sorter : { path : \'ProspectName\', descending : true, group : true} -->\n\t\t<content>\n\t\t\t<List id="list" selectionChange="_handleSelect" mode="{device>/listMode}"\n\t\t\t\tgrowing="true" noDataText="{i18n>LOADING_TEXT}" growingScrollToLoad="true">\n\t\t\t\t\n\t\t\t\t<core:ExtensionPoint name="opportunityItemExtension"></core:ExtensionPoint>\n\t\t\t\t\t\n\t\t\t\t\t<ObjectListItem id="MAIN_LIST_ITEM" press="_handleItemPress"\n\t\t\t\t\t\ttype="{device>/listItemType}" title="{Description}"\n\t\t\t\t\t\tnumber="{parts:[{path:\'ExpectedSalesVolume\'}, {path:\'CurrencyCode\'}] , formatter: \'cus.crm.opportunity.util.Formatter.truncateVolume\'}"\n\t\t\t\t\t\tnumberUnit="{CurrencyCode}">\n\t\t\t\t\t\t<attributes>\n\t\t\t\t\t\t\t<ObjectAttribute id="objAttribute1" text="{parts:[{path:\'ProspectName\'}, {path:\'ProspectNumber\'}], formatter:\'cus.crm.opportunity.util.Formatter.formatProspect\'}" />\n\t\t\t\t\t\t\t<ObjectAttribute id="objAttribute2"\n\t\t\t\t\t\t\t\ttext="{path:\'ClosingDate\' , formatter: \'cus.crm.opportunity.util.Formatter.dateFormatter\'}" />\n\t\t\t\t\t\t\n\t\t\t\t\t\t<!-- extension to add new attribute -->\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityItemAttributeExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t<!-- extension to add new Status -->\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityItemStatusExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t<ObjectStatus id="objstatus" text="{UserStatusText}">\n\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\n\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\n\t\t\t\t\t<infoToolbar id="listInfoToolbar">\n\t\t\t\t\t\t<Toolbar id="toolbarInfo" visible="false">\n\t\t\t\t\t\t\t<Label id="labelInfo" text="" />\n\t\t\t\t\t\t\t<ToolbarSpacer />\n\t\t\t\t\t\t\t<core:Icon id="crossIconMasterList" src="sap-icon://sys-cancel" press="_handleToolBar" />\n\t\t\t\t\t\t</Toolbar>\n\t\t\t\t\t</infoToolbar>\n\t\t\t\t\n\t\t\t\t\n\t\t\t</List>\n\n\t\t</content>\n\t</Page>\n\n</core:View>\n',
	"cus/crm/opportunity/view/S3.controller.js":function(){/*
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

},
	"cus/crm/opportunity/view/S3.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core" xmlns:ui="sap.ui.layout"\n\txmlns:layout="sap.ui.layout" xmlns:ca="sap.ca.ui" xmlns="sap.m"\n\tcontrollerName="cus.crm.opportunity.view.S3">\n\t<Page id="S3_Header" \n\t\ttitle="{parts: [{path:\'i18n>DETAIL_TITLE\'} , {path:\'json>/Description\'}], formatter:\'jQuery.sap.formatMessage\'}">\n\t\t<content>\n\t\t\t<core:ExtensionPoint name="opportunityHeaderExtension">\n\t\t\t\t<ObjectHeader id="opportunityHeader" title="{json>/Description}"\n\t\t\t\t\tnumber="{parts:[{path:\'json>/ExpectedSalesVolume\'},{path: \'json>/CurrencyCode\'}]  , formatter: \'cus.crm.opportunity.util.Formatter.volumeFormatter\'}"\n\n\t\t\t\t\ticon="{json>/ImgSrc}"\n\t\t\t\n\t\t\t\t\tnumberUnit="{ path: \'json>/CurrencyCode\', formatter:\'cus.crm.opportunity.util.Formatter.currencycode\'}">\n\t\t\t\t\t<attributes>\n\n\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityHeaderAttributeTopExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t<ObjectAttribute id="opportunityProspectName"\n\t\t\t\t\t\t\ttext="{parts:[{path:\'json>/ProspectName\'}, {path:\'json>/ProspectNumber\'}], formatter:\'cus.crm.opportunity.util.Formatter.formatProspect\'}" active="true" press="onEmployeeLaunch">\n\n\t\t\t\t\t\t\t<customData>\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerNumber" value="{json>/ProspectNumber}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerFunctionCode"\n\t\t\t\t\t\t\t\t\tvalue="00000021" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ImgSrc}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ContactImgSrc}" />\n\t\t\t\t\t\t\t</customData>\n\t\t\t\t\t\t</ObjectAttribute>\n\t\t\t\t\t\t<ObjectAttribute id="opportunityContactName" text="{json>/MainContactName}"\n\t\t\t\t\t\t\tactive="true" press="onEmployeeLaunchheader">\n\t\t\t\t\t\t\t<customData>\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerNumber" value="{json>/MainContactId}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerFunctionCode"\n\t\t\t\t\t\t\t\t\tvalue="00000015" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ContactImgSrc}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ImgSrc}" />\n\t\t\t\t\t\t\t</customData>\n\t\t\t\t\t\t</ObjectAttribute>\n\t\t\t\t\t\t<!-- <ObjectAttribute id="opportunityEmpResponsible" text="{json>/EmployeeResponsibleName}"\n\t\t\t\t\t\t\tactive="true" press="onEmpBusCardLaunch">\n\t\t\t\t\t\t\t<customData>\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerNumber" value="{json>/EmployeeResponsibleNumber}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="PartnerFunctionCode"\n\t\t\t\t\t\t\t\t\tvalue="00000015" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ContactImgSrc}" />\n\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>/ImgSrc}" />\n\t\t\t\t\t\t\t</customData>\n\t\t\t\t\t\t</ObjectAttribute> -->\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityHeaderAttributeBottomExtension"></core:ExtensionPoint>\n\t\t\t\t\t</attributes>\n\n\t\t\t\t</ObjectHeader>\n\t\t\t</core:ExtensionPoint>\n\n\t\t\t<IconTabBar id="icntab" select="selectedTab">\n\t\t\t\t<items>\n\t\t\t\t\t<core:ExtensionPoint name="opportunityTabBarItemFirstExtension">\n\t\t\t\t\t</core:ExtensionPoint>\n\t\t\t\t\t<IconTabFilter id="info" text="{i18n>INFO}" key="Info"\n\t\t\t\t\t\ticon="sap-icon://hint" iconColor="Neutral">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityInfoTabContentTopExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t<ui:form.SimpleForm id="opportunityID_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityType_label1" text="{i18n>TYPE}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityType_Text1" text="{json>/ProcessTypeDescriptionLong}"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityID_label" text="{i18n>OPPOR_ID}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityID_Text" text="{json>/Id}"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<ui:form.SimpleForm id="opportunityDate_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityStartDate_label" text="{i18n>START_DATE}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityStartDate_Text"\n\t\t\t\t\t\t\t\t\t\ttext="{path:\'json>/StartDate\' , formatter: \'cus.crm.opportunity.util.Formatter.dateFormatter\'}"></Text>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityCloseDate_label" text="{i18n>CLOSE_DATE}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityCloseDate_Text"\n\t\t\t\t\t\t\t\t\t\ttext="{path:\'json>/ClosingDate\' , formatter: \'cus.crm.opportunity.util.Formatter.dateFormatter\'}"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<ui:form.SimpleForm id="opportunityStatus_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityStatus_Label" text="{i18n>STATUS}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityStatus_Text" text="{json>/UserStatusText}"></Text>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityStage_Label" text="{i18n>STAGE}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityStage_Text" text="{json>/SalesStageText}"></Text>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityCoS_Label" text="{i18n>CHANCE_OF_SUCCESS}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityCoS_Text"\n\t\t\t\t\t\t\t\t\t\ttext="{path:\'json>/ChanceOfSuccess\' , formatter: \'cus.crm.opportunity.util.Formatter.infotexttonumber\'}"\n\t\t\t\t\t\t\t\t\t\tTextAlign="Right"></Text>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityPriority_Label" text="{i18n>PRIORITY}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityPriority_Text" text="{json>/PriorityText}"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<ui:form.SimpleForm id="opportunityVolume_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityWhtdVolume_Label" text="{i18n>WEIGHTED_VOLUME}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Text id="opportunityWhtdVolume_Text"\n\t\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'json>/ExpectedSalesVolume\'}, {path:\'json>/ChanceOfSuccess\'}, {path:\'json>/CurrencyCode\'}], formatter:\'cus.crm.opportunity.util.Formatter.weightedvolume\'}"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<ui:form.SimpleForm editable="true"\n\t\t\t\t\t\t\t\tid="opportunityFC_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityForecast_Label" text="{i18n>FORECAST}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Switch id="opportunityForecast_Switch" enabled="false"\n\t\t\t\t\t\t\t\t\t\tstate="{json>/ForecastRelevance}">\n\t\t\t\t\t\t\t\t\t</Switch>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<ui:form.SimpleForm id="opportunityLogChange_form">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="opportunityLogChange_Label" text="{i18n>LOG_CHANGE}">\n\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t<Link text="{i18n>VIEW}" press="onLogChange" id="log"></Link>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</ui:form.SimpleForm>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityInfoTabContentBottomExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\n\t\t\t\t\t<IconTabFilter id="tab_product" text="{i18n>PRODUCTS}"\n\t\t\t\t\t\tkey="Products" icon="sap-icon://cart" iconColor="Neutral">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabContentExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t<!-- <Label text="{i18n>PRODUCT_BASKET}"> </Label> -->\n\t\t\t\t\t\t\t<Table id="Product_Tab" items="{json>/Products}"\n\t\t\t\t\t\t\t\tnoDataText="{i18n>NOPRODUCTS}">\n\n\t\t\t\t\t\t\t\t<columns>\n\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabColoumExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t<Column id="product_column" width="35%">\n\t\t\t\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t<Label id="productColumnLabel_S3" text="{i18n>PRODUCT}"></Label>\n\t\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t\t</Column>\n\n\t\t\t\t\t\t\t\t\t<Column id="quanity_column" width="17.5%" hAlign="Right">\n\t\t\t\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="productQuantity_S3" text="{i18n>QUANTITY}"></Label>\n\t\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t\t</Column>\n\n\t\t\t\t\t\t\t\t\t<Column id="price_column" width="22.5%" hAlign="Right"\n\t\t\t\t\t\t\t\t\t\tminScreenWidth="Tablet" demandPopin="true">\n\t\t\t\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="productPrice_S3" text="{i18n>UNIT_PRICE}"></Label>\n\t\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t\t</Column>\n\n\t\t\t\t\t\t\t\t\t<Column id="volume_column" width="25%" hAlign="Right"\n\t\t\t\t\t\t\t\t\t\tminScreenWidth="Tablet" demandPopin="true">\n\t\t\t\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="productVolume_S3" text="{i18n>VOLUME}"></Label>\n\t\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t\t</Column>\n\n\t\t\t\t\t\t\t\t</columns>\n\n\t\t\t\t\t\t\t\t<items>\n\n\t\t\t\t\t\t\t\t\t<ColumnListItem id="productBasketTemplate_S3">\n\t\t\t\t\t\t\t\t\t\t<cells>\n\t\t\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabCellsExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectIdentifier id="productName_cell"\n\t\t\t\t\t\t\t\t\t\t\t\ttitle="{path : \'json>ProductGuid\', formatter : \'cus.crm.opportunity.util.Formatter.formatProductName\'}"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{path: \'json>ProductGuid\',formatter : \'cus.crm.opportunity.util.Formatter.formatProdClassification\'}">\n\t\t\t\t\t\t\t\t\t\t\t</ObjectIdentifier>\n\t\t\t\t\t\t\t\t\t\t\t<Text id="productQuantity_cell"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{parts:[{path:\'json>Quantity\'}, {path:\'json>Unit\'}], formatter:\'cus.crm.opportunity.util.Formatter.quantity\'}"\n\t\t\t\t\t\t\t\t\t\t\t\ttextAlign="Left"></Text>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectNumber id="productPrice_cell" number="{parts:[{path:\'json>NetValue\'},{path: \'json>CurrencyCode\'}]  , formatter: \'cus.crm.opportunity.util.Formatter.volumeFormatter\'}"\n\t\t\t\t\t\t\t\t\t\t\t\tnumberUnit="{json>CurrencyCode}" />\n\t\t\t\t\t\t\t\t\t\t\t<ObjectNumber id="productVolume_cell" number="{parts:[{path:\'json>TotalExpectedNetValue\'},{path: \'json>CurrencyCode\'}]  , formatter: \'cus.crm.opportunity.util.Formatter.volumeFormatter\'}"\n\t\t\t\t\t\t\t\t\t\t\t\tnumberUnit="{json>CurrencyCode}" />\n\t\t\t\t\t\t\t\t\t\t</cells>\n\t\t\t\t\t\t\t\t\t</ColumnListItem>\n\n\t\t\t\t\t\t\t\t</items>\n\t\t\t\t\t\t\t</Table>   \n\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<IconTabFilter id="tab_notes" icon="sap-icon://notes"\n\t\t\t\t\t\tkey="Notes" text="{i18n>NOTES}" iconColor="Neutral">\n\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<ca:Notes id="notesList" items="{json>/OpportunityNotesSet}"\n\t\t\t\t\t\t\t\tinset="false" threshold="4" showNoteComposer="true" noDataText="{i18n>NONOTES}"\n\t\t\t\t\t\t\t\ttextMaxLength="1000" addNote="_handleAddNote">\n\t\t\t\t\t\t\t\t<ca:ExpansibleFeedListItem text="{json>Content}"\n\t\t\t\t\t\t\t\t\tsender="{json>Creator}" senderActive="false"\n\t\t\t\t\t\t\t\t\ttimestamp="{path:\'json>CreatedAt\' , formatter: \'cus.crm.opportunity.util.Formatter.notesDateFormatter\'}"\n\t\t\t\t\t\t\t\t\tmaxLines="3">\n\t\t\t\t\t\t\t\t</ca:ExpansibleFeedListItem>\n\n\t\t\t\t\t\t\t</ca:Notes>\n\n\t\t\t\t\t\t</content>\n\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<IconTabFilter id="tab_attachment" icon="sap-icon://attachment"\n\t\t\t\t\t\tkey="Attachments" text="{i18n>ATTACHMENTS}" iconColor="Neutral">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<ca:FileUpload id="fileupload" items="/OpportunityAttachments"\n\t\t\t\t\t\t\t\turl="url" size="size" fileName="name" uploadedDate="uploadedDate"\n\t\t\t\t\t\t\t\tcontributor="contributor" fileId="fileId" acceptRequestHeader="application/json"\n\t\t\t\t\t\t\t\tuseMultipart="false" deleteFile="onDeleteFile" renameEnabled="true" xsrfToken=""\n\t\t\t\t\t\t\t\tuploadUrl="/sap/opu/odata/sap/CRM_OPPORTUNITY/OpportunityAttachments"\n\t\t\t\t\t\t\t\tuseEditControls="true" fileExtension="fileExtension" encodeUrl="/sap/bc/ui2/encode_file"\n\t\t\t\t\t\t\t\tuploadEnabled="true" uploadFile="onUploadFile" renameFile="onRenameFile" saveClicked="onSaveClicked" \n\t\t\t\t\t\t\t\tfileUploadFailed="onFileUploadFailed"\n\t\t\t\t\t\t\t\t></ca:FileUpload>\n                     \n\t\t\t\t\t\t</content>\n\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<IconTabFilter id="salesTeam" key="Parties Involved"\n\t\t\t\t\t\ticon="sap-icon://group" text="{i18n>SALES_TEAM}" iconColor="Neutral">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunitysalesTabContentExtension"></core:ExtensionPoint>\n\n\t\t\t\t\t\t\t<Table id="Sales_Team" noDataText="{i18n>NOPARTIES}" text="{i18n>TEAM}"\n\t\t\t\t\t\t\t\titems="{json>/OpportunitySalesTeamSet}" >\n\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t<columns>\n\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunitysalesTabColumnExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t<Column id="salesTeamColumn1" width="15%" />\n\t\t\t\t\t\t\t\t\t<Column id="salesTeamColumn2" width="75%"/>\n                                    <Column id="salesTeamColumn3" width="10%"/>\n\t\t\t\t\t\t\t\t</columns>\n\n\t\t\t\t\t\t\t\t<items>\n\n\t\t\t\t\t\t\t\t\t<ColumnListItem  id="salesTeamTemplate" items="{json>/OpportunitySalesTeamSet}">\n\t\t\t\t\t\t\t\t\t\t<cells>\n\t\t\t\t\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunitySalesTabCellsExtension">\n\t\t\t\t\t\t\t\t\t\t\t</core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectHeader id="image" icon="{path :\'json>ImgSrc\',formatter : \'cus.crm.opportunity.util.Formatter.removeMarginInPhone\'}">\n\t\t\t\t\t\t\t\t\t\t\t</ObjectHeader>\n\t\t\t\t\t\t\t\t\t\t\t<layout:VerticalLayout id="layout"\n\t\t\t\t\t\t\t\t\t\t\t\tvisible="{path : \'device>/isPhone\',formatter : \'cus.crm.opportunity.util.Formatter.addLayoutPadding\'}">\n\t\t\t\t\t\t\t\t\t\t\t\t<layout:content>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<Link id="salesPartnerName" text="{parts : [{path :\'json>PartnerName\'},{path : \'json>PartnerNumber\'}],formatter : \'cus.crm.opportunity.util.Formatter.formatBusinessCardCaller\'}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t items="{json>/OpportunitySalesTeamSet}">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<customData>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:CustomData key="PartnerNumber"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{json>PartnerNumber}" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:CustomData key="PartnerFunctionCode"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue="{json>PartnerFunctionCode}" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:CustomData key="Image" value="{json>ImgSrc}" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</customData>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</Link>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<layout:HorizontalLayout id="hLayout">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label id="salespartnerFunction_Label" text="{i18n>PARTNER_FUNCTION}"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdesign="Bold"></Label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Text id="salespartnerFunction_Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttext="{path:\'json>PartnerFunctionText\' , formatter: \'cus.crm.opportunity.util.Formatter.salesteamplacement\'}"></Text>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</layout:HorizontalLayout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="salespartnerMobile_Text"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ticon="sap-icon://outgoing-call" text="{json>MobileNumber}"></ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t\t\t</layout:content>\n\t\t\t\t\t\t\t\t\t\t\t</layout:VerticalLayout>\n\t\t\t\t\t\t\t\t\t\t\t<Button id="participantDeleteButton" type="Transparent" icon="sap-icon://decline" press="onDeleteParticipant" visible="{path : \'json>PartnerFunctionCode\',formatter : \'cus.crm.opportunity.util.Formatter.formatParticipant\'}">\n\t\t\t\t\t\t\t\t\t\t\t</Button>\n\t\t\t\t\t\t\t\t\t\t</cells>\n\t\t\t\t\t\t\t\t\t</ColumnListItem>\n\n\t\t\t\t\t\t\t\t</items>\n\t\t\t\t\t\t\t</Table>\n\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<IconTabFilter id="tab_competitor" icon="sap-icon://competitor"\n\t\t\t\t\t\ttext="{i18n>COMPETITORS}" key="Competitors" iconColor="Neutral"\n\t\t\t\t\t\tcount="">\n\t\t\t\t\t\t<content>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityCompetitorTabContentExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t<List id="competitors" items="{json>/OpportunityCompetitors}"\n\t\t\t\t\t\t\t\tnoDataText="{i18n>NOCOMPETITORS}">\n\t\t\t\t\t\t\t\t<core:ExtensionPoint name="competitorListContentExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t\t<ObjectListItem id="Competitors" title="{parts :[{path : \'json>PartnerName\'},{path : \'json>PartnerNumber\'}],formatter : \'cus.crm.opportunity.util.Formatter.formatPartnerName\'}"\n\t\t\t\t\t\t\t\t\ticon="{json>ImgSrc}">\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t</List>\n\n\t\t\t\t\t\t</content>\n\t\t\t\t\t</IconTabFilter>\n\t\t\t\t\t<core:ExtensionPoint name="opportunityTabBarItemLastExtension">\n\t\t\t\t\t</core:ExtensionPoint>\n\t\t\t\t</items>\n\t\t\t</IconTabBar>\n\n\t\t</content>\n\t\t<footer id="footer">\n\t\t</footer>\n\t</Page>\n</core:View>\n',
	"cus/crm/opportunity/view/S4.controller.js":function(){/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.message.message");		
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("sap.ca.ui.DatePicker");
jQuery.sap.require("sap.m.SelectDialog");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("cus.crm.opportunity.util.schema");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
sap.ca.scfld.md.controller.BaseDetailController.extend("cus.crm.opportunity.view.S4", {

	deleteBuffer : [],//to manage the objects that are to be deleted in the backend
	headerGuid : 0,
	userStatusCode : 0,
	UserStatuses : [],
	HeaderObject : {},
	accountObject : {},
	oSelectedAccount : {},
	oSelectedContact : {
		contactID : ""
	},
	oSelectedEmployee : {
		employeeID : ""
	},
	oMainPartner : {
		PartnerNumber : ""
	},
	currentDescription : "",
	currentQuantity : "",
	BackendProducts : {},
	requestNumber : 0,
	changeSetMapping : { HEADER : "",
		STATUS : "",
		CONTACT : "",
		EMPLOYEE : "",
		BASKET : "",   
	},
	bBasketUpdate : false,
	Currencies : [],
	bNavOnUpdate : false,
	contactF4Fragment : {},
//	employeeF4Fragment :{},
	WinStatusCode: "",
	LostStatusCode: "",
	controller:"",
	OldvolumeValue:"",
	OldcosValue:"",
	ContactCollection : [],
	EmployeeCollection : [],
	s3Controller_contact :"",
	currencyMessage:"",
	bCancel : false,
	onInit : function()
	{
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
		//jQuery.sap.includeStyleSheet("./css/Opportunity.css");
		
		//this.getView().getModel('controllers').getData().s4Controller = this;
		var bRTL = sap.ui.getCore().getConfiguration().getRTL();
		var sCss = (bRTL) ? "OpportunityRTL" : "Opportunity";
		
		jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css." + sCss,".css"),"sap-ui-theme-sap.crm");
		
		 this.oResourceBundle = sap.ca.scfld.md.app.Application.getImpl().getResourceBundle() ;
		 this.oI18nModel=sap.ca.scfld.md.app.Application.getImpl().AppI18nModel;
		this.oModel = this.getView().getModel();
		this.getView().setModel(new sap.ui.model.json.JSONModel(),"json");
		this.oAppImplementation = sap.ca.scfld.md.app.Application.getImpl();
		this.oDateFormatter = sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},new sap.ui.core.Locale(this.oAppImplementation.getResourceBundle().sLocale));
		
		this.contactF4Fragment  =  new sap.ui.xmlfragment(this.createId("contactF4"), 'cus.crm.opportunity.view.ContactF4', this);
		this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel(),"json");
		this.contactF4Fragment.setModel(this.oI18nModel,'i18n');
//		this.employeeF4Fragment  =  new sap.ui.xmlfragment(this.createId("employeeF4_S5"), 'cus.crm.opportunity.view.EmployeeF4', this);
//		this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel(),"json");
//		this.employeeF4Fragment.setModel(this.oI18nModel,'i18n');
		//Handle Routing
		this.oRouter.attachRouteMatched(jQuery.proxy(function(oEvent)
				{
			if (oEvent.getParameter("name") === "subDetail") 
			{   
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.sPath = oEvent.getParameter("arguments").contextPath;
				this.bindEditView();
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
			}
			else if( oEvent.getParameter("name") === "edit")
				{ this.fullScreenMode = true;
				  this.sPath = oEvent.getParameter("arguments").contextPath;
				sap.ca.ui.utils.busydialog.requireBusyDialog();
				this.bindEditView();
				sap.ca.ui.utils.busydialog.releaseBusyDialog();
				
				
				}
				},this));
		
		
		

		//Prevent manual entry in Date
		this.byId('datePickerEndDate').attachBrowserEvent("keydown",jQuery.proxy(function(oEvent)
				{
			 this.setValueState(sap.ui.core.ValueState.None);
				},this.byId('datePickerEndDate')));

		this.byId('datePickerStartDate').attachBrowserEvent("keydown",jQuery.proxy(function(oEvent)
				{
			  this.setValueState(sap.ui.core.ValueState.None);
				},this.byId('datePickerStartDate')));

		//Show contact F4 on Enter
		this.byId('inputMainContact').attachBrowserEvent("keyup",function(oEvent){ 
            //keycode for enter is 13
            if(oEvent.keyCode === 13)
            {
                  this.showContactF4();
            }},this);
		
        this.byId('inputEmpResponsible').attachBrowserEvent("keyup",function(oEvent){ 
                //keycode for enter is 13
                if(oEvent.keyCode === 13)
                {
                      this.showEmployeeF4();
                }},this
		);
		
		//Date validation
		this.byId('datePickerEndDate').attachChange(null,function(oEvent){
			
			 var dateString= oEvent.getParameter('newYyyymmdd');
			 if(dateString !== null){
			  var tempDate = new Date(parseInt(dateString.substr(0,4)),
					                  parseInt(dateString.substr(4,2) - 1),
					                  parseInt(dateString.substr(6,2)));
			 
		     this.byId('datePickerEndDate').setValue(this.oDateFormatter.format(tempDate));   
			 }
			 this.byId('datePickerEndDate').setValueState(sap.ui.core.ValueState.None);
			 this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
			
		},this);
		this.byId('datePickerStartDate').attachChange(null,function(oEvent){
             
			this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
			  this.byId('datePickerEndDate').setValueState(sap.ui.core.ValueState.None);
			  var dateString= oEvent.getParameter('newYyyymmdd');
			  
			  if(dateString !== null){
			  var tempDate = new Date(parseInt(dateString.substr(0,4)),
					                  parseInt(dateString.substr(4,2) - 1),
					                  parseInt(dateString.substr(6,2)));
			this.byId('datePickerStartDate').setValue(this.oDateFormatter.format(tempDate));
			  }
		},this);  
		
		this.byId('productBasketEdit').setModel(new sap.ui.model.json.JSONModel());
		this.byId('currency').setModel(new sap.ui.model.json.JSONModel());

		// Chance of success should get filled based on stage selected
		var that = this.getView();
		this.getView().byId('stages').attachChange( null, function(oEvent){
			if(that.byId('userStatus').getSelectedKey()!=that.getController().WinStatusCode && that.byId('userStatus').getSelectedKey()!=that.getController().LostStatusCode )	
			{	
				var data=this.getModel('json').getData();
				var newValue = oEvent.getParameter("newValue");
				var length = data.SalesStages.length;
				// NLUN - CodeScan Changes - Global Variables
				for (var i=0; i<length;i++){
					if  (data.SalesStages[i].SalesStageCode === oEvent.getParameter("selectedItem").getKey()){
						that.byId("chanceOfSuccess").setValue( Number(data.SalesStages[i].ChanceOfSuccess));
						that.byId('wtVol').setText(cus.crm.opportunity.util.Formatter.weightedvolume((that.byId('expectedSalesVolume')).getValue(),
								(that.byId('chanceOfSuccess')).getValue(),
								(that.byId('currency')).getValue()));
						break;
					}

				}
			}
		});

		//Chance of Success based on userStatus
		this.getView().byId('userStatus').attachChange( null, function(oEvent){
			var newValue = oEvent.getParameter("newValue");
			if  (that.getController().WinStatusCode === oEvent.getParameter("selectedItem").getKey()){
				that.byId("chanceOfSuccess").setValue( 100);
				that.byId('wtVol').setText(cus.crm.opportunity.util.Formatter.weightedvolume((that.byId('expectedSalesVolume')).getValue(),
						(that.byId('chanceOfSuccess')).getValue(),
						(that.byId('currency')).getValue()));

			}
			if  (that.getController().LostStatusCode === oEvent.getParameter("selectedItem").getKey()){
				that.byId("chanceOfSuccess").setValue(0);
				that.byId('wtVol').setText(cus.crm.opportunity.util.Formatter.weightedvolume((that.byId('expectedSalesVolume')).getValue(),
						(that.byId('chanceOfSuccess')).getValue(),
						(that.byId('currency')).getValue()));
			}
		});
		
		//interoperability with various backend versions 
		this.sBackendVersion = cus.crm.opportunity.util.schema
				._getServiceSchemaVersion(this.oModel,
				"Opportunity");	       
		this.oVersioningModel = new sap.ui.model.json.JSONModel({BackendSchemaVersion : this.sBackendVersion});	
		this.oVersioningModel.updateBindings();
		this.getView().setModel(this.oVersioningModel,"versioning");
	},
	
	
	
	onBeforeRendering : function(){
		
		this.getView().getModel("controllers").getData().s4Controller = this;
		
		this.s3Controller = this.getView().getModel('controllers').getData().s3Controller;
		
		if(this.s3Controller){
		this.s3Controller.s4Controller = this;
		this.s3Controller_contact = this.s3Controller;
		
		}
		//saving refernce of s4 controller in s2 controller as well
		 var s2Controller = this.getView().getModel('controllers').getData().s2Controller;
		 
		 if(s2Controller){
			 
		 s2Controller.s4Controller = this;
		//saving reference of s2 controller over here in s4
		 this.s2Controller = s2Controller;
		 }
		 
	},
	
	bindBatchResponses : function(aResponses){
		     
	},
	
	_cloneProducts : function(oProducts){
		  var oProductsClone;
		  
		  if(oProducts.Products){
		 oProductsClone = JSON.parse(JSON.stringify(oProducts));
		for(var i= 0;i<oProductsClone.Products.length;i++)
     	{
     	 if(oProductsClone.Products[i].ProductGuid === null)
     		 oProductsClone.Products[i].Backend = "CATEGORY";
          else
     	     oProductsClone.Products[i].Backend = "X";
     	  oProductsClone.Products[i].OldValue = oProductsClone.Products[i].Quantity;
     	  this.BackendProducts[oProductsClone.Products[i].ItemGuid] = JSON.parse(JSON.stringify(oProductsClone.Products[i]));
     	}
		  }
		  else{
			  oProductsClone = {Products : []};
		  }
		return oProductsClone;
	},
	
	bindHeaderFormsAndProducts : function(data){
		
		this.HeaderObject = data;
		this.headerGuid = data.Guid;;
		this.userStatusCode = data.UserStatusCode;
		this.HeaderObject = data;
		this.headerGuid = data.Guid;;
		this.userStatusCode = data.UserStatusCode;
		this.UserStatuses = data.UserStatuses; 
		
		//this.oSelectedAccount.accountID = s3Object.Header.ProspectNumber;
		this.byId('description').setValue(data.Description); 
		//filling account id if account name is empty - for edit page
		this.byId('account').setText(data.ProspectName);
		if(data.ProspectName==="")
			this.byId('account').setText(data.ProspectNumber);
		this.byId('inputEmpResponsible').setValue(data.EmployeeResponsibleName);
		
		this.byId('expectedSalesVolume').setValue(data.ExpectedSalesVolume);
		this.byId('id').setText(data.Id);
		this.byId('opportunityType').setText(data.ProcessTypeDescriptionLong);
		this.byId('chanceOfSuccess').setValue(cus.crm.opportunity.util.Formatter.texttonumber(data.ChanceOfSuccess));
		this.byId('datePickerStartDate').setValue(this.formatDate(data.StartDate));//Formatting the dates
		this.byId('datePickerEndDate').setValue(this.formatDate(data.ClosingDate));
		
		this.byId('datePickerStartDate').setValueState(sap.ui.core.ValueState.None);
		this.byId('datePickerEndDate').setValueState(sap.ui.core.ValueState.None);
		this.byId('datePickerStartDate').fireChange(this.byId('datePickerStartDate'));
		this.byId('datePickerEndDate').fireChange( this.byId('datePickerEndDate'));
		this.byId('currency').setValue(data.CurrencyCode);
		this.byId('switch').setState(data.ForecastRelevance);
		this.byId('wtVol').setText(cus.crm.opportunity.util.Formatter.weightedvolume((data.ExpectedSalesVolume),Number(data.ChanceOfSuccess),data.CurrencyCode));
		//this.byId('dialogContactF4').setModel(oModel);
		this.byId('inputMainContact').setValue(data.MainContactName);
		this.oSelectedContact.contactID = data.MainContactId;
	    this.oSelectedContact.fullName = data.MainContactName;
		
		  //employee responsible - valid only since backend schema version 2.0 	
	    if(parseFloat(this.oVersioningModel.getData().BackendSchemaVersion)  >= 2.0){	

	    	this.byId('inputEmpResponsible').setValue(data.EmployeeResponsibleName);	
	    	this.oSelectedAccount.accountID = data.ProspectNumber;	
	    	this.oSelectedEmployee.employeeID = data.EmployeeResponsibleNumber;	
	    }	
		 
		//this.oSelectedEmployee.employeeID = s3Object.Header.EmployeeResponsibleNumber;
	    this.oSelectedEmployee.fullName = data.EmployeeResponsibleName;

		this.OldcosValue=this.byId('chanceOfSuccess').getValue();
		this.OldvolumeValue =this.byId('expectedSalesVolume').getValue();

		//setting up dropdowns 
        var oJsonModel = this.getView().getModel("json");
     
        oJsonModel.oData.UserStatuses = data.UserStatuses;
        oJsonModel.oData.Priorities = data.Priorities;
        oJsonModel.oData.SalesStages = data.SalesStages;
        
        //Products basket Binding
        oJsonModel.oData.Products = data.Products;
        
        oJsonModel.updateBindings();
        
        
        this.byId('userStatus').setSelectedKey(data.UserStatusCode);
		this.byId('priority').setSelectedKey(data.PriorityCode);
		this.byId('stages').setSelectedKey(data.SalesStageCode);
		
		/*Disable the Add product button when status is WON/Lost*/
		if(this.byId('userStatus').getSelectedKey()===this.WinStatusCode || this.byId('userStatus').getSelectedKey()===this.LostStatusCode ){
			this.byId('ProductButton').setVisible(false);
		}
		else
			this.byId('ProductButton').setVisible(true);
		
	    
	},
	
	_filterDropDownsByProcessType : function(oDropDownsData,sProcessType){
	   //status dropdown
		
		//set userstatus
		var aStatuses = [];
		var statusLength = oDropDownsData.UserStatuses.length;
		for(var i = 0;i< statusLength;i++){
			if (oDropDownsData.UserStatuses[i].ProcessType === sProcessType){
				aStatuses.push(oDropDownsData.UserStatuses[i]);
				this.StatusProfile = oDropDownsData.UserStatuses[i].StatusProfile;
				if (oDropDownsData.UserStatuses[i].BusinessTransaction === "WINN"){
					this.WinStatusCode =  oDropDownsData.UserStatuses[i].UserStatusCode ;
				}
				if (oDropDownsData.UserStatuses[i].BusinessTransaction === "LOST"){
					this.LostStatusCode =  oDropDownsData.UserStatuses[i].UserStatusCode ;
				}
			}
		}
		
	     var oEmptyUserStatus = 	 {
             	BusinessTransaction: "",
            	LanguageCode: "",
            	ProcessType: sProcessType,
            	StatusProfile: "",
            	UserStatusCode: "",
            	UserStatusText: "",
            };
		
	     aStatuses.splice(0,0,oEmptyUserStatus);
	     
	     
	     var oEmptyPriority =  {
	          	  LanguageCode: "",
	        	  PriorityCode: "",
	        	  PriorityText: "",
	          };
	        oDropDownsData.Priorities.splice(0,0,oEmptyPriority);
	       
	    var aSalesStages = [];
	    var length = oDropDownsData.SalesStages.length;
	    
	    for(var i = 0 ; i < length; i++){
	    	if(oDropDownsData.SalesStages[i].ProcessType === sProcessType){
	    		aSalesStages.push(oDropDownsData.SalesStages[i]);
	    	}
	    }
	        var oEmptySalesStage = {
					ChanceOfSuccess: "",
					LanguageCode: "",
					ProcessType: sProcessType,
					SalesStageCode: "",
					SalesStageDescription: "",
					SalesStageOrder: "",
				};
	        
	        
	        aSalesStages.splice(0,0,oEmptySalesStage);
	           
	     oDropDownsData.UserStatuses = aStatuses;
	     oDropDownsData.SalesStages = aSalesStages;
	 	
	
	},
	
	handleBatchRead : function(aResponses){

		//batch responses from initial launch of s3 view
		var data = {};
		var oDropDownsData = {};
		var bFail = false;
		var errorTitle;
		var errorMessage;
		var that = this;
		this.bAppLaunched = false;
		if (aResponses.__batchResponses[0].statusCode === "200") {
			oDropDownsData.SalesStages = aResponses.__batchResponses[0].data.results;

		} else {

			bFail = true;
			errorTitle = aResponses.__batchResponses[0].statusText;
			errorMessage = JSON.parse(aResponses.__batchResponses[0].response.body).error.message.value + "\n";

		}

		if (aResponses.__batchResponses[1].statusCode === "200") {
			oDropDownsData.Priorities = aResponses.__batchResponses[1].data.results;

		} else {

			bFail = true;
			errorTitle = aResponses.__batchResponses[1].statusText;
			errorMessage = JSON.parse(aResponses.__batchResponses[1].response.body).error.message.value + "\n";

		}
		if (aResponses.__batchResponses[2].statusCode === "200") {
			oDropDownsData.UserStatuses = aResponses.__batchResponses[2].data.results;

		} 
		
		else {
			bFail = true;
			errorTitle = aResponses.__batchResponses[2].statusText;
			errorMessage = JSON.parse(aResponses.__batchResponses[2].response.body).error.message.value + "\n";

		}
		if(aResponses.__batchResponses[3].statusCode === "200"){
			this.Currencies = aResponses.__batchResponses[3].data.results;
		
		}
		else 
			{
			   bFail = true;
			   errorTitle = aResponses.__batchResponses[3].statusText;
			   errorMessage = JSON.parse(aResponses.__batchResponses[3].response.body).error.message.value + "\n";
			   
			 
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
		if (aResponses.__batchResponses[4]
				.hasOwnProperty("data")){
			
			data = aResponses.__batchResponses[4].data;
			var oProducts = data.Products;
			delete data.Products;
			data.Products = this._cloneProducts({Products : oProducts.results}).Products;
			
		}
		else
			this.handleErrors(aResponses.__batchResponses[4]);
		
		this._filterDropDownsByProcessType(oDropDownsData, data.ProcessType);
		
		data.UserStatuses = oDropDownsData.UserStatuses;
		data.Priorities = oDropDownsData.Priorities;
		data.SalesStages = oDropDownsData.SalesStages;
		
		this.bindHeaderFormsAndProducts(data);
		
	},

	bindEditView : function()
	{   
		var s3Controller;
		
		s3Controller = this.getView().getModel('controllers').getData().s3Controller;
		
		if(s3Controller === null){
			//bookmarking scenario of the edit page
			
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("SalesStages", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Priorities","GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("UserStatuses", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Currencies","GET")]);
    	    //expand products
	        this.oModel.addBatchReadOperations([ this.oModel.createBatchOperation(this.sPath+"?$expand=Products,ChangeDocs,Competitors","GET") ]);		
	        
	        this.oModel.submitBatch(jQuery.proxy(this.handleBatchRead,this),function(oError){},true);
	        
	        return;
		}
		//always keep the delete buffer to empty
		this.deleteBuffer = [];
		this.BackendProducts = {};
		
		this.controller = s3Controller;
		var data = s3Controller.byId("info").getModel("json").getData();
		var oDropDownsData = {
				UserStatuses : JSON.parse(JSON.stringify(s3Controller.UserStatuses)),
				Priorities :   JSON.parse(JSON.stringify(s3Controller.Priorities)),
				SalesStages :  JSON.parse(JSON.stringify(s3Controller.SalesStages))
		};
		this._filterDropDownsByProcessType(oDropDownsData,data.ProcessType);
		
		data.UserStatuses = oDropDownsData.UserStatuses;
		data.Priorities =   oDropDownsData.Priorities;
		data.SalesStages =  oDropDownsData.SalesStages;
		
		var oProducts = s3Controller.byId('Product_Tab').getModel('json').getData();
	
		if(oProducts && oProducts.hasOwnProperty("Products")){
		     var oProductsClone; 
		     
		     if(oProducts.Products){
			
			  oProductsClone = JSON.parse(JSON.stringify(oProducts));
           		
			 for(var i=0;i< oProductsClone.Products.length;i++)
				{
					if(oProductsClone.Products[i].ProductGuid === null)
						oProductsClone.Products[i].Backend = "CATEGORY";
					else
						oProductsClone.Products[i].Backend = "X";
					oProductsClone.Products[i].OldValue = oProductsClone.Products[i].Quantity;
					this.BackendProducts[oProductsClone.Products[i].ItemGuid] = JSON.parse(JSON.stringify(oProductsClone.Products[i]));
				}
		     }
		     else{
		    	 oProductsClone = {Products : []};
		     }
			data.Products = oProductsClone.Products;
		}
		
		
		this.bindHeaderFormsAndProducts(data);
		
		this.Currencies = s3Controller.Currencies;
		this.ContactCollection = s3Controller.ContactCollection;
		this.EmployeeCollection = s3Controller.EmployeeCollection;

		var expandEntities = "Statuses";	
		
		 //EXTENSION POINT
		   var detailController = this.getDetailController();
		   /**
			 * @ControllerHook extHookBindAdditionalFields is the controller hook that provide for setting values for additional fields
			 *                 from the detail screen that can be modified in the edit screen. The customer can access the data of the detail
			 *                 page by calling the getDetailController function.
			 *                 The customer can access the data of the detail page by calling the getDetailController
			 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookBindAdditionalFields
			 * @param {object}
			 *           detailController
			 * @return {void}
			 */
		  if (this.extHookBindAdditionalFields){
				this.extHookBindAdditionalFields(detailController);
			}
		
		
		
	},



//	on cancel in Edit
	onCancel : function()
	{
		if(this._checkDataLoss()){	
			sap.ca.ui.dialog.confirmation.open({	
				question : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('DATA_LOSS'),	
				title : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('WARNING'),	
				confirmButtonLabel : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('CONTINUE')     
			},jQuery.proxy(this.datalossDismissed,this));
		}

		else //simulating continue of dataloss dimisss - simlar to cancelling without any ch
		 this.datalossDismissed({isConfirmed : true});
		this.oModel.clearBatch();
			 },	
			 
  datalossDismissed : function(oResult){	      
	    if(oResult.isConfirmed){
	    	
	    	 var s3Controller = this.getDetailController();
	    	 if(s3Controller === null){
				 window.history.go(-1);
				 return;
			 }
	    	 
			 this.deleteBuffer = [];	
			 var ctx = "Opportunities(guid'" + this.headerGuid +"')";
			 this.bCancel = true;
			 if(!jQuery.device.is.phone){
				 
				
				 if(!this.fullScreenMode){
		     	 this.oRouter.navTo("detail", {
					 contextPath : ctx },!jQuery.device.is.phone);
				 }
				 else {
					 this.oRouter.navTo("display", {
						 contextPath : ctx },!jQuery.device.is.phone); 
				 }
		        
	    }
			 else{
				 
				 
				 this._navBack();
			 }
			
	    } },

	//validate and change the volume
	chanceOfSuccessChanged : function(oEvent)
	{
		var newValue = oEvent.getParameter('newValue'); 
		var pattern = /[^0-9.]/;
		if(pattern.test(newValue) === false)
		{
			if(newValue.split(".").length > 2)  //error
			{
				oEvent.getSource().setValue(this.OldcosValue);
				//oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
			}
			else // no error 
			{
				this.OldcosValue = newValue;
				oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
			}

		}
		else //error 
		{
			//oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);
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
				//oEvent.getSource().setValueState(sap.ui.core.ValueState.Error);

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
	//called on descirption change 
	descriptionChanged : function(oEvent)
	{
		var descriptionField = this.byId('description');
		if(oEvent.getParameter('newValue').length > 40)
		{
			descriptionField.setValueState(sap.ui.core.ValueState.Error);
		}
		else
			descriptionField.setValueState(sap.ui.core.ValueState.None);
	},
	
pageNeedsUpdate : function(){
		
		//Fixing the chance of success if oppo win or lost
	
        this.oModel.clearBatch();
        
		if  (this.WinStatusCode === this.byId('userStatus').getSelectedKey()){
			this.getView().byId("chanceOfSuccess").setValue( 100);

		}
		if  (this.LostStatusCode === this.byId('userStatus').getSelectedKey()){
			this.getView().byId("chanceOfSuccess").setValue(0);

		}
		this.requestNumber = 0;
		this.bBasketUpdate = false;
		this.changeSetMapping = {
				HEADER : "",
				CONTACT: "",
				EMPLOYEE :"",
				STATUS : "",
				BASKET : ""
				
					
		};
		var changeSet = []; 
		var headerGuid = this.headerGuid;
		var basketData = this.byId('productBasketEdit').getModel("json").getData();
		var oModel = this.oModel;
		var that  = this;
		//Store the new values
		
		//EXTENSION POINT
		//initializing the changeset to an empty array. Add oData requests to this changeSet array
		changeSet = [];
		//Your custom field might be updated by another oData request
		this.changeSetMapping.CUSTOM_UPDATE_REQUEST = "";
		
		//since this is the first request to be sent in the $batch, the request number is intialized to zero. Increment it on every request being added to changeSet
		this.requestNumber = 0;
		 /**
		 * @ControllerHook extHookCheckDeltaAndFrameRequests is the controller hook that provides for sending additional update requests to the
		 *                 backend with the delivered updates which are on the header, status, employee responsible (wave 4 and above), and the product basket. 
		 *                 The customer can check for changed fields and send update requests only for the fields that have actually been changed.  
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookCheckDeltaAndFrameRequests
		 * @param {object} changeSet
		 * @return {void}
		 */
		if (this.extHookCheckDeltaAndFrameRequests){
			this.extHookCheckDeltaAndFrameRequests(changeSet);
		}
		
		var tempEntry = {
				Guid : headerGuid,        
				Description : this.byId('description').getValue(),
				ExpectedSalesVolume : this.byId('expectedSalesVolume').getValue(),
				CurrencyCode :  this.byId('currency').getValue(),
				ChanceOfSuccess : this.byId('chanceOfSuccess').getValue(),
				StartDate : this.getDateTimeStampFromDatePicker(this.byId('datePickerStartDate')),
				ClosingDate :  this.getDateTimeStampFromDatePicker(this.byId('datePickerEndDate')),
				//EmployeeRespName : this.byId('inputEmpResponsible').getValue(),
				SalesStageCode : this.byId('stages').getSelectedKey(),
				UserStatusCode : this.byId('userStatus').getSelectedKey(),
				PriorityCode : this.byId('priority').getSelectedKey(),
				ForecastRelevance : this.byId('switch').getState()
		};

		var entry = { };
		var key;	
		var needsUpdate = false;

		//Compare all in loop
		for(key in tempEntry)
		{
			switch(key){
			case "Guid"        :        entry[key] = tempEntry[key];
			                            break;
			case "StartDate"   :
			case "ClosingDate" :
									    if(!this._areDatesSame(this.HeaderObject[key],tempEntry[key])){
   								    		  entry[key] = tempEntry[key];
									    	  needsUpdate = true;
									    }    
			                            break;
			case "ChanceOfSuccess" : 
										if(Number(this.HeaderObject[key]) !== Number(tempEntry[key])){
											entry[key] = tempEntry[key];
											needsUpdate = true;
										}
										break;
			
			case "ExpectedSalesVolume" :  if(this.HeaderObject[key] !== tempEntry[key]){
				                                  entry[key] = tempEntry[key];
				                                  if(!entry.hasOwnProperty("CurrencyCode")){
				                                	  entry["CurrencyCode"] = tempEntry["CurrencyCode"];
				                                  }
		                                    }
			default  :                 if(this.HeaderObject[key] !== tempEntry[key]){
										 		
											entry[key] = tempEntry[key];
											needsUpdate = true;
										 }
			
			
			}
		}			
			
		  /**
		 * @ControllerHook extHookAddCustomHeaderFields is the controller hook that provides for adding additional fields that are part of the opportunity header.
		 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookAddCustomHeaderFields
		 * @param {object}
		 *          entry
		 * @return {boolean}
		 */
		if (this.extHookAddCustomHeaderFields){
			needsUpdate = needsUpdate ||  this.extHookAddCustomHeaderFields(entry);
		}
        	

		//if value is changed
		if(needsUpdate === true)
		{
			this.changeSetMapping.HEADER = this.requestNumber;
			this.requestNumber++;
			changeSet.push(oModel.createBatchOperation("Opportunities(guid'"+headerGuid+"')","MERGE",entry,null));
		}
		else
			this.changeSetMapping.HEADER = "";

		//only when status is changed
		if(this.userStatusCode !== this.byId('userStatus').getSelectedKey())
		{
			//first search for the correct status profile
			this.changeSetMapping.STATUS = this.requestNumber;
			this.requestNumber++;
			var entry;
			var statusProfile;
			var j,tempLength;
			statusProfile = this.StatusProfile; 
			entry = {
					HeaderGuid : headerGuid,
					StatusProfile : statusProfile,
					UserStatusCode : this.byId('userStatus').getSelectedKey()
			};
			changeSet.push(oModel.createBatchOperation("OpportunityStatuses(StatusProfile='"+statusProfile+"',UserStatusCode='"+this.byId('userStatus').getSelectedKey()+"',HeaderGuid=guid'"+headerGuid+"')","MERGE"
					,entry,null));
		}
		else
			this.changeSetMapping.STATUS = "";

		//Check if contact is filled correctly
		if(this.byId("inputMainContact").getValue()!= this.oSelectedContact.fullName){
			if(this.byId("inputMainContact").getValue()!=""){
			this.showContactF4();
			this.requestNumber = 0;
			this.oModel.clearBatch();
			return;
			}
		}
		
		//updating main contact 
		if(this.HeaderObject.MainContactId !== this.oSelectedContact.contactID || 
				this.HeaderObject.MainContactName !== this.byId('inputMainContact').getValue()){
			
			var url = "";
			var payload = {};
			
			if(this.byId('inputMainContact').getValue() === ""){
				url = "OpportunitySalesTeamSet(PartnerNumber='"+ "" +"',PartnerFunctionCode='00000015',HeaderGuid=guid'"+this.headerGuid+"')";
				payload = {
						HeaderGuid : this.headerGuid,
						PartnerFunctionCode : "00000015",
						PartnerNumber : "",
						MainPartner : true
					};
			}
			else{
				url = "OpportunitySalesTeamSet(PartnerNumber='"+this.oSelectedContact.contactID+"',PartnerFunctionCode='00000015',HeaderGuid=guid'"+this.headerGuid+"')";
				payload = {
						HeaderGuid : this.headerGuid,
						PartnerFunctionCode : "00000015",
						PartnerNumber : this.oSelectedContact.contactID,
						MainPartner : true
					};
			}
			this.changeSetMapping.CONTACT = this.requestNumber;
			this.requestNumber++;
			changeSet.push(oModel.createBatchOperation(url,
					"MERGE",payload,null));
		}
		else
			this.changeSetMapping.CONTACT = "";
		
		
		//updating employee responsible 
		  //updating employee responsible - only relevant from wave 4 onwards
		if(parseFloat(this.sBackendVersion) >= 2.0){
			
	    if(this.HeaderObject.EmployeeResponsibleNumber !== this.oSelectedEmployee.employeeID ||
	    	this.HeaderObject.EmployeeResponsibleName !== this.byId('inputEmpResponsible').getValue()){
	    	
	    	var url; 
	    	var payload = {};
	    	if(this.byId('inputEmpResponsible').getValue() === ""){
	    		url = "OpportunitySalesTeamSet(PartnerNumber='"+"',PartnerFunctionCode='00000014',HeaderGuid=guid'"+this.headerGuid+"')";
	    		payload = {
	    				HeaderGuid : this.headerGuid,
	    	    		PartnerFunctionCode : "00000014",
	    	    		PartnerNumber : "",
	    	    		MainPartner : true
	    		};
	    	}
	    	else{
	    		url ="OpportunitySalesTeamSet(PartnerNumber='"+this.oSelectedEmployee.employeeID+"',PartnerFunctionCode='00000014',HeaderGuid=guid'"+this.headerGuid+"')";
	    		payload = {
	    				HeaderGuid : this.headerGuid,
	    	    		PartnerFunctionCode : "00000014",
	    	    		PartnerNumber : this.oSelectedEmployee.employeeID,
	    	    		MainPartner : true
	    		};
	    		
	    	}
	    	   this.changeSetMapping.EMPLOYEE = this.requestNumber;
	    	   this.requestNumber++;
	    	
	    	              changeSet.push(oModel.createBatchOperation(url,
	    			       "MERGE",payload,null));
	    }
	    else
	    	//no update required for employee responsible
	    	this.changeSetMapping.EMPLOYEE = "";
	    
		}
	
	    //Delete of products
		var i;
		for(i=0;i<this.deleteBuffer.length;i++)
		{
			this.bBasketUpdate = true;
			var entry = {
					HeaderGuid : this.deleteBuffer[i].HeaderGuid,
					ItemGuid : this.deleteBuffer[i].ItemGuid,
					ProductGuid : this.deleteBuffer[i].ProductGuid,	
					ProductId : this.deleteBuffer[i].ProductId,
					ProcessingMode : "D"

			};
		
			/**
			 * @ControllerHook extHookAddCustomColumnsForProductDelete is the controller hook that provides for adding new columns
			 *                 during deletion of products from the product basket.
			 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookAddCustomColumnsForProductDelete
			 * @param {object} entry
			 * @param {object} deleteBuffer[i]         
			 */
			if (this.extHookAddCustomColumnsForProductDelete){
			       this.extHookAddCustomColumnsForProductDelete(entry,this.deleteBuffer[i]);
			}
			
		//	oModel.addBatchChangeOperations([oModel.createBatchOperation("OpportunityProducts(HeaderGuid=guid'"+this.deleteBuffer[i].HeaderGuid+"',ItemGuid=guid'"+this.deleteBuffer[i].ItemGuid+"')","MERGE",entry,null)]);
		changeSet.push(oModel.createBatchOperation("OpportunityProducts(HeaderGuid=guid'"+this.deleteBuffer[i].HeaderGuid+"',ItemGuid=guid'"+this.deleteBuffer[i].ItemGuid+"')","MERGE",entry,null));
		}

		//Update of products - modify existing products, create added products
		var basketData = this.byId('productBasketEdit').getModel("json").getData();
		
		var changedBasket = this.byId('productBasketEdit').getItems();
		var i,length,j;
		length = basketData.Products.length;
		// NLUN - CodeScan Changes - Debugger statement should not be in the productive code
//		debugger;
		for(i=0;i<length;i++)
		{
			if(basketData.Products[i].Backend === "X")
			{
				//Search the BackendProducts if the update really needs to go through
				var oOldEntry = this.BackendProducts[basketData.Products[i].ItemGuid];
				var oNewEntry = basketData.Products[i];
				var bValue = false;
//				var val, index;
				
//				var cells = changedBasket[i].getCells();
//				for(j = 0; j < cells.length; j++){
//					if(cells[j].data("field") === "QUANTITY"){
//						 index = j;
//						var oNewQuantity = cells[j].getContent()[0];
//						val = parseFloat(oNewQuantity.getValue()) + "";
//						break;
//					}
//				}
//				
				/**
				 * @ControllerHook extHookCheckDeltaOnProductEntry is the controller hook that provides for checking of fields in the product entry that have changed
				 *                 from the original entry before they are edited.
				 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookCheckDeltaOnProductEntry
				 * @param {object} oOldEntry
				 * @param {object} oNewEntry   
				 * @return {boolean}     
				 */
				if (this.extHookCheckDeltaOnProductEntry){
				    bValue =  this.extHookCheckDeltaOnProductEntry(oOldEntry,oNewEntry);
				}
				
				var entry = {
						HeaderGuid : basketData.Products[i].HeaderGuid,
						ItemGuid : basketData.Products[i].ItemGuid,
						ProductGuid : basketData.Products[i].ProductGuid,
						ProcessingMode : "B"
				};
								
				if(oOldEntry.Quantity !== oNewEntry.Quantity)
				{
					this.bBasketUpdate = true;
					bValue = true;
					entry['Quantity'] =  oNewEntry.Quantity;
				}
				
				if(oOldEntry.TotalExpectedNetValue !== oNewEntry.TotalExpectedNetValue){
					this.bBasketUpdate = true;
					bValue = true;
					entry['TotalExpectedNetValue'] =  oNewEntry.TotalExpectedNetValue;
					
				} 
				

				/**
				 * @ControllerHook extHookAddCustomColumnsForProductModify is the controller hook that provides for adding new columns 
				 *                 during modification of products in the product basket.
				 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookAddCustomColumnsForProductModify
				 * @param {object} entry
				 * @param {object} oNewEntry        
				 */
				if (this.extHookAddCustomColumnsForProductModify){
				     this.extHookAddCustomColumnsForProductModify(entry,oNewEntry);
				}
				
				if(bValue == true){
				changeSet.push(oModel.createBatchOperation("OpportunityProducts(HeaderGuid=guid'"+basketData.Products[i].HeaderGuid+"',ItemGuid=guid'"+basketData.Products[i].ItemGuid+"')",
							"MERGE",entry,null));
				}
				
			}

			else if(basketData.Products[i].Backend === "")
			{
				this.bBasketUpdate = true;
				var entry = {
						HeaderGuid : basketData.Products[i].HeaderGuid,
						ItemGuid :  "00000000-0000-0000-0000-000000000001",
						ProductId : basketData.Products[i].ProductId,
						Quantity : basketData.Products[i].Quantity,
						TotalExpectedNetValue :  basketData.Products[i].TotalExpectedNetValue,
						Unit : basketData.Products[i].Unit,
						ProcessingMode : "A"

				};
				
				/**
				 * @ControllerHook extHookAddCustomColumnsForProductCreate is the controller hook that provides for adding new columns
				 *                 during creation of products in the product basket.
				 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookAddCustomColumnsForProductCreate
				 * @param {object} entry
				 * @param {object} basketData.Products[i]
				 */
				if (this.extHookAddCustomColumnsForProductCreate){
					 this.extHookAddCustomColumnsForProductCreate(entry,basketData.Products[i]);
				}
				
				changeSet.push(oModel.createBatchOperation("OpportunityProducts","POST",entry,null));
			}
		}


		if(this.bBasketUpdate === true)
		{
			
			this.changeSetMapping.BASKET = this.requestNumber;
			this.requestNumber++;
		}
		else
			this.changeSetMapping.BASKET = "";
		//oModel.addBatchChangeOperations(changeSet);

		if(changeSet.length > 0){
			oModel.addBatchChangeOperations(changeSet);
			return true;
		}
			
	
		return false;
		
		
	},

	//Edit save 
	onEditSave : function(){
		//Form validation
		var oModel = this.oModel;
		oModel.bRefreshAfterChange = false;
		
		if(this.validateDates()===false)
		return;	
		if(this.validateEditPage() === false)
		{sap.ca.ui.message.showMessageToast(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('MANDAT_FIELD'));
		return ;
		}
		if(this.validateCurrency()===true){

			sap.ca.ui.dialog.confirmation.open({
				question :this.currencyMessage,
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
		
		var oModel = this.oModel;
		if(this._checkDataLoss()){
		  var that1  = this;
		  this.pageNeedsUpdate();
		     if(this.requestNumber > 0)			
		        {
					sap.ca.ui.utils.busydialog.requireBusyDialog();
					var x = oModel.submitBatch(function(oResponses){
		
						that1.handleBatchResponses(oResponses);
		
					},
					function(oError)
					{
					},true
					);
		         }
		 }
		 /*else
			 return;*/
		 
		 else{
			 this.datalossDismissed({isConfirmed : true});
			 this.oModel.clearBatch();
		 }
		 }
	},


	handleBatchResponses : function(oResponses)
	{
		var statuses = [];
		var responseObject;
		var bHeaderUpdateSuccess = false;
		var bStatusUpdateSuccess = false;
		var bPartialUpdate = false;
		var bFail = false;
		var errorMessage ="";
		this.bEmployeeUpdateSuccess = false;
		var length = oResponses.__batchResponses.length;
		sap.ca.ui.utils.busydialog.releaseBusyDialog();
		if(oResponses.__batchResponses[0].hasOwnProperty("__changeResponses")){
			
			
			  /**
			 * @ControllerHook extHookHandleResponsesForCustomUpdates is the controller hook that provides for custom handling of the responses for the custom updates. The oResponses argument contains the responses for all the requests that are framed.
			 *                 The specific response can be identified by using the changeSetMapping number as an index in the oResponses array.
			 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookHandleResponsesForCustomUpdates
			 * @param {object}
			 *          oResponses
			 * @return {void}
			 */
			if (this.extHookHandleResponsesForCustomUpdates){
				 this.extHookHandleResponsesForCustomUpdates(oResponses);
			}
			
			
		if(this.changeSetMapping.HEADER !== "")
		{
			responseObject = oResponses.__batchResponses[0].__changeResponses[this.changeSetMapping.HEADER];

			if(parseInt(responseObject.statusCode) >= 400)
			{     
				statuses.push(responseObject.statusText);
				bFail = true;
				errorMessage += JSON.parse(responseObject.response.body).error.message.value +"\n";
			}	
			else
			{
				this.HeaderObject.Description = this.byId('description').getValue();
				this.HeaderObject.StartDate =this.byId('datePickerStartDate').getDateValue();
				this.HeaderObject.ClosingDate = this.byId('datePickerEndDate').getDateValue();
				this.HeaderObject.SalesStageDescription = this.byId('stages').getSelectedItem().getText();
				this.HeaderObject.SalesStageCode = this.byId('stages').getSelectedKey();
				this.HeaderObject.PriorityText = this.byId('priority').getSelectedItem().getText();
				this.HeaderObject.PriorityCode = this.byId('priority').getSelectedKey();
				this.HeaderObject.ExpectedSalesVolume = this.byId('expectedSalesVolume').getValue();
				this.HeaderObject.ChanceOfSuccess = this.byId('chanceOfSuccess').getValue();
				this.HeaderObject.CurrencyCode = this.byId('currency').getValue();
				this.HeaderObject.ForecastRelevance = this.byId('switch').getState();
				bHeaderUpdateSuccess = true;
				bPartialUpdate=true;
			}
		}
		if(this.changeSetMapping.STATUS !== "")
		{
			responseObject = oResponses.__batchResponses[0].__changeResponses[this.changeSetMapping.STATUS];
			if(parseInt(responseObject.statusCode) < 400 )
			{
				this.HeaderObject.UserStatusCode = this.byId('userStatus').getSelectedKey();
				this.HeaderObject.UserStatusText = this.byId('userStatus').getSelectedItem().getText();
				bStatusUpdateSuccess = true;
				bPartialUpdate=true;
			}
			else
			{
				statuses.push(responseObject.statusText);
				bFail  = true;
				errorMessage += JSON.parse(responseObject.response.body).error.message.value +"\n";

			}
		}
		if(this.changeSetMapping.CONTACT !== "")
		{
			responseObject = oResponses.__batchResponses[0].__changeResponses[this.changeSetMapping.CONTACT];
			if(parseInt(responseObject.statusCode) >= 400 )
			{
				statuses.push(responseObject.statusText);
				bFail  = true;
				errorMessage += JSON.parse(responseObject.response.body).error.message.value +"\n";
			}
			else
			{
				bPartialUpdate = true;
				this.HeaderObject.MainContactId = this.oSelectedContact.contactID;
				this.HeaderObject.MainContactName = this.oSelectedContact.fullName;
			}
		}
		//relevant only for backend schema versions >= 2.0 	
		if(parseFloat(this.oVersioningModel.getData().BackendSchemaVersion) >= 2.0){
			if(this.changeSetMapping.EMPLOYEE !== "")
			{
				responseObject = oResponses.__batchResponses[0].__changeResponses[this.changeSetMapping.EMPLOYEE];
				if(parseInt(responseObject.statusCode) >= 400 )
				{
					//main contact update failure - push error text into statuses array
					statuses.push(responseObject.statusText);
					bFail  = true;
					errorMessage += JSON.parse(responseObject.response.body).error.message.value +"\n";
					this.oSelectedEmployee.employeeID = this.HeaderObject.EmployeeResponsibleNumber;
					this.oSelectedEmployee.fullName = this.HeaderObject.EmployeeResponsibleName;

				}
				else
				{
					//main contact update success  - maintain updated contact in HeaderObject
					bPartialUpdate = true;
					this.HeaderObject.EmployeeResponsibleNumber = this.oSelectedEmployee.employeeID;
					this.HeaderObject.EmployeeResponsibleName = this.oSelectedEmployee.fullName;
					this.byId('inputMainContact').setValue(this.HeaderObject.EmployeeResponsibleName);
					this.bEmployeeUpdateSuccess = true;


				}
			}
		}
		if(this.changeSetMapping.BASKET !== "")
		{
			var i;
			var length = oResponses.__batchResponses[0].__changeResponses.length;
			
			for(i = this.changeSetMapping.BASKET;i<length;i++)
			{
			
				responseObject = oResponses.__batchResponses[0].__changeResponses[i];
				if(parseInt(responseObject.statusCode) >= 400 )
				{
					statuses.push(responseObject.statusText);
					bFail  = true;
					errorMessage += JSON.parse(responseObject.response.body).error.message.value +"\n";
				}
				else
					bPartialUpdate = true;

			}
			
		}
			if(bPartialUpdate && bFail)
			{
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('PARTIAL_SAVE'),
					details: errorMessage
				},function(){});
				return;
			}
			if(!bPartialUpdate && bFail)
			{
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_FAILED'),
					details: errorMessage
				},function(){});
				return;
			}
		}
		else{
			 bPartialUpdate = true;
			   bFail = true;
			   sap.ca.ui.message.showMessageBox({
				    type: sap.ca.ui.message.Type.ERROR,
				    message : this.oI18nModel.getResourceBundle().getText('SAVE_FAILED'),
				    details: JSON.parse(oResponses.__batchResponses[0].response.body).error.message.value
				},function(){});
			   return; 
			
		}
		
		if(bHeaderUpdateSuccess || bStatusUpdateSuccess)
			this.refreshHeaderList();

		if(bFail)
		{
			{
				//save failed
				sap.ca.ui.message.showMessageBox({
					type: sap.ca.ui.message.Type.ERROR,
					message : sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_FAILED'),
					details: errorMessage
				},function(){});
			}
		}
		else
		{
			sap.ca.ui.message.showMessageToast(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('OPP_SAVED')); 
			this.bNavOnUpdate = true;
			
			var s3Controller = this.getDetailController();
			
			if(s3Controller === null){
				window.history.go(-1);
				return;
			}
			var ctx = "Opportunities(guid'"+this.headerGuid+"')";
			if(!jQuery.device.is.phone)
				{
				if(!this.fullScreenMode)
				this.oRouter.navTo("detail", {
					contextPath : ctx },!jQuery.device.is.phone);
				else
					this.oRouter.navTo("display", {
						contextPath : ctx },!jQuery.device.is.phone);	
				}
			else
				this._navBack();
		}
	},

	refreshHeaderList : function()
	{
		 var sPath = "/" + "Opportunities(guid'" + this.headerGuid + "')";
		   var item = this.getItemFromSPath(sPath);
		   if(!item){
			 //better refresh the model when we are not able to update the list item from the client side
			   this.oModel.refresh();
			   return;
		   }
		   if(!this.s2Controller){
			   return;
		   }
		   
		   //also update the toolbar text if opportunity filter exists on the master list
		   if(this.s2Controller.opportunityID || this.s2Controller.nGuid){
		
			   this.s2Controller.desc = this.HeaderObject["Description"];
		   	   this.s2Controller.byId("labelInfo").setText(this.s2Controller.desc);
		   
		   }  
		   var key;
		   var data = item.getBindingContext().getObject();
		   for(key in this.HeaderObject){
			   data[key] = this.HeaderObject[key];
		   }
		   this.s2Controller.getList().updateItems();
	//	s2Controller.getView().getModel().refresh();
	}, 
	
	 getItemFromSPath : function(sPath)
	   {
		   if(!this.s2Controller){
			   return null;
		   }
		   var items = this.s2Controller.getList().getItems();
		   var i;
		   var context = this.oModel.getContext(sPath);
		   for(i=0;i<items.length;i++){
			   if(context === items[i].getBindingContext()){
		           return items[i];
			   }
		   }
		   return null;
	   },

	   onAddProduct : function(oEvent){

			
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


	validateEditPage : function()
	{
		var check_error = false;
		
		if(this.byId('description').getValue() === ""){
			this.byId('description').setValueState(sap.ui.core.ValueState.Error);
			check_error = true; 
		}


		if(this.byId('expectedSalesVolume').getValue() === ""){
			this.byId('expectedSalesVolume').setValue(0);

		}

		if(this.byId('description').getValueState() === sap.ui.core.ValueState.Error)
			check_error = true; 
		if((this.byId('datePickerStartDate').getValueState() === sap.ui.core.ValueState.Error) || (this.byId('datePickerEndDate').getValueState() === sap.ui.core.ValueState.Error)){
			check_error = true;
		}

		if(this.byId('chanceOfSuccess').getValueState() === sap.ui.core.ValueState.Error)
			check_error = true; 
		if(this.byId('expectedSalesVolume').getValueState() === sap.ui.core.ValueState.Error)
			check_error = true; 
		if(this.byId('datePickerEndDate').getValue() === ""){
			this.byId('datePickerEndDate').setValueState(sap.ui.core.ValueState.Error);
			check_error = true;   
		}
		
		if(this.validateProductBasket() === false){
			check_error = true;
		}
		 //EXTENSION POINT
		   /**
			 * @ControllerHook extHookValidateAdditionalFields is the controller hook that provides for the custom validations that can be implemented to validate additional fields.
			 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookValidateAdditionalFields
			 * @return {boolean}
			 */
			if (this.extHookValidateAdditionalFields){
			   	var bValue = this.extHookValidateAdditionalFields(); 
			   		if(!bValue){
			   			check_error = true;
			   		}
			   	}
		
		if (check_error == true ){
			return false;
		}
		
		return true;	
	},
	
	validateProductBasket : function(){
	
		var items = this.byId('productBasketEdit').getItems();
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
	validateCurrency : function(){
		var currLenght = this.Currencies.length ;
		var bReturnError = true;
		var currencyInput = this.getView().byId("currency").getValue().trim();
		currencyInput = 		currencyInput.toLocaleUpperCase();
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


	validateDates : function(){
		 //date validations for edit page - called on save
		   var datePickerStart = this.byId('datePickerStartDate');
		   var datePickerEnd = this.byId('datePickerEndDate');
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
	quantityChanged : function(oEvent)
	{
		var data = oEvent.getSource().getBindingContext("json").getObject();
		var newValue = oEvent.getParameter('newValue'); 
		var pattern = /[^0-9.]/;
		var listItem = oEvent.getSource().getParent().getParent();
		if(pattern.test(newValue) === false)
		{
			if(newValue.split(".").length > 2)  //error
			{
				data.Quantity = data.OldValue;
				oEvent.getSource().setValue(data.Quantity);
			}
			else // no error 
			{
				data.OldValue = newValue;
				data.Quantity = newValue;
				oEvent.getSource().setValueState(sap.ui.core.ValueState.None);
				var tempValue = newValue;
				if(newValue === "")
					tempValue = "0";
				var unitPriceCell = null;
				var totalNetValCell = null;
				var cells = listItem.getCells();
				//do a sweep on cells to get the unit price cell and the net value cell
				for(var i = 0; i < cells.length; i++){
					if(cells[i].data("field") === "NETVALUE"){
						unitPriceCell = cells[i];
					}
					
					if(cells[i].data("field") === "TOTALNETVALUE"){
						totalNetValCell = cells[i];
					}
				}
				
				if(unitPriceCell && totalNetValCell){
				var unitPrice = unitPriceCell.getNumber();
				if(unitPrice === ""){
					// NLUN - CodeScan Changes - Global variables

					var setUnitPrice = "0";
					
					//listItem.getCells()[3].setText("" + parseFloat(tempValue)*parseFloat(setUnitPrice));
				}else

					totalNetValCell.setNumber("" + parseFloat(tempValue)*parseFloat(unitPrice));
			}
			}
		}
		else //error 
		{
			data.Quantity = data.OldValue;
			oEvent.getSource().setValue(data.Quantity);
		}
	},

	onCancelDialog : function(oEvent)
	{
		this.oAddProductsFragment.close();
		this.oAddProductsFragment.getContent()[0].removeSelections();	
	},
    enableProductsAddButton : function(oEvent){
    	
       if(this.oAddProductsFragment.getContent()[0].getSelectedItems().length > 0){
    	   this.oAddProductsFragment.getBeginButton().setEnabled(true);
       }
       else{
    	   this.oAddProductsFragment.getBeginButton().setEnabled(false);
       }
    },
	onAddDialog : function(oEvent)
	{
		var oProductList = this.oAddProductsFragment.getContent()[0];
		var oSelectedItems = oProductList.getSelectedItems(); 
		var headerGuid = this.headerGuid;
		var productBasketData = {
				Products : []
		};

		var data = this.byId('productBasketEdit').getModel("json").getData();
		if(data && data.hasOwnProperty("Products"))
			productBasketData.Products = data.Products;
		// var headerGuid = this.headerGuid;
		var i = 0;
		var length = oSelectedItems.length;
		var oListItem;
		for (i = 0; i < length; i++) {
			oListItem = oSelectedItems[i];
			var tempObject = oListItem.getBindingContext("json").getObject();

			var pushObject = {
					HeaderGuid: headerGuid,	
					ItemGuid : "",
					ProcessingMode : "",
					ProductGuid : tempObject.ProductGuid,
					ProductId : tempObject.ProductId,
					ProductName : tempObject.ProductDescription,
					Quantity : "1",
					Unit : tempObject.Unit,
					Backend : "",
					OldValue : "1",
					TotalExpectedNetValue: ""

			};
			/**
			 * @ControllerHook extHookExtendProductEntry is the controller hook that provides for addition of extra fields to the product entry.
			 * @callback sap.ca.scfld.md.controller.BaseDetailController~extHookExtendProductEntry
			 * @param {object} pushObject
			 * @param {object} tempObject       
			 */
			if (this.extHookExtendProductEntry){
			     this.extHookExtendProductEntry(pushObject,tempObject);
			}
			productBasketData.Products.push(pushObject);

		}
		this.byId('productBasketEdit').getModel("json").updateBindings();
		oProductList.removeSelections();
		oEvent.getSource().getParent().close();
	},

	deleteProduct : function(oEvent)
	{
		var data = oEvent.getSource().getModel("json").getData();
		var product = oEvent.getSource().getBindingContext("json").getObject();
		var i;
		var length = data.Products.length;

		for(i=0;i<length;i++)
			if(product == data.Products[i])
			{
				data.Products.splice(i,1);

				if(product.Backend === "X")
					this.deleteBuffer.push(product);
				break;

			}
		this.byId('productBasketEdit').getModel("json").updateBindings();

	},

	formatDate : function(inputDateValue)
	{
		if(inputDateValue === "" || inputDateValue === null || inputDateValue === undefined)
			return "";
		var locale = new sap.ui.core.Locale(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().sLocale);
		var formatter = sap.ca.ui.model.format.DateFormat.getDateInstance({style : "medium"},locale);
		return formatter.format(inputDateValue);
	},

	//Handling contact f4 help (open and load)
	showContactF4 : function(oEvent)
	{
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
        //var searchstrng = Text[0].trimRight();
        var searchstrng = Text[0].replace(/\s+$/,"");
        this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue(searchstrng);
		var opportunity_Data =this.HeaderObject;
		this.contactF4Fragment.open();
		var jsonModel = new sap.ui.model.json.JSONModel();
		this.contactF4Fragment.setModel(jsonModel,"json");
		if(opportunity_Data.ProspectNumber !== "")
		{
			toolbar.setVisible(true);
			if(opportunity_Data.ProspectName !== ""){
			toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + opportunity_Data.ProspectName);	
			}
			else{
				toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + opportunity_Data.ProspectNumber);
			}
			this.oModel.read("/AccountCollection(accountID='" + opportunity_Data.ProspectNumber + "')/Contacts",null,["$filter=substringof('"+this.byId('inputMainContact').getValue()+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
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
     else{
    	 toolbar.setVisible(false);
    	 this.contactF4Fragment.getModel('json').setData({ContactCollection : []});
	     this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
	    this.oModel.read("ContactCollection",null,null,true,jQuery.proxy(function(odata,response)
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
	//Handling employee f4 help (open and load)
	showEmployeeF4 : function(oEvent)
	{
		 //throw the employee f4 dialog 
	
		if(!this.employeeF4Fragment){	
			this.employeeF4Fragment  =  new sap.ui.xmlfragment(this.createId("employeeF4"), 'cus.crm.opportunity.view.EmployeeF4', this);  	
			//employeeF4 is backed  by json model 
			this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel(),"json");	
			this.employeeF4Fragment.setModel(this.oI18nModel,'i18n');
		}

		
		
//		this.employeeF4Fragment.getContent()[0].removeSelections();
//		this.employeeF4Fragment.setModel(new sap.ui.model.json.JSONModel());
//		this.employeeF4Fragment.setModel(this.controller.getView().getModel(
//		"i18n"), "i18n");
		
		this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
		var toolbar = this.employeeF4Fragment.getContent()[0].getInfoToolbar();
		
		var toolbarLabel = toolbar.getContent()[0];
		toolbar.setVisible(false);
		var searchtxt = this.byId('inputEmpResponsible')._lastValue;
        var Text = searchtxt.split('/'); 
        var searchstrng = Text[0].replace(/\s+$/,"");
        this.employeeF4Fragment.getSubHeader().getContentLeft()[0].setValue(searchstrng);
		var opportunity_Data = this.HeaderObject;
		this.employeeF4Fragment.open();
		var jsonModel = new sap.ui.model.json.JSONModel();
		this.employeeF4Fragment.setModel(jsonModel,"json");
		if(opportunity_Data.ProspectNumber !== "")
		{
			toolbar.setVisible(true);
			if(opportunity_Data.ProspectName !== ""){
			toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + opportunity_Data.ProspectName);
			}
			else{	
			toolbarLabel.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + opportunity_Data.ProspectNumber);
			}
			this.oModel.read("/AccountCollection(accountID='" + opportunity_Data.ProspectNumber + "')/EmployeeResponsibles",null,["$filter=substringof('"+this.byId('inputEmpResponsible').getValue()+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
			
				this.employeeF4Fragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
				this.employeeF4Fragment.getModel('json').setData({ 
					EmployeeCollection :  response.data.hasOwnProperty("results")  ?  response.data.results : [response.data]        		
				});
			
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
	     this.oModel.read("EmployeeCollection",null,["$filter=substringof('"+this.byId('inputEmpResponsible').getValue()+"'"+",fullName)"],true,jQuery.proxy(function(odata,response)
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
	},


	closeContactF4 : function(oEvent)
	{
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData({ContactCollection : []});
		this.contactF4Fragment.setModel(jsonModel,"json");
		this.contactF4Fragment.close();
	},
	closeEmployeeF4 : function(oEvent)
	{
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData({EmployeeCollection : []});
		this.employeeF4Fragment.setModel(jsonModel,"json");
		this.employeeF4Fragment.close();
	},

	setContact : function(oEvent)
	{
		this.oSelectedContact = oEvent.getSource().getSelectedItem().getBindingContext("json").getObject();
		if(this.oSelectedContact.fullName !== "")
			this.byId('inputMainContact').setValue(this.oSelectedContact.fullName);
		else 
			this.byId('inputMainContact').setValue(this.oSelectedContact.contactID);
		this.contactF4Fragment.getContent()[0].removeSelections();
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData({ContactCollection : []});
		this.contactF4Fragment.setModel(jsonModel,"json");
		this.contactF4Fragment.close();

	},
	setEmployee : function(oEvent)
	{
		this.oSelectedEmployee = oEvent.getSource().getSelectedItem().getBindingContext("json").getObject();
		if(this.oSelectedEmployee.fullName !== "")
			this.byId('inputEmpResponsible').setValue(this.oSelectedEmployee.fullName);
		else 
			this.byId('inputEmpResponsible').setValue(this.oSelectedEmployee.employeeID);
		this.employeeF4Fragment.getContent()[0].removeSelections();
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData({EmployeeCollection : []});
		this.employeeF4Fragment.setModel(jsonModel,"json");
		this.employeeF4Fragment.close();

	},
	searchContact : function(oEvent)
	{
		var sValue = oEvent.getParameter("query");
		this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
		var toolbar = this.contactF4Fragment.getContent()[0].getInfoToolbar();
		if(toolbar.getVisible()===false){
			this.oModel.read("ContactCollection",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
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
			this.oModel.read("/AccountCollection(accountID='" + this.HeaderObject.ProspectNumber + "')/Contacts",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
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
			this.oModel.read("/AccountCollection(accountID='" + this.HeaderObject.ProspectNumber + "')/EmployeeResponsibles",null,["$filter=substringof('"+sValue+"'"+",fullName)"],true,jQuery.proxy(function(odata,response) {
			
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
		this.oModel.read("ContactCollection",null,["$filter=substringof('" + searchText + "',fullName)" ],true,jQuery.proxy(function(odata,response)
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
		this.oModel.read("EmployeeCollection",null,["$filter=substringof('" + searchText + "',fullName)" ],true,jQuery.proxy(function(odata,response)
				{
			this.employeeF4Fragment.getModel('json').setData({ 
				EmployeeCollection : response.data.results 	        		
			});
					
			if(response.data.results.length === 0)
				this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_EMPLOYEE'));     
				},this),jQuery.proxy(function(oError)
						{
					this.employeeF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_EMPLOYEE'));

						},this));
		
	},

	//open and load of currency
	showCurrencyF4 : function(){
		this.oActionSheet = sap.ui.xmlfragment(
				"cus.crm.opportunity.view.CurrencySelectDialog",
				this);
		this.oActionSheet.setModel(this.getView().getModel(
		"i18n"), "i18n");
		var oModel = this.oModel;
		var jsonModel = new sap.ui.model.json.JSONModel();
		var data1;
		oModel.read("Currencies",null,null,false,function(oData,resp) //[ "$filter=ProcessType eq '" + pType+ "'" ]
				{ data1 = {
						Currencies : resp.data.results
				};
				});
		jsonModel.setData(data1);
		this.oActionSheet.setModel(jsonModel,"json");
		this.oActionSheet.open();
	},

	//set currency
	setCurrency : function(oEvent) {

		var selectedItem = oEvent.getParameter("selectedItem");
		this.byId('currency').setValue(selectedItem.data("CurrencyKey"));

	},

	//search currency
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

	//Close currency dialog
	closeCurrencyF4 : function(oEvent) {

		this.byId('dialogCurrencyF4').close();
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
			aFilters.push("$filter=substringof('" + sQuery  + "',ProductDescription)");
		}
		this.oModel.read("Products",null,aFilters,true,jQuery.proxy(function(odata,response){
			
			if(response.data.results.length === 0)
				this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
			this.oAddProductsFragment.getModel('json').setData({Products : response.data.results});
			
			
		},this),jQuery.proxy(function(oError){
			
			this.oAddProductsFragment.getContent()[0].setNoDataText(this.oResourceBundle.getText('NO_DATA_TEXT'));
			
		},this));
	},
	
getDateTimeStampFromDatePicker : function(datePicker){
		
	 //always return UTC date
	  var labelDate = $('#' + datePicker.getIdForLabel()).val();
	  
	  if(labelDate === ""){
		  return null;	
	  }
	  var currentDate = this.oDateFormatter.parse(labelDate);
	  var year = currentDate.getFullYear();
	  var month = currentDate.getMonth();
	  var day = currentDate.getDate();
	  return new Date(Date.UTC(year,month,day));

			
	},
	getDetailController : function(){
		
		return this.getView().getModel('controllers').getData().s3Controller;
	},
	onBack : function(){
		this.onCancel();
	},
	
	dataLossOnBack : function(oResult){
		if(oResult.isconfirmed){
			this.oRouter._navBack();
		}
	},
	
	getHeaderFooterOptions : function(){
		
		var fnBack;
		var s3Controller = this.getDetailController();
		if(jQuery.device.is.Phone || (this.fullScreenMode &&  s3Controller === null)){
			fnBack = jQuery.proxy(this.onBack,this);
		}
		else{
			fnBack = null;
		}
	   	return {
	   		onBack : fnBack,
			sI18NDetailTitle : this.oResourceBundle.getText('EDIT_TITLE'),
			buttonList : [{sI18nBtnTxt : "SAVE",
							onBtnPressed : jQuery.proxy(this.onEditSave,this)
							},
							{
							   sI18nBtnTxt : 'CANCEL',
							   onBtnPressed : jQuery.proxy(this.onCancel,this)
								
							}],
	   	     bSuppressBookmarkButton : true
			
	   	};
	   	
	},
	
	isMainScreen : function(){
		return false;
	},
	
	handleErrors : function(oError){
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
	 _areDatesSame : function(oDate1,oDate2){
     	
     	if(oDate1 === null && oDate2 === null){
     		return true;
     	}
          if(!(oDate1 instanceof Date && oDate2 instanceof Date)){
         	 return false;
          }
	      
         //compare only DD MM YYYY
          if(oDate1.getDate() !== oDate2.getDate()){
         	 return false;
           }
          
          if(oDate1.getMonth() !== oDate2.getMonth()){
         	 return false;
          }
          
          if(oDate1.getFullYear() !== oDate2.getFullYear()){
         	 return false;
          }
    
          return true;
     },
     
     _checkDataLoss : function(){
    	 
    	 var headerGuid = this.headerGuid;
    	 var tempEntry = {
 				Guid : headerGuid,        
 				Description : this.byId('description').getValue(),
 				ExpectedSalesVolume : this.byId('expectedSalesVolume').getValue(),
 				CurrencyCode :  this.byId('currency').getValue(),
 				ChanceOfSuccess : this.byId('chanceOfSuccess').getValue(),
 				StartDate : this.getDateTimeStampFromDatePicker(this.byId('datePickerStartDate')),
 				ClosingDate :  this.getDateTimeStampFromDatePicker(this.byId('datePickerEndDate')),
 				//EmployeeRespName : this.byId('inputEmpResponsible').getValue(),
 				SalesStageCode : this.byId('stages').getSelectedKey(),
 				UserStatusCode : this.byId('userStatus').getSelectedKey(),
 				PriorityCode : this.byId('priority').getSelectedKey(),
 				ForecastRelevance : this.byId('switch').getState()
 		};
    	 
    	var key;
    	var entry = {};
    	//Compare all in loop
 		for(key in tempEntry)
 		{
 			switch(key){
 			
 			case "StartDate"   :
 			case "ClosingDate" :
 									    if(!this._areDatesSame(this.HeaderObject[key],tempEntry[key])){
    								    		 
 									    	return true;
 									    }    
 			                            break;
 			case "ChanceOfSuccess" : 
 										if(Number(this.HeaderObject[key]) !== Number(tempEntry[key])){
 											
 											return true;
 										}
 										break;
 			
 			case "ExpectedSalesVolume" :  if(this.HeaderObject[key] !== tempEntry[key]){
 				                                 return true;
 		                                    }
 			default  :                 if(this.HeaderObject[key] !== tempEntry[key]){
 										 		
 											return true;
 										 }
 			
 			
 			}
     }
         
 		if (this.extHookAddCustomHeaderFields){
			  var bValue =  this.extHookAddCustomHeaderFields(entry);
			  
			  if(bValue){
				  return true;
			  }
		}
 		if(this.userStatusCode !== this.byId('userStatus').getSelectedKey()){
 			return true;
 		}
 		   
 		if(this.HeaderObject.MainContactId !== this.oSelectedContact.contactID || 
				this.HeaderObject.MainContactName !== this.byId('inputMainContact').getValue()){
 		    return true;
 		}
 		
 		if(parseFloat(this.sBackendVersion) >= 2.0){
			
 		    if(this.HeaderObject.EmployeeResponsibleNumber !== this.oSelectedEmployee.employeeID ||
 		    	this.HeaderObject.EmployeeResponsibleName !== this.byId('inputEmpResponsible').getValue()){
 		    	return true;
 		    }
 		}
 		
 		//Deletion of products happening
 		if(this.deleteBuffer.length > 0){
 			return true;
 		}
 		
 		var basketData = this.byId('productBasketEdit').getModel('json').getData();
 		
 		var length = basketData.Products.length;
 		
 		for(var i = 0; i < length ; i++){
 			
 			if(basketData.Products[i].Backend === "X"){
			//Search the BackendProducts if the update really needs to go through
			var oOldEntry = this.BackendProducts[basketData.Products[i].ItemGuid];
			var oNewEntry = basketData.Products[i];
			var bValue = false;
			
			if(oOldEntry.Quantity !== oNewEntry.Quantity)
			{
				return true;
			}
			
			if(oOldEntry.TotalExpectedNetValue !== oNewEntry.TotalExpectedNetValue){
				return true;
			} 
			
		
			if (this.extHookCheckDeltaOnProductEntry){
			    bValue =  this.extHookCheckDeltaOnProductEntry(oOldEntry,oNewEntry);
			    if(bValue){
			    	return true;
			    }
			}
 			}
 			else{
 				return true;
 			}
		
 		}
 		return false;
     }
});












},
	"cus/crm/opportunity/view/S4.view.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"\n\txmlns="sap.m" xmlns:ui="sap.ui.layout" controllerName="cus.crm.opportunity.view.S4"\n\txmlns:ca="sap.ca.ui"  xmlns:html="http://www.w3.org/1999/xhtml" xmlns:custom="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1">\n\t<Page id="editPage" title="{i18n>EDIT_TITLE}" class="sapUiFioriObjectPage"\n\t\tenableScrolling="true">\n\t\t<content>\n\t\t<core:ExtensionPoint name="opportunityEditContentTopExtension"></core:ExtensionPoint>\n\t\t\t<ui:form.SimpleForm id="form1" minWidth="1024"\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\tcolumnsL="1" columnsM="1" class="editableForm" \n\t\t\t\tvisible="{path : \'versioning>/BackendSchemaVersion\',formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}" >\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="descriptionLabel_S4" text="{i18n>NAME}*">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Input id="description" maxLength="40"   \n\t\t\t\t\t\tplaceholder="{i18n>MAX_CHARS}" liveChange="descriptionChanged"></Input>\n\n\n\t\t\t\t\t<Label id="accountLabel_S4" text="{i18n>ACCOUNT}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Text id="account" ></Text>\n\n\t\t\t\t\t<Label id="mainContactLabel_S4" text="{i18n>MAIN_CONTACT}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Input id="inputMainContact" value="" showValueHelp="true"\n\t\t\t\t\t\tvalueHelpRequest="showContactF4"></Input>\n\t\t\t\t\t\t\n\t\t\t\t\t<Label id="empResponsibleLabel_S4" text="{i18n>S4.FORM.EMPLOYEE_RESPONSIBLE}" visible="{path : \'versioning>/BackendSchemaVersion\',\n\t\t\t\t\t    formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t\n\t\t\t\t\t<Input id="inputEmpResponsible" value="" showValueHelp="true" valueHelpRequest="showEmployeeF4"\n\t\t\t\t\tvisible="{path : \'versioning>/BackendSchemaVersion\',formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}">\n\t   \t\t\t \t</Input>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t<Label id="expSalesVolumeLabel_S4" text="{i18n>UNWEIGHTED_VOLUME}"></Label>\n\t\t\t\t\t<Input id="expectedSalesVolume" maxLength="13"\n\t\t\t\t\t\tliveChange="volumeChanged"></Input>\n\t\t\t\t\t<Input id="currency" value="" placeholder="{i18n>CURRENCY}"\n\t\t\t\t\t\tshowValueHelp="true" valueHelpRequest="showCurrencyF4"></Input>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="formType" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="false" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t<Label id="opportunityType_labelS4" text="{i18n>TYPE}"></Label>\n\t\t\t\t<Text id="opportunityType" ></Text>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form5" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="false" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t<Label id="oppIdLabel_S4" text="{i18n>OPPOR_ID} "></Label>\n\t\t\t\t<Text id="id" ></Text>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form99" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="startDateLabel_S4" text="{i18n>START_DATE}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<ca:DatePicker id="datePickerStartDate"\n\t\t\t\t\t\t></ca:DatePicker>\n\n\t\t\t\t\t<Label id="endDateLabel_S4" text="{i18n>CLOSE_DATE}*">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<ca:DatePicker id="datePickerEndDate"\n\t\t\t\t\t\t></ca:DatePicker>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form7" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="statusLabel_S4" text="{i18n>STATUS}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Select id="userStatus" items="{json>/UserStatuses}" class="pos_input">\n\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t<core:Item key="{json>UserStatusCode}" text="{json>UserStatusText}">\n\t\t\t\t\t\t\t</core:Item>\n\t\t\t\t\t\t</items>\n\t\t\t\t\t</Select>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form8" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="stagesLabel_S4" text="{i18n>STAGE}">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Select id="stages" items="{json>/SalesStages}" class="pos_input">\n\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t<core:Item key="{json>SalesStageCode}" text="{json>SalesStageDescription}">\n\t\t\t\t\t\t\t</core:Item>\n\t\t\t\t\t\t</items>\n\t\t\t\t\t</Select>\n\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form81" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="chanceOfSuccessLabel_S4" text="{i18n>CHANCE_OF_SUCCESS}(%)">\n\t\t\t\t\t</Label>\n\t\t\t\t\t<Input id="chanceOfSuccess" liveChange="chanceOfSuccessChanged"\n\t\t\t\t\t\tvalue="{path:\'ChanceOfSuccess\' , formatter: \'cus.crm.opportunity.util.Formatter.texttonumber\'}"></Input>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form9" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="priorityLabel_S4" text="{i18n>PRIORITY}"></Label>\n\t\t\t\t\t<Select id="priority" items="{json>/Priorities}" class="pos_input">\n\t\t\t\t\t\t<items>\n\t\t\t\t\t\t\t<core:Item key="{json>PriorityCode}" text="{json>PriorityText}">\n\t\t\t\t\t\t\t</core:Item>\n\t\t\t\t\t\t</items>\n\t\t\t\t\t</Select>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form10" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="wtVolLabel_S4" text="{i18n>WEIGHTED_VOLUME}"></Label>\n\t\t\t\t\t<Text id="wtVol" class="CosPadding"></Text>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<ui:form.SimpleForm id="form11" minWidth="1024"\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\n\t\t\t\t<ui:content>\n\t\t\t\t\t<Label id="forecastLabel_S4" text="{i18n>FORECAST}"></Label>\n\t\t\t\t\t<Switch id="switch"></Switch>\n\t\t\t\t</ui:content>\n\t\t\t</ui:form.SimpleForm>\n\t\t\t<core:ExtensionPoint name="opportunityEditContentBottomExtension"></core:ExtensionPoint>\n\t\t\t<Table id="productBasketEdit" headerText="{i18n>PRODUCT_BASKET}"\n\t\t\t\tnoDataText="{i18n>EMPTY_PROD}" headerDesign="Standard" items="{json>/Products}"\n\t\t\t\tclass="table_resize">\n\t\t\t\t<headerToolbar>\n\t\t\t\t\t<Toolbar id="productBasketToolbar_S4">\n\t\t\t\t\t\t<Label id="productLabel_S4" text="{i18n>PRODUCT_BASKET}">\n\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t<ToolbarSpacer id="productSpacer_S4" >\n\t\t\t\t\t\t</ToolbarSpacer>\n\t\t\t\t\t\t<Button id="ProductButton" icon="sap-icon://add" text="{path : \'i18n>ADD_PROD\', formatter : \'cus.crm.opportunity.util.Formatter.formatAddMoreProductsText\'}"\n\t\t\t\t\t\t\tpress="onAddProduct">\n\t\t\t\t\t\t</Button>\n\t\t\t\t\t</Toolbar>\n\t\t\t\t</headerToolbar>\n\t\t\t\t<columns>\n\t\t\t\t<core:ExtensionPoint name="opportunityEditProductTabColoumExtension"></core:ExtensionPoint>\n\t\t\t\t\t<Column id="basketColumn1_S4" vAlign="Middle" width="35%">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="productBasketLabel_S4" text="{i18n>PRODUCT_OR_CATEGORY}" design="Bold"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\n\t\t\t\t\t<Column id="basketColumn2_S4" vAlign="Middle" width="20%" hAlign="Right">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="quantityLabel_S4" text="{i18n>QUANTITY}" design="Bold"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\n\t\t\t\t\t<Column id="basketColumn3_S4" vAlign="Middle" width="15%" minScreenWidth="Tablet"\n\t\t\t\t\t\tdemandPopin="true" hAlign="Right">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="unitPriceLabel_S4" text="{i18n>UNIT_PRICE}" design="Bold"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\n\t\t\t\t\t<Column id="basketColumn4_S4" vAlign="Middle" width="20%" hAlign="Right"\n\t\t\t\t\t\tminScreenWidth="Tablet" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t<Label id="vol_S4" text="{i18n>VOLUME}" design="Bold"></Label>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\n\t\t\t\t\t<Column  id="basketColumn5_S4" vAlign="Middle" width="10%" minScreenWidth="Tablet"\n\t\t\t\t\t\thAlign="Right" demandPopin="true">\n\t\t\t\t\t\t<header>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t</Column>\n\t\t\t\t\t\n\t\t\t\t<core:ExtensionPoint name="opportunityEditProductTabColoumendExtension"></core:ExtensionPoint>\t\n\t\t\t\t</columns>\n\t\t\t\t<items>\n\t\t\t\t\t<ColumnListItem id="productBasketTemplate_S4">\n\t\t\t\t\t\t<cells>\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityEditProductTabCellsExtension"></core:ExtensionPoint>\n\t\t\t\t\t\t\t<ui:VerticalLayout id="productBasketVLayout_S4" hAlign="Left">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Label id="productLabelValue_S4" design="Bold"\n\t\t\t\t\t\t\t\t\t\ttext="{path : \'json>ProductGuid\', formatter : \'cus.crm.opportunity.util.Formatter.formatProductName\'}"></Label>\n\t\t\t\t\t\t\t\t\t<Label id="productClassificationValue_S4"\n\t\t\t\t\t\t\t\t\t\ttext="{path: \'json>ProductGuid\',formatter : \'cus.crm.opportunity.util.Formatter.formatProdClassification\'}"></Label>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:VerticalLayout>\n\t\t\t\t\t\t\t<ui:HorizontalLayout id="productBasketHLayout_S4" width="150px" custom:field="QUANTITY">\n\t\t\t\t\t\t\t\t<ui:content>\n\t\t\t\t\t\t\t\t\t<Input width="75px" id="quantityValue_S4" \n\t\t\t\t\t\t\t\t\t\tvalue="{parts:[{path:\'json>Quantity\'}, {path:\'json>Unit\'}], formatter:\'cus.crm.opportunity.util.Formatter.formatQuantityEdit\'}"\n\t\t\t\t\t\t\t\t\t\teditable="{path : \'json>ProductGuid\', formatter : \'cus.crm.opportunity.util.Formatter.formatQuantityField\'}"\n\t\t\t\t\t\t\t\t\t\tliveChange="quantityChanged" class="numberRTL">\n\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t<Text id="unit" text="{json>Unit}" class="UnitPadding"></Text>\n\t\t\t\t\t\t\t\t</ui:content>\n\t\t\t\t\t\t\t</ui:HorizontalLayout>\n\t\t\t\t\t\t\t<ObjectNumber custom:field="NETVALUE" id="netValue_S4" number="{json>NetValue}" numberUnit="{json>CurrencyCode}" />\n\t\t\t\t\t\t\t<Input width="75px" id="expectedNetValue_S4" \n\t\t\t\t\t\t\t\t\t\tvalue="{json>TotalExpectedNetValue}"\n\t\t\t\t\t\t\t\t\t\teditable="true" liveChange="volumeChanged" class="numberRTL">\n\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t<ui:VerticalLayout>\n\t\t\t\t\t\t\t\t<Button id="productDeleteButton_S4" icon="sap-icon://sys-cancel-2"\n\t\t\t\t\t\t\t\t\tvisible="{path : \'json>ProductGuid\',formatter : \'cus.crm.opportunity.util.Formatter.formatDeleteButton\'}"\n\t\t\t\t\t\t\t\t\ttype="Transparent" press="deleteProduct"></Button>\n\t\t\t\t\t\t\t</ui:VerticalLayout>\n\t\t\t\t\t\t\t<core:ExtensionPoint name="opportunityEditProductTabCellsEndExtension"></core:ExtensionPoint>\t\n\t\t\t\t\t\t</cells>\n\t\t\t\t\t</ColumnListItem>\n\t\t\t\t</items>\n\t\t\t</Table>\n\t\t</content>\n\t\t\n\t</Page>\n</core:View>',
	"cus/crm/opportunity/view/S5.controller.js":function(){/*
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

},
	"cus/crm/opportunity/view/S5.view.xml":'<!--\r\n\r\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\r\n\r\n-->\r\n<core:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"\r\n\txmlns:la="sap.ui.layout" xmlns:ca="sap.ca.ui" xmlns="sap.m"\r\n\tcontrollerName="cus.crm.opportunity.view.S5" xmlns:html="http://www.w3.org/1999/xhtml" xmlns:custom="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1">\r\n\r\n\t<!-- //<html:link rel="stylesheet" type="text/css" href="model/mystyle.css"></html:link> -->\r\n\r\n\t<Page id="createPage" title="{i18n>CREATE_TITLE}" class="sapUiFioriObjectPage"\r\n\t\tshowNavButton="true" navButtonPress="toDetail" enableScrolling="true">\r\n\t\t<content>\r\n\t\t<core:ExtensionPoint name="opportunityCreateContentTopExtension"></core:ExtensionPoint>\r\n\t\t\t<la:form.SimpleForm id="form1" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm" visible="{path : \'versioning>/BackendSchemaVersion\',formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label text="{i18n>TYPE}" id="laTypeInput"></Label>\r\n\t\t\t\t\t<Text  id="TxtTypeInput" />\r\n\t\t\t\t\t<Label id="opportunityName_Label" text="{i18n>NAME}*"></Label>\r\n\t\t\t\t\t<Input id="desc" value="" maxLength="40" placeholder="{i18n>MAX_CHARS}"\r\n\t\t\t\t\t\tliveChange="descriptionChanged"></Input>\r\n\t\t\t\t\t<Label id="opportunityAccount_Label" text="{i18n>ACCOUNT}*">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<Input id="customer" value="" showValueHelp="true"\r\n\t\t\t\t\t\tvalueHelpRequest="showAccountF4" ></Input>\r\n\t\t\t\t\t<Label id="opportunityContact_Label" text="{i18n>MAIN_CONTACT}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<Input value="" showValueHelp="true" id="inputMainContact"\r\n\t\t\t\t\t\tvalueHelpRequest="showContactF4"></Input>\r\n                    \r\n                   <Label id="empRespLabel_S5" text="{i18n>S4.FORM.EMPLOYEE_RESPONSIBLE}" visible="{path : \'versioning>/BackendSchemaVersion\',\r\n\t\t\t\t\t    formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<Input id="inputEmpResponsible_S5" value="" showValueHelp="true" valueHelpRequest="showEmployeeF4"\r\n\t\t\t\t\tvisible="{path : \'versioning>/BackendSchemaVersion\',formatter : \'cus.crm.opportunity.util.Formatter.formatEmployeeRespField\'}">\r\n\t   \t\t\t \t</Input>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<Label id="opportunityWhtdVolume_Label" text="{i18n>UNWEIGHTED_VOLUME}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<Input id="volume" value="" maxLength="13" liveChange="volumeChanged"></Input>\r\n\t\t\t\t\t<Input id="currency" value="" placeholder="{i18n>CURRENCY}"\r\n\t\t\t\t\t\tshowValueHelp="true" valueHelpRequest="showCurrencyF4"></Input>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\t\t\t<la:form.SimpleForm id="form2" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label id="opportunityStrtDate_Label" text="{i18n>START_DATE}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<ca:DatePicker id="datePickerStartDate"></ca:DatePicker>\r\n\t\t\t\t\t<Label id="opportunityClsDate_Label" text="{i18n>CLOSE_DATE}*">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<ca:DatePicker id="datePickerCloseDate"></ca:DatePicker>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\t\t\t<la:form.SimpleForm id="form3" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label id="opportunityStatus_Label" text="{i18n>STATUS}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<Select id="statusdropdown" items="{json>/UserStatuses}"\r\n\t\t\t\t\t\tclass="pos_input">\r\n\t\t\t\t\t\t<items>\r\n\t\t\t\t\t\t\t<core:Item key="{json>UserStatusCode}" text="{json>UserStatusText}">\r\n\t\t\t\t\t\t\t</core:Item>\r\n\t\t\t\t\t\t</items>\r\n\t\t\t\t\t</Select>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\r\n\t\t\t<la:form.SimpleForm id="form4" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label id="opportunityStage_Label" text="{i18n>STAGE}">\r\n\t\t\t\t\t</Label>\r\n\t\t\t\t\t<Select id="stagedropdown" items="{json>/SalesStages}"\r\n\t\t\t\t\t\tclass="pos_input">\r\n\t\t\t\t\t\t<items>\r\n\t\t\t\t\t\t\t<core:Item key="{json>SalesStageCode}" text="{json>SalesStageDescription}">\r\n\t\t\t\t\t\t\t</core:Item>\r\n\t\t\t\t\t\t</items>\r\n\t\t\t\t\t</Select>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\t\t\t<la:form.SimpleForm id="form6" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label id="opportunityCos_Label" text="{i18n>CHANCE_OF_SUCCESS}(%)"></Label>\r\n\t\t\t\t\t<Input id="chanceofSuccess" value="" liveChange="chanceOfSuccessChanged"></Input>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\t\t\t<la:form.SimpleForm id="form5" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<la:content>\r\n\t\t\t\t\t<Label id="opportunityPriority_Label" text="{i18n>PRIORITY}"></Label>\r\n\t\t\t\t\t<Select id="priority_val" items="{json>/Priorities}" class="pos_input">\r\n\t\t\t\t\t\t<items>\r\n\t\t\t\t\t\t\t<core:Item key="{json>PriorityCode}" text="{json>PriorityText}">\r\n\t\t\t\t\t\t\t</core:Item>\r\n\t\t\t\t\t\t</items>\r\n\t\t\t\t\t</Select>\r\n\t\t\t\t</la:content>\r\n\t\t\t</la:form.SimpleForm>\r\n\r\n\t\t\t<la:form.SimpleForm id="form7" minWidth="1024"\r\n\t\t\t\tmaxContainerCols="2" editable="true" layout="ResponsiveGridLayout"\r\n\t\t\t\tlabelSpanL="3" labelSpanM="3" emptySpanL="4" emptySpanM="4"\r\n\t\t\t\tcolumnsL="1" columnsM="1" class="editableForm">\r\n\t\t\t\t<Label id="forecastLabel_S5" text="{i18n>FORECAST}"></Label>\r\n\t\t\t\t<Switch enabled="true" id="Switch"></Switch>\r\n\t\t\t</la:form.SimpleForm>\r\n\t<core:ExtensionPoint name="opportunityCreateContentBottomExtension"></core:ExtensionPoint>\r\n\t\t\t<Table id="productBasket" items="{json>/Products}" noDataText="{i18n>EMPTY_PROD}"\r\n\t\t\t\theaderText="{i18n>PRODUCT_BASKET}" headerDesign="Standard" class="table_resize">\r\n\t\t\t\t<headerToolbar>\r\n\t\t\t\t\t<Toolbar id="productToolbar_S5">\r\n\t\t\t\t\t\t<Label id="opportunityProductBasket_Label" text="{i18n>PRODUCT_BASKET}">\r\n\t\t\t\t\t\t</Label>\r\n\t\t\t\t\t\t<ToolbarSpacer id="productSpacer_S5">\r\n\t\t\t\t\t\t</ToolbarSpacer>\r\n\t\t\t\t\t\t<Button id="opportunityAddProd_Button" icon="sap-icon://add" text="{path : \'i18n>ADD_PROD\', formatter : \'cus.crm.opportunity.util.Formatter.formatAddMoreProductsText\'}" press="onAddProduct">\r\n\t\t\t\t\t\t</Button>\r\n\t\t\t\t\t</Toolbar>\r\n\t\t\t\t</headerToolbar>\r\n\t\t\t\t<columns>\r\n\t\t\t\t<core:ExtensionPoint name="opportunityProductTabColoumExtension"></core:ExtensionPoint>\r\n\t\t\t\t\t<Column id="basketColumn1_S5" vAlign="Middle" width="35%">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Label id="opportunityProdBasketProd_Label" text="{i18n>PRODUCT}" design="Bold"></Label>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\r\n\t\t\t\t\t<Column id="basketColumn2_S5" vAlign="Middle" width="20%" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Label  id="opportunityProdBasketQuant_Label" text="{i18n>QUANTITY}" design="Bold"></Label>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<Column id="basketColumn3_S5" vAlign="Middle" width="15%" minScreenWidth="Tablet"\r\n\t\t\t\t\t\tdemandPopin="true" hAlign="Right">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Label id="unitPriceLabel_S5" text="{i18n>UNIT_PRICE}" design="Bold"></Label>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\r\n\t\t\t\t\t<Column id="basketColumn4_S5" vAlign="Middle" width="20%" hAlign="Right"\r\n\t\t\t\t\t\tminScreenWidth="Tablet" demandPopin="true">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t\t<Label id="vol_S5" text="{i18n>VOLUME}" design="Bold"></Label>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\r\n\t\t\t\t\t<Column  id="basketColumn5_S5" vAlign="Middle" width="10%" minScreenWidth="Tablet" \r\n\t\t\t\t\thAlign="Right" demandPopin="true">\r\n\t\t\t\t\t\t<header>\r\n\t\t\t\t\t\t</header>\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabColoumendExtension"></core:ExtensionPoint>\r\n\t\t\t\t</columns>\r\n\t\t\t\t<items>\r\n\t\t\t\t\t<ColumnListItem id="basketTemplate_S5">\r\n\t\t\t\t\t\t<cells>\r\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabCellsExtension"></core:ExtensionPoint>\r\n\t\t\t\t\t\t\t<la:VerticalLayout id="productBasketVLayout_S5" hAlign="Left">\r\n\t\t\t\t\t\t\t\t<la:content>\r\n\t\t\t\t\t\t\t\t\t<Label id="prodname" design="Bold"\r\n\t\t\t\t\t\t\t\t\t\ttext="{path : \'json>ProductGuid\', formatter : \'cus.crm.opportunity.util.Formatter.formatProductName\'}"></Label>\r\n\t\t\t\t\t\t\t\t\t<Label id="productClassificationValue_S5"\r\n\t\t\t\t\t\t\t\t\t\ttext="{path: \'json>ProductGuid\',formatter : \'cus.crm.opportunity.util.Formatter.formatProdClassification\'}"></Label>\r\n\t\t\t\t\t\t\t\t</la:content>\r\n\t\t\t\t\t\t\t</la:VerticalLayout>\r\n\t\t\t\t\t\t\t<la:HorizontalLayout id="basketHLayout_S5" width="150px" custom:field="QUANTITY">\r\n\t\t\t\t\t\t\t\t<la:content>\r\n\t\t\t\t\t\t\t\t\t<Input  width="75px" id="qty" value="{json>Quantity}"\r\n\t\t\t\t\t\t\t\t\t\tliveChange="quantityChanged" class="numberRTL"></Input>\r\n\r\n\t\t\t\t\t\t\t\t\t<Text id="unit1" text="{json>Unit}" class="UnitPadding"></Text>\r\n\t\t\t\t\t\t\t\t</la:content>\r\n\t\t\t\t\t\t\t</la:HorizontalLayout>\r\n\t\t\t\t\t\t\t<ObjectNumber custom:field="NETVALUE" id="netValue_S5" number="{json>NetValue}" numberUnit="{json>CurrencyCode}" />\r\n\t\t\t\t\t\t\t<Input width="75px" id="expectedNetValue_S5" \r\n\t\t\t\t\t\t\t\t\t\tvalue="{json>TotalExpectedNetValue}"\r\n\t\t\t\t\t\t\t\t\t\teditable="true" liveChange="volumeChanged" class="numberRTL">\r\n\t\t\t\t\t\t\t\t\t\t</Input>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<Button id="cancel" icon="sap-icon://sys-cancel-2" type="Transparent"\r\n\t\t\t\t\t\t\t\tpress="deleteProduct"></Button>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t<core:ExtensionPoint name="opportunityProductTabCellsEndExtension"></core:ExtensionPoint>\r\n\t\t\t\t\t\t</cells>\r\n\t\t\t\t\t</ColumnListItem>\r\n\t\t\t\t</items>\r\n\t\t\t</Table>\r\n\t\t\t\r\n\t\t</content>\r\n\t</Page>\r\n</core:View>\r\n',
	"cus/crm/opportunity/view/showMaxHit.fragment.xml":'<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<Dialog xmlns="sap.m" xmlns:core="sap.ui.core" title="{i18n>SHOW_SETTING}" contentWidth="400px" contentHeight="180px" class="showdialog">\n\n    <content>\n        <Label text="{i18n>SHOW_INS}"></Label>\n        <Input id="showInput" value="{showJson>/RetrieveMaxHit/MaxHitNumber}" ></Input>\n        <Label text="{i18n>SHOW_INS_NOTES}" class="showLabel"></Label>\n    </content>\n    <beginButton>\n        <Button text="{i18n>OK}" press="saveMaxHit">\n        </Button>\n    </beginButton>\n    <endButton>\n        <Button text="{i18n>CANCEL} " press="closeShow">\n        </Button>\n    </endButton>\n\n</Dialog>\n'
}});
