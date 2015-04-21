/*
 * Copyright (C) 2009-2014 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.ca.ui.quickoverview.CompanyLaunch");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.ui.model.type.FileSize");
jQuery.sap.require("cus.crm.opportunity.util.Formatter");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");
sap.ca.scfld.md.controller.BaseDetailController.extend("cus.crm.opportunity.CRM_OPPRTNTYExtension.view.S3Custom", {
	SalesStages: [],
	Priorities: [],
	UserStatuses: [],
	Currencies: [],
	ContactCollection: [],
	EmployeeCollection: [],
	prospect_number: "",
	response: [],
	opportunity_number: "",
	bAppLaunched: true,
	guid: undefined,
	partnerFunctionMap: {},
	partnerDeterminationMap: {},
	accountListItemTemplate: new sap.m.ObjectListItem({
		title: '{json>name1}'
	}).addAttribute(new sap.m.ObjectAttribute({
		text: '{json>accountID}'
	})).addCustomData(new sap.ui.core.CustomData({
		key: 'ID',
		value: '{json>accountID}'
	})),
	contactListItemTemplate: new sap.m.ObjectListItem({
		title: '{json>fullName}'
	}).addAttribute(new sap.m.ObjectAttribute({
		text: '{json>contactID}'
	})).addCustomData(new sap.ui.core.CustomData({
		key: 'ID',
		value: '{json>contactID}'
	})),
	employeeListItemTemplate: new sap.m.ObjectListItem({
		title: '{json>fullName}'
	}).addAttribute(new sap.m.ObjectAttribute({
		text: '{json>employeeID}'
	})).addCustomData(new sap.ui.core.CustomData({
		key: 'ID',
		value: '{json>employeeID}'
	})),
	onInit: function() {
		sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);
		this.oModel = this.getView().getModel();
		this.oI18nModel = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel;
		this.oResourceBundle = this.oI18nModel.getResourceBundle();
		jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("cus.crm.opportunity.css.Opportunity", ".css"), "sap-ui-theme-sap.crm");
		this.contactF4Fragment = new sap.ui.xmlfragment(this.createId("contact_F4_S3"), 'cus.crm.opportunity.view.ContactF4', this);
		this.employeeF4Fragment = new sap.ui.xmlfragment(this.createId("employee_F4_S3"), 'cus.crm.opportunity.view.EmployeeF4', this);
		this.changeLogFragment = new sap.ui.xmlfragment(this.createId("change_Log_S3"), 'cus.crm.opportunity.view.ChangeLog', this);
		this.changeLogFragment.setModel(new sap.ui.model.json.JSONModel());
		this.changeLogFragment.setModel(this.oI18nModel, 'i18n');
		this.byId('salesTeam').setModel(new sap.ui.model.json.JSONModel(), "json");
		this.byId('info').setModel(new sap.ui.model.json.JSONModel(), "json");
		this.byId('Product_Tab').setModel(new sap.ui.model.json.JSONModel(), "json");
		this.byId('S3_Header').setModel(new sap.ui.model.json.JSONModel(), "json");
		this.byId('Sales_Team').addCustomData(new sap.ui.core.CustomData({
			key: 'controller',
			value: this
		}));
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "json");
		this.oRouter.attachRouteMatched(this.detailRouteMatched, this);
		var t = this;
		this.oHeaderFooterOptions = {};
		this.oHeaderFooterOptions3UI = {
			oEditBtn: {
				sI18nBtnTxt: "EDIT",
				onBtnPressed: function(e) {
					t.onEdit()
				},
				bEnabled: true,
			},
			buttonList: [],
			oJamOptions: {
				oShareSettings: {
					object: {
						id: "",
						share: ""
					}
				},
				fGetShareSettings: function() {
					var d = t.byId('info').getModel('json').getData().Description;
					var u = document.URL;
					return {
						object: {
							id: u,
							share: "Opportunity:" + d,
							display: t._getShareDisplay(),
						}
					}
				},
				oDiscussSettings: {
					object: {
						id: "",
						share: ""
					}
				},
				fGetDiscussSettings: function() {
					var o = t.byId('info').getModel('json').getData().Id;
					var u = document.URL;
					return {
						oDataServiceUrl: "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
						feedType: "object",
						object: {
							id: t._getDiscussID(),
							type: t._getDiscussType(),
							name: "OpportunityID:" + o,
							ui_url: u
						},
					}
				},
			},
		};
		this.oHeaderFooterOptions4UI = {
			oEditBtn: {
				sI18nBtnTxt: "EDIT",
				onBtnPressed: function(e) {
					t.onEdit()
				},
				bEnabled: true,
			},
			buttonList: [{
				sI18nBtnTxt: "FOLLOW_UP",
				visible: false,
				onBtnPressed: function(e) {
					t.handleOpen(e)
				},
			}, ],
			oJamOptions: {
				oShareSettings: {
					object: {
						id: "",
						share: ""
					}
				},
				fGetShareSettings: function() {
					var d = t.byId('info').getModel('json').getData().Description;
					var u = document.URL;
					return {
						object: {
							id: u,
							share: "Opportunity:" + d,
							display: t._getShareDisplay(),
						}
					}
				},
				oDiscussSettings: {
					object: {
						id: "",
						share: ""
					}
				},
				fGetDiscussSettings: function() {
					var o = t.byId('info').getModel('json').getData().Id;
					var u = document.URL;
					return {
						oDataServiceUrl: "/sap/opu/odata/sap/SM_INTEGRATION_SRV/",
						feedType: "object",
						object: {
							id: t._getDiscussID(),
							type: t._getDiscussType(),
							name: "OpportunityID:" + o,
							ui_url: u
						},
					}
				},
			},
		};
		this.sBackendVersion = this.oModel.getServiceMetadata().dataServices.dataServiceVersion;
		this.oVersioningModel = new sap.ui.model.json.JSONModel({});
		this._loadVersionSpecificUI(this.sBackendVersion)
	},
	onBeforeRendering: function() {
		this.getView().getModel("controllers").getData().s3Controller = this
	},
	onAfterRendering:function(){
	    alert('Salut');
	},
	_loadVersionSpecificUI: function(b) {
		switch (b) {
			case "2.0":
				this._loadWave4UI();
				this.oHeaderFooterOptions = this.oHeaderFooterOptions4UI;
				break;
			default:
				this._loadWave3UI();
				this.oHeaderFooterOptions = this.oHeaderFooterOptions3UI;
				break
		}
	},
	_loadWave3UI: function() {
		this.oVersioningModel.getData().sParticipantsNoDataTextKey = 'NO_CONTACTS';
		this.oVersioningModel.getData().setHeaderTextForParticipants = jQuery.proxy(function(r) {}, this);
		this.byId('salesTeam').insertContent(new sap.m.Button({
			text: "{i18n>ADDCONTACT}",
			icon: "sap-icon://add",
			press: jQuery.proxy(this.addContact, this),
			type: "Transparent",
		}), 0)
	},
	_loadWave4UI: function() {
		this.oVersioningModel.getData().sParticipantsNoDataTextKey = 'NO_PARTICIPANTS1';
		this.oVersioningModel.getData().setHeaderTextForParticipants = jQuery.proxy(function(r) {
			this.byId('Sales_Team').getHeaderToolbar().getContent()[0].setText(this.oResourceBundle.getText('PARTICIPANTS', [r.data.SalesTeam.results
				.length]))
		}, this);
		this.byId('opportunityHeader').addAggregation("attributes", new sap.m.ObjectAttribute({
			text: "{json>/EmployeeResponsibleName}",
			active: true,
			press: jQuery.proxy(this.onEmpBusCardLaunch, this),
			customData: [new sap.ui.core.CustomData({
				key: "PartnerNumber",
				value: "{json>/EmployeeResponsibleNumber}"
			}), new sap.ui.core.CustomData({
				key: "PartnerFunctionCode",
				value: "00000014"
			}), new sap.ui.core.CustomData({
				key: "Image",
				value: "{json>/ContactImgSrc}"
			}), new sap.ui.core.CustomData({
				key: "Imager",
				value: "{json>/ImgSrc}"
			}), ]
		}));
		this.byId('Sales_Team').setHeaderToolbar(new sap.m.Toolbar({
			content: [new sap.m.Label(), new sap.m.ToolbarSpacer(), new sap.m.Button({
				text: "",
				icon: "sap-icon://add",
				type: "Transparent",
				press: jQuery.proxy(this.showParticipantsF4, this)
			})]
		}))
	},
	handleOpen: function(e) {
		var t = this;
		this._actionSheet = new sap.m.ActionSheet({
			title: "Choose Your Action",
			showCancelButton: true,
			placement: sap.m.PlacementType.Top,
			buttons: [new sap.m.Button({
				text: this.getView().getModel("i18n").getProperty("CREATE_APPOINTMENT"),
				press: function(a) {
					t.navToAppointmentDialog(a)
				},
			}), new sap.m.Button({
				text: this.getView().getModel("i18n").getProperty("CREATE_TASK"),
				press: function(a) {
					t.navToTaskDialog(a)
				},
			}), ]
		});
		this._actionSheet.openBy(e.getSource())
	},
	navToAppointmentDialog: function(e) {
		var m = this.getView().getModel();
		var g = this.byId('info').getModel('json').getData().Guid;
		var t = this.byId('info').getModel('json').getData().ProcessType;
		var d;
		m.read("AppFollowupTransTypes?Guid='" + g + "'&TransactionType='" + t + "'", null, null, false, function(D, r) {
			d = {
				ProcessTypes: r.data.results
			}
		});
		this.appointmentFlag = true;
		if (d.ProcessTypes.length == 1) {
			this.onlyOneAppointmentProcessType = true;
			this.processType = d.ProcessTypes[0].ProcessTypeCode;
			this.selectProcess()
		} else {
			this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.ProcessTypeDialog", this);
			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
			var j = new sap.ui.model.json.JSONModel();
			j.setData(d);
			this.oActionSheet.setModel(j, "json");
			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
			this.oActionSheet._list.setGrowingScrollToLoad(true);
			this.oActionSheet._dialog.setVerticalScrolling(true);
			this.oActionSheet.open()
		}
	},
	searchProcess: function(e) {
		var v = e.getParameter("value");
		if (v !== undefined) {
			e.getParameter("itemsBinding").filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v)])
		}
	},
	navToTaskDialog: function(e) {
		var m = this.getView().getModel();
		var g = this.byId('info').getModel('json').getData().Guid;
		var t = this.byId('info').getModel('json').getData().ProcessType;
		var d;
		m.read("TaskFollowupTransTypes?Guid='" + g + "'&TransactionType='" + t + "'", null, null, false, function(D, r) {
			d = {
				ProcessTypes: r.data.results
			}
		});
		this.taskFlag = true;
		if (d.ProcessTypes.length == 1) {
			this.onlyOneTaskProcessType = true;
			this.processType = d.ProcessTypes[0].ProcessTypeCode;
			this.selectProcess()
		} else {
			this.oActionSheet = sap.ui.xmlfragment("cus.crm.opportunity.view.ProcessTypeDialog", this);
			var j = new sap.ui.model.json.JSONModel();
			j.setData(d);
			this.oActionSheet.setModel(j, "json");
			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("SEARCH"));
			this.oActionSheet._list.setGrowingScrollToLoad(true);
			this.oActionSheet._dialog.setVerticalScrolling(true);
			this.oActionSheet.open()
		}
	},
	selectProcess: function(e) {
		var h = this.byId('info').getModel('json').getData().Guid;
		var p = "/Opportunities(guid'" + h + "')";
		var o = this.byId('info').getModel('json').getData().Id;
		var s = this.byId('info').getModel('json').getData().UserStatusText;
		var S = this.byId('info').getModel('json').getData().StartDate;
		var C = this.byId('info').getModel('json').getData().StartDate;
		var A = this.byId('opportunityHeader').getModel('json').getData().ProspectName;
		var a = this.byId('opportunityHeader').getModel('json').getData().MainContactName;
		var t = this.byId('opportunityHeader').getModel('json').getData().Description;
		if (!(this.onlyOneAppointmentProcessType || this.onlyOneTaskProcessType)) {
			var b = e.getParameter("selectedItem");
			if (b) {
				this.processType = b.data("ProcessTypeCode")
			}
		}
		var f = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
		this.oCrossAppNavigator = f && f("CrossApplicationNavigation");
		if (this.appointmentFlag) {
			var c = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "Appointment",
					action: "myAppointments"
				},
				params: {
					"createFromOppt": "X",
					"AccountName": A,
					"ContactName": a,
					"processType": this.processType,
					"selectprocess_oEvent": e,
					"opportunityId": o,
					"StartDate": S,
					"title": t,
				}
			}) || "";
			this.appointmentFlag = false;
			this.onlyOneAppointmentProcessType = false;
			window.location = c
		} else if (this.taskFlag) {
			var c = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "Task",
					action: "manageTasks"
				},
				params: {
					"createFromOppt": "X",
					"AccountName": A,
					"ContactName": a,
					"processType": this.processType,
					"selectprocess_oEvent": e,
					"opportunityId": o,
					"StartDate": S,
					"title": t,
				}
			}) || "";
			this.taskFlag = false;
			this.onlyOneTaskProcessType = false;
			window.location = c
		}
	},
	getS4Controller: function() {
		return this.getView().getModel('controllers').getData().s4Controller
	},
	setDefaultTabToInfo: function() {
		var t = this.byId('icntab');
		if (t && t.getItems().length > 0) {
			if (t.getSelectedKey() !== "info") t.setSelectedKey("Info");
			t.setExpanded(true)
		}
	},
	isMainScreen: function() {
		return true
	},
	_getDiscussID: function() {
		var u = document.createElement('a');
		u.href = this.getView().getModel().sServiceUrl;
		var h = this.byId('info').getModel('json').getData().Guid;
		var p = "/Opportunities(guid'" + h + "')";
		return u.pathname + p
	},
	_getDiscussType: function() {
		var u = document.createElement('a');
		u.href = this.getView().getModel().sServiceUrl;
		return u.pathname + "/$metadata#Opportunities"
	},
	_getShareDisplay: function() {
		var d = this.byId('info').getModel('json').getData().Description;
		var v = this.byId('info').getModel('json').getData().ExpectedSalesVolume;
		var c = this.byId('info').getModel('json').getData().CurrencyCode;
		var p = this.byId('info').getModel('json').getData().ProspectName;
		var a = cus.crm.opportunity.util.Formatter.dateFormatter(this.byId('info').getModel('json').getData().ClosingDate);
		var u = this.byId('info').getModel('json').getData().UserStatusText;
		var o = new sap.m.ObjectListItem({
			title: d,
			number: v,
			numberUnit: c,
			attributes: [new sap.m.ObjectAttribute({
				text: p
			}), new sap.m.ObjectAttribute({
				text: a
			})],
			firstStatus: new sap.m.ObjectStatus({
				text: u
			}),
		});
		return o
	},
	getHeaderFooterOptions: function() {
		return this.oHeaderFooterOptions
	},
	navToSubview: function() {
		this.oRouter.navTo("subDetail", {
			contextPath: this.getView().getBindingContext().sPath.substr(1)
		}, !jQuery.device.is.phone)
	},
	navToEmpty: function() {
		this.oRouter.navTo("noData", {
			viewTitle: "DETAIL_TITLE",
			languageKey: "NO_ITEMS_AVAILABLE"
		})
	},
	selectedTab: function(c) {
		var m = this.getView().getModel();
		var t = c.getSource().oSelectedItem.getProperty("key");
		if (this.byId('info').getModel('json')) var h = this.byId('info').getModel('json').getData().Guid;
		var p = "/Opportunities(guid'" + h + "')";
		if (t == "Notes") {;
			var a = this;
			m.read(p, null, ["$expand=Notes"], true, function(o, r) {
				var e = a.getView().byId("notesList");
				var j = new sap.ui.model.json.JSONModel();
				var d = {
					OpportunityNotesSet: r.data.Notes.results
				};
				j.setData(d);
				e.setModel(j, "json")
			})
		}
		if (t == "Parties Involved") {
			var d;
			var l = [];
			var a = this;
			this.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
			this.transactionType = this.oModel.getContext("/" + this.sPath).getObject().ProcessType;
			if (parseFloat(this.sBackendVersion) >= 2.0) {
				this.partnerFunctionMap = {};
				if (!this.partnerDeterminationMap[this.transactionType]) {
					this.oModel.read("OpptPartnerFctTypes", null, ["TransactionType='" + this.transactionType + "'"], false, jQuery.proxy(function(o, r) {
						this.partnerDeterminationMap[this.transactionType] = r.data.results
					}, this), jQuery.proxy(function(e) {}, this))
				}
			}
			m.read(p, null, ["$expand=SalesTeam"], true, function(o, r) {
				var e = a.getView().byId("Sales_Team");
				var g = new sap.ui.model.json.JSONModel();
				a.oVersioningModel.getData().setHeaderTextForParticipants(r);
				d = {
					OpportunitySalesTeamSet: r.data.SalesTeam.results
				};
				if (d.OpportunitySalesTeamSet.length == 0) {
					a.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOPARTIES'))
				}
				var B = [];
				for (var i = 0; i < d.OpportunitySalesTeamSet.length; i++) {
					var k = d.OpportunitySalesTeamSet[i].PartnerNumber;
					var p = "/AccountCollection('" + k + "')?$expand=Logo";
					l[i] = "sap-icon://person-placeholder";
					B.push(m.createBatchOperation(p, "GET"))
				};
				m.addBatchReadOperations(B);
				m.submitBatch(jQuery.proxy(function(R) {
					for (var j = 0; j < d.OpportunitySalesTeamSet.length; j++) {
						if (!R.__batchResponses[j].hasOwnProperty("data")) {
							l[j] = "sap-icon://person-placeholder"
						} else {
							if (R.__batchResponses[j].data) {
								if (R.__batchResponses[j].data.Logo && R.__batchResponses[j].data.Logo.__metadata.media_src) {
									var q = R.__batchResponses[j].data.Logo.__metadata.media_src ? R.__batchResponses[j].data.Logo.__metadata.media_src :
										"sap-icon://person-placeholder";
									var U = q;
									l[j] = U.toString()
								}
							}
						}
						d.OpportunitySalesTeamSet[j].ImgSrc = l[j]
					}
					g.setData(d);
					e.setModel(g, "json")
				}, this), jQuery.proxy(function(E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ERROR'))
				}, this), true)
			})
		}
		if (t == "Competitors") {
			var d;
			var l = [];
			var a = this;
			this.byId("competitors").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
			m.read(p, null, ["$expand=Competitors"], true, function(o, r) {
				var e = a.getView().byId("competitors");
				var j = new sap.ui.model.json.JSONModel();
				d = {
					OpportunityCompetitors: r.data.Competitors.results
				};
				if (d.OpportunityCompetitors.length == 0) {
					a.byId("competitors").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOCOMPETITORS'))
				}
				for (var i = 0; i < d.OpportunityCompetitors.length; i++) {
					var g = d.OpportunityCompetitors[i].PartnerNumber;
					var p = "/AccountCollection('" + g + "')";
					l[i] = "sap-icon://person-placeholder";
					m.read(p, null, ["$expand=Logo"], false, function(o, r) {
						jQuery.sap.log.info("oData account response");
						if (o.Logo && o.Logo.__metadata) {
							var k = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
							var U = k;
							l[i] = U.toString()
						}
					});
					d.OpportunityCompetitors[i].ImgSrc = l[i]
				};
				j.setData(d);
				e.setModel(j, "json")
			})
		}
		if (t == "Attachments") {
			var b = this.getView().byId('info');
			var a = this.getView();
			var f = a.byId("fileupload");
			if (f.getEditMode() === true) f.setEditMode(false);
			m.refreshSecurityToken();
			var M = m.getHeaders();
			f.setXsrfToken(M['x-csrf-token']);
			var n = h.replace(/-/g, '');
			f.setCustomHeader("slug", n);
			m.read(p, null, ["$expand=Attachments"], true, function(e, r) {
				var g = {
					OpportunityAttachments: []
				};
				var j = r.data.Attachments.results.length;
				for (var i = 0; i < j; i++) {
					var v = r.data.Attachments.results[i];
					var U = v.__metadata.media_src;
					var o = {
						name: v.Name,
						size: v.fileSize,
						url: U,
						uploadedDate: cus.crm.opportunity.util.Formatter.dateFormatter(v.CreatedAt),
						contributor: v.CreatedBy,
						fileExtension: cus.crm.opportunity.util.Formatter.mimeTypeFormatter(v.MimeType),
						fileId: v.DocumentId,
					};
					g.OpportunityAttachments.push(o)
				}
				a.byId('fileupload').setModel(new sap.ui.model.json.JSONModel(g))
			})
		}
	},
	_handleAddNote: function(e) {
		var t = this;
		var T = e.getParameter("value");
		if (T) {
			var m = this.getView().getModel();
			var h = this.byId('info').getModel('json').getData().Guid;
			var E = {
				HeaderGuid: h,
				Content: T,
			};
			m.refreshSecurityToken();
			m.create('/OpportunityNotesSet', E, null, function() {
				sap.ca.ui.message.showMessageToast(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOTE_SUCCESS'))
			}, function(M) {
				t.displayResponseErrorMessage(M, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_FAILED'))
			});
			var t = this;
			var p = "/Opportunities(guid'" + h + "')";
			m.read(p, null, ["$expand=Notes"], true, function(o, r) {
				var a = t.getView().byId("notesList");
				var j = new sap.ui.model.json.JSONModel();
				var d = {
					OpportunityNotesSet: r.data.Notes.results
				};
				j.setData(d);
				a.setModel(j, "json")
			})
		}
	},
	displayResponseErrorMessage: function(m, d) {
		var M;
		if (m.response) {
			M = jQuery.parseJSON(m.response.body).error.message.value
		}
		sap.m.MessageBox.alert(M || d)
	},
	onFileUploadFailed: function(e) {
		var r = e.mParameters.response.jqXHR.responseText;
		var j = JSON.parse(r);
		sap.ca.ui.message.showMessageBox({
			type: sap.ca.ui.message.Type.ERROR,
			message: j.error.message.value
		})
	},
	onUploadFile: function(r) {
		var f = r.getParameter("d");
		var U = f.__metadata.media_src;
		var d = parseInt((f.CreatedAt).substr(6));
		var n = decodeURIComponent(f.Name);
		var o = {
			"fileExtension": cus.crm.opportunity.util.Formatter.mimeTypeFormatter(f.MimeType),
			"contributor": f.CreatedBy,
			"uploadedDate": cus.crm.opportunity.util.Formatter.dateFormatter(new Date(d)),
			"name": n,
			"url": U,
			"size": f.fileSize,
			"fileId": f.DocumentId,
		};
		this.byId('fileupload').commitFileUpload(o)
	},
	changeToString: function(v) {
		var s = v.split("%");
		var c = s[0];
		for (var i = 1; i < s.length; i++) {
			c += String.fromCharCode(parseInt(s[i].substring(0, 2), 16)) + s[i].substring(2)
		}
		return c
	},
	onEdit: function() {
		var c = this.byId('info').getModel('json').getData().Guid;
		this.oRouter.navTo("subDetail", {
			contextPath: c
		}, !jQuery.device.is.phone)
	},
	onLogChange: function(e) {
		var m = this.getView().getModel();
		var d;
		var h = this.byId('info').getModel('json').getData().Guid;
		var p = "/Opportunities(guid'" + h + "')";
		this.changeLogFragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOG_CHANGE'));
		this.changeLogFragment.setModel(e.getSource().getModel("i18n"), "i18n");
		this.changeLogFragment.getModel().setData({
			OpportunitySalesTeamSet: []
		});
		var t = this;
		m.read(p, null, ["$expand=ChangeDocs"], true, function(o, r) {
			d = {
				OpportunityChangeDocs: r.data.ChangeDocs.results
			};
			t.changeLogFragment.getModel().setData(d);
			if (d.OpportunityChangeDocs.length == 0) {
				t.changeLogFragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOLOGCHANGE'))
			}
		});
		this.changeLogFragment.open(e)
	},
	onCancelLogChange: function(e) {
		this.changeLogFragment.close()
	},
	onEmpBusCardLaunch: function(e) {
		if (e.oSource.data("PartnerNumber") !== '') {
			var p = "/EmployeeCollection('" + e.oSource.data("PartnerNumber") + "')";
			var u = "$expand=WorkAddress,Company,Photo";
			var s = e.getSource();
			var t = this;
			this.oModel.read(p, null, [u], true, function(o, r) {
				jQuery.sap.log.info("oData employee response");
				var T = t.oResourceBundle.getText("EMPLOYEE");
				var E = "";
				var a = "";
				var b = "";
				var c = "";
				var C = "";
				var d = "";
				var f = "";
				var P = "";
				if (o.WorkAddress) {
					E = o.WorkAddress.mobilePhone;
					a = o.WorkAddress.phone;
					b = o.WorkAddress.email;
					c = o.WorkAddress.department;
					C = o.WorkAddress.address
				}
				if (o.Company && o.Company.name1) {
					d = o.Company.name1
				}
				if (o.fullName && o.fullName !== "") {
					f = o.fullName
				}
				if (o.Photo && o.Photo.__metadata) {
					var m = cus.crm.opportunity.util.Formatter.formatPhotoUrl(o.Photo.__metadata.media_src);
					P = cus.crm.opportunity.util.Formatter.urlConverter(m)
				}
				var g = {
					title: T,
					name: f,
					imgurl: P,
					department: c,
					contactmobile: E,
					contactphone: a,
					contactemail: b,
					contactemailsubj: "",
					companyname: d,
					companyaddress: C
				};
				var h = new sap.ca.ui.quickoverview.EmployeeLaunch(g);
				h.openBy(s)
			}, function(E) {
				jQuery.sap.log.error("oData request for employee failed")
			})
		}
	},
	onEmployeeLaunchheader: function(e) {
		var c = e.oSource.data("PartnerNumber");
		var p = "/AccountCollection('" + c + "')";
		var l = "sap-icon://person-placeholder";
		var m = this.getView().getModel();
		m.read(p, null, ["$expand=Logo"], false, function(o, r) {
			jQuery.sap.log.info("oData account response");
			if (o.Logo && o.Logo.__metadata) {
				var d = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
				l = d.toString()
			}
		});
		var M = this.getView().getModel();
		var a = this.byId('info').getModel('json').getData().ProspectNumber;
		var b = e.getSource();
		var P = e.oSource.data("PartnerFunctionCode");
		var I = l;
		if (a && c) {
			this.AccountId = a;
			this.ContactId = c;
			var p = "/ContactCollection(accountID='" + a + "',contactID='" + c +
				"')?$expand=WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress";
			var B = [];
			B.push(M.createBatchOperation(p, "GET"));
			M.addBatchReadOperations(B);
			M.submitBatch(jQuery.proxy(function(r) {
				var d = {
					Value: ""
				};
				d.Value = r.__batchResponses[0].data;
				var C = jQuery.proxy(function(e) {
					var n = {};
					n.target = {};
					n.target.semanticObject = "ContactPerson";
					n.target.action = "MyContacts";
					n.params = {
						accountID: this.AccountId,
						contactID: this.ContactId,
					};
					this.navToOtherApp = false;
					return n
				}, this);
				if (d.Value.Account) {
					if (d.Value.Account.MainContact) {
						if (d.Value.Account.MainContact.WorkAddress) {
							if (d.Value.WorkAddress) {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: I,
											companyphone: d.Value.Account.MainAddress.phone,
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
											maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
											maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
											maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
											maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(e.getSource())
								}
							} else {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											companyphone: d.Value.Account.MainAddress.phone,
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
											maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
											maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
											maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
											maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								}
							}
						} else {
							if (d.Value.WorkAddress) {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											companyphone: d.Value.Account.MainAddress.phone,
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								}
							} else {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											companyphone: d.Value.Account.MainAddress.phone,
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											maincontactname: d.Value.Account.MainContact.fullName,
											maincontactemailsubj: "Automatic Mail for Maincontact",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								}
							}
						}
					} else {
						if (d.Value.WorkAddress) {
							if (d.Value.Account.MainAddress) {
								var E = {
									title: "Contact",
									name: d.Value.fullName,
									imgurl: I,
									department: d.Value.department,
									contactmobile: d.Value.WorkAddress.mobilePhone,
									contactphone: d.Value.WorkAddress.phone,
									contactemail: d.Value.WorkAddress.email,
									contactemailsubj: "App Genrated Mail",
									companyname: d.Value.Account.name1,
									companyaddress: d.Value.Account.MainAddress.address,
									beforeExtNav: C,
									companycard: {
										title: "Account",
										imgurl: "sap-icon://person-placeholder",
										companyphone: d.Value.Account.MainAddress.phone,
									}
								};
								var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
								o.openBy(b)
							} else {
								var E = {
									title: "Contact",
									name: d.Value.fullName,
									imgurl: I,
									department: d.Value.department,
									contactmobile: d.Value.WorkAddress.mobilePhone,
									contactphone: d.Value.WorkAddress.phone,
									contactemail: d.Value.WorkAddress.email,
									contactemailsubj: "App Genrated Mail",
									companyname: d.Value.Account.name1,
									beforeExtNav: C,
									companycard: {
										title: "Account",
										imgurl: "sap-icon://person-placeholder",
									}
								};
								var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
								o.openBy(b)
							}
						} else {
							if (d.Value.Account.MainAddress) {
								var E = {
									title: "Contact",
									name: d.Value.fullName,
									imgurl: I,
									department: d.Value.department,
									contactemailsubj: "App Genrated Mail",
									companyname: d.Value.Account.name1,
									companyaddress: d.Value.Account.MainAddress.address,
									beforeExtNav: C,
									companycard: {
										title: "Account",
										imgurl: "sap-icon://person-placeholder",
										companyphone: d.Value.Account.MainAddress.phone,
									}
								};
								var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
								o.openBy(b)
							} else {
								var E = {
									title: "Contact",
									name: d.Value.fullName,
									imgurl: I,
									department: d.Value.department,
									contactemailsubj: "App Genrated Mail",
									companyname: d.Value.Account.name1,
									beforeExtNav: C,
									companycard: {
										title: "Account",
										imgurl: "sap-icon://person-placeholder",
									}
								};
								var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
								o.openBy(b)
							}
						}
					}
				} else {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
				}
			}, this), jQuery.proxy(function(E) {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
			}, this), true)
		} else {
			sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
		}
	},
	onEmployeeLaunch: function(e) {
		var m = this.getView().getModel();
		var a = this.byId('info').getModel('json').getData().ProspectNumber;
		var b = e.getSource();
		var c = e.oSource.data("PartnerNumber");
		var P = e.oSource.data("PartnerFunctionCode");
		var I = e.oSource.data("Image");
		if (P == "00000015") {
			var d;
			if (a && c) {
				this.AccountId = a;
				this.ContactId = c;
				var p = "/ContactCollection(accountID='" + a + "',contactID='" + c +
					"')?$expand=WorkAddress,Account,Account/MainAddress,Account/MainContact,Account/MainContact/WorkAddress";
				var B = [];
				B.push(m.createBatchOperation(p, "GET"));
				m.addBatchReadOperations(B);
				m.submitBatch(jQuery.proxy(function(r) {
					var d = {
						Value: ""
					};
					d.Value = r.__batchResponses[0].data;
					var C = jQuery.proxy(function(e) {
						var n = {};
						n.target = {};
						n.target.semanticObject = "ContactPerson";
						n.target.action = "MyContacts";
						n.params = {
							accountID: this.AccountId,
							contactID: this.ContactId,
						};
						this.navToOtherApp = true;
						this.oRouter.detachRouteMatched(this.detailRouteMatched, this);
						return n
					}, this);
					if (d.Value.Account) {
						if (d.Value.Account.MainContact) {
							if (d.Value.Account.MainContact.WorkAddress) {
								if (d.Value.WorkAddress) {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: I,
												companyphone: d.Value.Account.MainAddress.phone,
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
												maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
												maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
												maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
												maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(e.getSource())
									}
								} else {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												companyphone: d.Value.Account.MainAddress.phone,
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
												maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
												maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactmobile: d.Value.Account.MainContact.WorkAddress.mobilePhone,
												maincontactphone: d.Value.Account.MainContact.WorkAddress.phone,
												maincontactemail: d.Value.Account.MainContact.WorkAddress.email,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									}
								}
							} else {
								if (d.Value.WorkAddress) {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												companyphone: d.Value.Account.MainAddress.phone,
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactmobile: d.Value.WorkAddress.mobilePhone,
											contactphone: d.Value.WorkAddress.phone,
											contactemail: d.Value.WorkAddress.email,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									}
								} else {
									if (d.Value.Account.MainAddress) {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											companyaddress: d.Value.Account.MainAddress.address,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												companyphone: d.Value.Account.MainAddress.phone,
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									} else {
										var E = {
											title: "Contact",
											name: d.Value.fullName,
											imgurl: I,
											department: d.Value.department,
											contactemailsubj: "App Genrated Mail",
											companyname: d.Value.Account.name1,
											beforeExtNav: C,
											companycard: {
												title: "Account",
												imgurl: "sap-icon://person-placeholder",
												maincontactname: d.Value.Account.MainContact.fullName,
												maincontactemailsubj: "Automatic Mail for Maincontact",
											}
										};
										var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
										o.openBy(b)
									}
								}
							}
						} else {
							if (d.Value.WorkAddress) {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											companyphone: d.Value.Account.MainAddress.phone,
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactmobile: d.Value.WorkAddress.mobilePhone,
										contactphone: d.Value.WorkAddress.phone,
										contactemail: d.Value.WorkAddress.email,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								}
							} else {
								if (d.Value.Account.MainAddress) {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										companyaddress: d.Value.Account.MainAddress.address,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
											companyphone: d.Value.Account.MainAddress.phone,
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								} else {
									var E = {
										title: "Contact",
										name: d.Value.fullName,
										imgurl: I,
										department: d.Value.department,
										contactemailsubj: "App Genrated Mail",
										companyname: d.Value.Account.name1,
										beforeExtNav: C,
										companycard: {
											title: "Account",
											imgurl: "sap-icon://person-placeholder",
										}
									};
									var o = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
									o.openBy(b)
								}
							}
						}
					} else {
						sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
					}
				}, this), jQuery.proxy(function(E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
				}, this), true)
			} else {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_IN_MAIN_CONTACT'))
			}
		} else if (P == "00000021") {
			this.accountNum = a;
			if (a) {
				var p = "AccountCollection(accountID='" + a + "')?$expand=MainAddress,MainContact/WorkAddress,MainContact";
				var B = [];
				var t = this;
				B.push(m.createBatchOperation(p, "GET"));
				m.addBatchReadOperations(B);
				m.submitBatch(jQuery.proxy(function(r) {
					var M = {
						Value: ""
					};
					M.Value = r.__batchResponses[0].data;
					var C = jQuery.proxy(function(e) {
						var n = {};
						n.target = {};
						n.target.semanticObject = "Account";
						n.target.action = "MyAccounts";
						n.params = {
							accountID: this.accountNum
						};
						this.navToOtherApp = true;
						this.oRouter.detachRouteMatched(this.detailRouteMatched, this);
						return n
					}, this);
					if (M.Value.MainContact) {
						if (M.Value.MainContact.WorkAddress) {
							if (M.Value.MainAddress) {
								var o = {
									title: "Account",
									imgurl: I,
									companyname: M.Value.name1,
									companyphone: M.Value.MainAddress.phone,
									companyaddress: M.Value.MainAddress.address,
									maincontactname: M.Value.MainContact.fullName,
									maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
									maincontactphone: M.Value.MainContact.WorkAddress.phone,
									maincontactemail: M.Value.MainContact.WorkAddress.email,
									maincontactemailsubj: "Automatic Mail for Maincontact",
									beforeExtNav: C,
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b)
							} else {
								var o = {
									title: "Account",
									imgurl: I,
									companyname: M.Value.name1,
									maincontactname: M.Value.MainContact.fullName,
									maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
									maincontactphone: M.Value.MainContact.WorkAddress.phone,
									maincontactemail: M.Value.MainContact.WorkAddress.email,
									maincontactemailsubj: "Automatic Mail for Maincontact",
									beforeExtNav: C,
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b)
							}
						} else {
							if (M.Value.MainAddress) {
								var o = {
									title: "Account",
									imgurl: I,
									companyname: M.Value.name1,
									companyphone: M.Value.MainAddress.phone,
									companyaddress: M.Value.MainAddress.address,
									maincontactname: M.Value.MainContact.fullName,
									beforeExtNav: C,
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b)
							} else {
								var o = {
									title: "Account",
									imgurl: I,
									companyname: M.Value.name1,
									maincontactname: M.Value.MainContact.fullName,
									beforeExtNav: C,
								};
								var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
								f.openBy(b)
							}
						}
					} else {
						if (M.Value.MainAddress) {
							var o = {
								title: "Account",
								imgurl: I,
								companyname: M.Value.name1,
								companyphone: M.Value.MainAddress.phone,
								companyaddress: M.Value.MainAddress.address,
								beforeExtNav: C,
							};
							var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
							f.openBy(b)
						} else {
							var o = {
								title: "Account",
								imgurl: I,
								companyname: M.Value.name1,
								beforeExtNav: C,
							};
							var f = new sap.ca.ui.quickoverview.CompanyLaunch(o);
							f.openBy(b)
						}
					}
				}, this), jQuery.proxy(function(E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ERROR'))
				}, this), true)
			} else {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT_IS_NULL'))
			}
		} else {
			sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NOT_CONTACT_OR_ACCOUNT'))
		}
	},
	onAttachmentSelected: function(e) {
		var s = e.getParameter('listItem').getBindingContext().getObject();
		var w = window.open(s.__metadata.media_src, '_blank');
		w.focus()
	},
	getRuleForPartnerFunction: function(p) {
		for (var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++) {
			if (this.partnerDeterminationMap[this.transactionType][i].PartnerFunctionCode === p) {
				return this.partnerDeterminationMap[this.transactionType][i]
			}
		}
		return null
	},
	getCountForPartnerFunction: function(p) {
		var c = 0;
		var a = this.byId('Sales_Team').getModel('json').getData().OpportunitySalesTeamSet;
		for (var i = 0; i < a.length; i++) {
			if (a[i].PartnerFunctionCode === p) {
				c++
			}
		}
		return c
	},
	checkMinMaxRules: function(e) {
		var O = this.byId("Sales_Team").getModel("json").getData().OpportunitySalesTeamSet;
		var s = this.participantsF4Fragment.getContent()[0];
		var i = s.indexOfItem(s.getSelectedItem());
		var a = this.participantsF4Fragment.getModel('json').getData().PartnerFunctions[i];
		var P = a.PartnerFunctionCode;
		var C = a.CountHigh;
		var b = a.CountLow;
		var n = this.participantsF4Fragment.getContent()[2].getSelectedItems().length;
		var c = this.getCountForPartnerFunction(P);
		if (n + c > C) {
			if (e) {
				e.getParameters().listItem.setSelected(false)
			}
			if (C === 1) {
				sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_MANY_PARTICIPANTS_1', [C]), {
					duration: 3500
				})
			} else {
				sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_MANY_PARTICIPANTS', [C]), {
					duration: 3500
				})
			}
			return
		}
		if (n + c < b) {
			if (b === 1) {
				sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_FEW_PARTICIPANTS_1', [b]), {
					duration: 3500
				})
			} else {
				sap.m.MessageToast.show(this.oResourceBundle.getText('TOO_FEW_PARTICIPANTS', [b]), {
					duration: 3500
				})
			}
			return
		}
	},
	searchParticipants: function() {
		var s = this.participantsF4Fragment.getContent()[0];
		s.fireChange({
			selectedItem: s.getSelectedItem()
		})
	},
	onPartnerFunctionChange: function(e) {
		this.checkMinMaxRules(null);
		var c = e.getParameter('selectedItem').getKey();
		var a = e.getParameter('selectedItem').getText();
		var s = this.participantsF4Fragment.getContent()[1].getValue();
		this.participantsF4Fragment.getContent()[2].setNoDataText(this.oResourceBundle.getText("LOADING_TEXT"));
		this.participantsF4Fragment.getContent()[1].setPlaceholder(this.oResourceBundle.getText('SEARCH_PARTICIPANTS'));
		switch (c) {
			case "0005":
			case "0008":
				this.oModel.read("EmployeeCollection", null, ["$filter=substringof('" + s + "',fullName)"], false, jQuery.proxy(function(o, r) {
					this.participantsF4Fragment.getModel('json').getData().Employees = r.data.results;
					this.participantsF4Fragment.getModel('json').updateBindings();
					this.participantsF4Fragment.getContent()[2].bindItems("json>/Employees", this.employeeListItemTemplate, null, [])
				}, this), jQuery.proxy(function(E) {}, this));
				break;
			case "0007":
				this.oModel.read("ContactCollection", null, ["$filter=substringof('" + s + "',fullName)"], false, jQuery.proxy(function(o, r) {
					this.participantsF4Fragment.getModel('json').getData().Contacts = r.data.results;
					this.participantsF4Fragment.getModel('json').updateBindings();
					this.participantsF4Fragment.getContent()[2].bindItems("json>/Contacts", this.contactListItemTemplate, null, [])
				}, this), jQuery.proxy(function(E) {}, this));
				break;
			default:
				this.oModel.read("AccountCollection", null, ["$filter=substringof('" + s + "',name1)"], false, jQuery.proxy(function(o, r) {
					this.participantsF4Fragment.getModel('json').getData().Accounts = r.data.results;
					this.participantsF4Fragment.getModel('json').updateBindings();
					this.participantsF4Fragment.getContent()[2].bindItems("json>/Accounts", this.accountListItemTemplate, null, [])
				}, this), jQuery.proxy(function(E) {}, this));
				break
		}
		this.participantsF4Fragment.getContent()[2].setNoDataText(this.oResourceBundle.getText("NO_PARTICIPANTS"))
	},
	bindS3Header: function(d) {
		var s = this.byId('S3_Header');
		var p = "/AccountCollection('" + d.ProspectNumber + "')";
		var l = "sap-icon://person-placeholder";
		this.oModel.read(p, null, ["$expand=Logo"], false, function(o, r) {
			jQuery.sap.log.info("oData account response");
			if (o.Logo && o.Logo.__metadata) {
				var m = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
				l = m.toString()
			}
			d.ImgSrc = l;
			if (s && s.getModel('json')) s.getModel('json').setData(d)
		}, jQuery.proxy(this.handleErrors, this))
	},
	getParticipants: function() {
		var d;
		var l = [];
		var t = this;
		this.partnerFunctionMap = {};
		this.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
		this.byId('Sales_Team').getModel('json').setData({
			OpportunitySalesTeamSet: []
		});
		this.oModel.read(this.sPath, null, ["$expand=SalesTeam"], false, function(o, r) {
			t.bindS3Header(r.data);
			var a = t.getView().byId("Sales_Team");
			var b = new sap.ui.model.json.JSONModel();
			t.oVersioningModel.getData().setHeaderTextForParticipants(r);
			d = {
				OpportunitySalesTeamSet: r.data.SalesTeam.results
			};
			if (d.OpportunitySalesTeamSet.length == 0) {
				t.byId("Sales_Team").setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('NO_CONTACTS'))
			}
			var B = [];
			for (var i = 0; i < d.OpportunitySalesTeamSet.length; i++) {
				var c = d.OpportunitySalesTeamSet[i].PartnerNumber;
				var p = "/AccountCollection('" + c + "')?$expand=Logo";
				l[i] = "sap-icon://person-placeholder";
				B.push(t.oModel.createBatchOperation(p, "GET"))
			};
			t.oModel.addBatchReadOperations(B);
			t.oModel.submitBatch(jQuery.proxy(function(R) {
				for (var j = 0; j < d.OpportunitySalesTeamSet.length; j++) {
					if (!R.__batchResponses[j].hasOwnProperty("data")) {
						l[j] = 'sap-icon://person-placeholder'
					} else {
						if (R.__batchResponses[j].data.Logo && R.__batchResponses[j].data.Logo.__metadata.media_src) {
							var m = R.__batchResponses[j].data.Logo.__metadata.media_src ? R.__batchResponses[j].data.Logo.__metadata.media_src :
								"sap-icon://person-placeholder";
							var U = m;
							l[j] = U.toString()
						}
					}
					d.OpportunitySalesTeamSet[j].ImgSrc = l[j]
				}
				b.setData(d);
				a.setModel(b, "json")
			}, this), jQuery.proxy(function() {
				sap.m.MessageToast
			}, this), true)
		})
	},
	addParticipants: function() {
		this.oModel.clearBatch();
		var c = [];
		var a = this.participantsF4Fragment.getContent()[0].getSelectedItem().getBindingContext('json').getObject().PartnerFunctionCode;
		var h = this.byId('info').getModel('json').getData().Guid;
		var b = this.participantsF4Fragment.getContent()[2].getSelectedItems();
		var e;
		for (var i = 0; i < b.length; i++) {
			e = {
				HeaderGuid: h,
				PartnerNumber: b[i].data("ID"),
				PartnerFunctionCode: a
			};
			c.push(this.oModel.createBatchOperation("OpportunitySalesTeamSet", "POST", e, null))
		}
		if (c.length > 0) {
			this.oModel.addBatchChangeOperations(c);
			this.oModel.submitBatch(jQuery.proxy(function(r) {
				this.getParticipants();
				this.getDataForDetailScreen(false);
				this.participantsF4Fragment.getContent()[2].removeSelections();
				this.participantsF4Fragment.getContent()[1].clear();
				this.participantsF4Fragment.close()
			}, this), jQuery.proxy(function(E) {
				this.handleErrors(E)
			}, this))
		}
	},
	onDeleteParticipant: function(e) {
		var c = e.getSource().getBindingContext('json').getObject();
		var C = this.getRuleForPartnerFunction(c.PartnerFunctionCode);
		if (this.getCountForPartnerFunction(c.PartnerFunctionCode) - 1 < C.CountLow) {
			if (C.CountLow === 1) {
				sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText('MUST_HAVE_PARTICIPANTS_1', [C.CountLow]))
			} else {
				sap.ca.ui.message.showMessageToast(this.oResourceBundle.getText('MUST_HAVE_PARTICIPANTS', [C.CountLow]))
			}
			return
		}
		var h = this.byId('info').getModel('json').getData().Guid;
		var p = ["OpportunitySalesTeamSet(HeaderGuid=guid'", h, "',PartnerNumber='", c.PartnerNumber, "',PartnerFunctionCode='", c.PartnerFunctionCode,
			"')"].join("");
		this.oModel.remove(p, null, jQuery.proxy(function() {
			this.getParticipants();
			this.getDataForDetailScreen(false);
			this.oModel.refresh()
		}, this), jQuery.proxy(function(E) {
			this.handleErrors(E)
		}, this))
	},
	getChangeable: function(p) {
		for (var i = 0; i < this.partnerDeterminationMap[this.transactionType].length; i++) {
			if (aPartnerFunctions[i].PartnerFunctionCode === p) {
				return aPartnerFunctions[i].ChangeableFlag
			}
		}
		return true
	},
	showParticipantsF4: function() {
		var s;
		if (!this.participantsF4Fragment) {
			this.participantsF4Fragment = new sap.ui.xmlfragment(this.createId("participantsF4_S3"), 'cus.crm.opportunity.view.ParticipantsF4',
				this);
			this.participantsF4Fragment.setModel(new sap.ui.model.json.JSONModel({}), "json");
			this.participantsF4Fragment.setModel(this.oI18nModel, 'i18n');
			s = this.participantsF4Fragment.getContent()[0];
			s.attachChange(null, this.onPartnerFunctionChange, this)
		}
		s = this.participantsF4Fragment.getContent()[0];
		this.participantsF4Fragment.getModel('json').getData().PartnerFunctions = this.partnerDeterminationMap[this.transactionType];
		this.participantsF4Fragment.getModel('json').updateBindings();
		if (s.getItems().length > 0) {
			s.setSelectedItem(s.getItems()[0]);
			s.fireChange({
				selectedItem: s.getItems()[0]
			})
		}
		this.participantsF4Fragment.open()
	},
	closeParticipantsF4: function(e) {
		this.participantsF4Fragment.getContent()[1].clear();
		this.participantsF4Fragment.getContent()[2].removeSelections();
		this.participantsF4Fragment.close()
	},
	addContact: function(e) {
		var m = this.getView().getModel();
		this.contactF4Fragment.getContent()[0].removeSelections();
		this.contactF4Fragment.setModel(new sap.ui.model.json.JSONModel());
		this.contactF4Fragment.setModel(this.getView().getModel("i18n"), "i18n");
		this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
			'LOADING_TEXT'));
		var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
		var a = t.getContent()[0];
		t.setVisible(false);
		this.contactF4Fragment.getSubHeader().getContentLeft()[0].setValue("");
		var o = this.byId('info').getModel('json').getData();
		this.opportunity_number = o.ProspectNumber;
		this.contactF4Fragment.open();
		var j = new sap.ui.model.json.JSONModel();
		this.contactF4Fragment.setModel(j, "json");
		if (this.opportunity_number != "" && this.opportunity_number != undefined) {
			t.setVisible(true);
			a.setText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('FILTER') + " " + o.ProspectName);
			m.read("/AccountCollection(accountID='" + this.opportunity_number + "')/Contacts", null, null, true, jQuery.proxy(function(b, r) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: r.data.results
				});
				if (r.data.results.length === 0) this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle()
					.getText('NO_CONTACTS'))
			}, this), jQuery.proxy(function(E) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: []
				});
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
					'NO_CONTACTS'))
			}, this))
		} else {
			t.setVisible(false);
			this.contactF4Fragment.getModel('json').setData({
				ContactCollection: []
			});
			this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
				'LOADING_TEXT'));
			m.read("ContactCollection", null, null, true, jQuery.proxy(function(b, r) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: r.data.results
				});
				if (r.data.results.length === 0) this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle()
					.getText('NO_CONTACTS'))
			}, this), jQuery.proxy(function(E) {
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
					'NO_CONTACTS'))
			}, this))
		}
	},
	setContact: function(e) {
		var m = this.getView().getModel();
		this.oSelectedContact = e.getSource().getSelectedItem().getBindingContext("json").getObject();
		var a = this.byId('info').getModel('json').getData().ProspectNumber;
		var h = this.byId('info').getModel('json').getData().Guid;
		var t = this;
		m.refreshSecurityToken();
		m.update("OpportunitySalesTeamSet(PartnerNumber='" + this.oSelectedContact.contactID +
			"',PartnerFunctionCode='00000015',HeaderGuid=guid'" + h + "')", {
				HeaderGuid: h,
				PartnerNumber: this.oSelectedContact.contactID,
				PartnerFunctionCode: '00000015'
			}, {
				fnSuccess: jQuery.proxy(function() {
					var h = this.byId('info').getModel('json').getData().Guid;
					var p = "/Opportunities(guid'" + h + "')";
					var d;
					var l = [];
					var t = this;
					this.getParticipants()
				}, this),
				fnError: function(E) {
					sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ERROR'))
				},
				bMerge: true
			});
		this.contactF4Fragment.getContent()[0].removeSelections();
		var j = new sap.ui.model.json.JSONModel();
		j.setData({
			ContactCollection: []
		});
		this.contactF4Fragment.setModel(j, "json");
		this.contactF4Fragment.close()
	},
	closeToolbar: function(e) {
		var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
		var o = this.contactF4Fragment.getContent()[0];
		t.setVisible(false);
		o.getBinding("items").aFilters = [];
		o.getBinding("items").sFilterParams = "";
		o.getBinding("items").refresh();
		this.contactF4Fragment.getModel('json').setData({
			ContactCollection: []
		});
		o.setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('LOADING_TEXT'));
		this.getView().getModel().read("ContactCollection", null, null, true, jQuery.proxy(function(a, r) {
			this.contactF4Fragment.getModel('json').setData({
				ContactCollection: r.data.results
			});
			if (r.data.results.length === 0) this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle()
				.getText('NO_CONTACTS'))
		}, this), jQuery.proxy(function(E) {
			this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
				'NO_CONTACTS'))
		}, this))
	},
	onRenameFile: function(e) {
		var n = e.mParameters.newFilename;
		var f = e.mParameters.fileId;
		var o = {
			"newFileName": n + "",
			"fileId": f + ""
		};
		var P = e.getParameters();
		var U = P.url;
		var r = U.split("(").pop();
		var p = "OpportunityAttachments(";
		var u = p + r;
		this.oModel.setHeaders(o);
		this.oModel.addBatchChangeOperations([this.oModel.createBatchOperation(u, "PUT", o, null)])
	},
	onSaveClicked: function() {
		var b;
		this.oModel.submitBatch();
		var s = true;
		var f = this.byId("fileupload");
		if (s) {
			f.commitPendingRenames()
		} else {
			f.abandonPendingRenames()
		}
	},
	closeContactF4: function(e) {
		var j = new sap.ui.model.json.JSONModel();
		j.setData({
			ContactCollection: []
		});
		this.contactF4Fragment.setModel(j, "json");
		this.contactF4Fragment.close()
	},
	searchContact: function(e) {
		var v = e.getParameter("query");
		this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
			'LOADING_TEXT'));
		var t = this.contactF4Fragment.getContent()[0].getInfoToolbar();
		if (t.getVisible() === false) {
			this.getView().getModel().read("ContactCollection", null, ["$filter=substringof('" + v + "'" + ",fullName)"], true, jQuery.proxy(
				function(o, r) {
					this.contactF4Fragment.getModel('json').setData({
						ContactCollection: r.data.results
					});
					if (r.data.results.length === 0) this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle()
						.getText('NO_CONTACTS'))
				}, this), jQuery.proxy(function(E) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: []
				});
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
					'NO_CONTACTS'))
			}, this))
		} else {
			var a = this.byId('info').getModel('json').getData().ProspectNumber;
			this.getView().getModel().read("/AccountCollection(accountID='" + a + "')/Contacts", null, ["$filter=substringof('" + v + "'" +
				",fullName)"], true, jQuery.proxy(function(o, r) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: r.data.results
				});
				if (r.data.results.length === 0) this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle()
					.getText('NO_CONTACTS'))
			}, this), jQuery.proxy(function(E) {
				this.contactF4Fragment.getModel('json').setData({
					ContactCollection: []
				});
				this.contactF4Fragment.getContent()[0].setNoDataText(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
					'NO_CONTACTS'))
			}, this))
		}
	},
	handleErrors: function(e) {
		sap.ca.ui.utils.busydialog.releaseBusyDialog();
		jQuery.sap.log.error(JSON.stringify(e));
		sap.ca.ui.message.showMessageBox({
			type: sap.ca.ui.message.Type.ERROR,
			message: e.message,
			details: JSON.parse(e.response.body).error.message.value
		}, function(r) {
			var i = 0;
			i++
		})
	},
	getDataForDetailScreen: function(s) {
		if (this.bAppLaunched) {
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("SalesStages", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Priorities", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("UserStatuses", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation("Currencies", "GET")]);
			this.oModel.addBatchReadOperations([this.oModel.createBatchOperation(this.sPath + "?$expand=Products,ChangeDocs,Competitors", "GET")]);
			this.oModel.submitBatch(jQuery.proxy(this.handleBatchResponses, this), jQuery.proxy(this.handleBatchErrors, this));
			this.bAppLaunched = false
		} else this.oModel.read(this.sPath, null, ["$expand=Products,ChangeDocs,Competitors"], true, jQuery.proxy(function(o, r) {
			this.bindInfoAndProducts(r.data, s)
		}, this), jQuery.proxy(this.handleErrors, this))
	},
	handleBatchResponses: function(r) {
		var f = false;
		var e;
		var a;
		var t = this;
		this.bAppLaunched = false;
		if (r.__batchResponses[0].statusCode === "200") {
			t.SalesStages = r.__batchResponses[0].data.results
		} else {
			f = true;
			e = r.__batchResponses[0].statusText;
			a = JSON.parse(r.__batchResponses[0].response.body).error.message.value + "\n"
		} if (r.__batchResponses[1].statusCode === "200") {
			t.Priorities = r.__batchResponses[1].data.results
		} else {
			f = true;
			e = r.__batchResponses[1].statusText;
			a = JSON.parse(r.__batchResponses[1].response.body).error.message.value + "\n"
		} if (r.__batchResponses[2].statusCode === "200") {
			t.UserStatuses = r.__batchResponses[2].data.results
		} else {
			f = true;
			e = r.__batchResponses[2].statusText;
			a = JSON.parse(r.__batchResponses[2].response.body).error.message.value + "\n"
		} if (r.__batchResponses[3].statusCode === "200") {
			t.Currencies = r.__batchResponses[3].data.results
		} else {
			f = true;
			e = r.__batchResponses[3].statusText;
			a = JSON.parse(r.__batchResponses[3].response.body).error.message.value + "\n"
		} if (f) {
			sap.ca.ui.message.showMessageBox({
				type: sap.ca.ui.message.Type.ERROR,
				message: e,
				details: a
			}, function(R) {
				var i = 0;
				i++
			})
		}
		if (r.__batchResponses[4].hasOwnProperty("data")) this.bindInfoAndProducts(r.__batchResponses[4].data, true);
		else this.handleErrors(r.__batchResponses[4])
	},
	bindInfoAndProducts: function(d, s) {
		var i = this.byId('info');
		var p = this.byId('Product_Tab');
		var a = this.byId('S3_Header');
		this.headerGuid = a.getModel('json').getData().Guid;
		this.transactionType = a.getModel('json').getData().ProcessType;
		if (i && i.getModel('json')) i.getModel('json').setData(d);
		if (p && p.getModel('json')) p.getModel('json').setData({
			Products: d.Products.results
		});
		if (d.Products.results.length === 0) this.byId('icntab').getItems()[1].setVisible(false);
		else this.byId('icntab').getItems()[1].setVisible(true); if (d.ChangeDocs.results.length === 0) this.byId("log").setVisible(false);
		else this.byId("log").setVisible(true); if (d.Competitors.results.length === 0) this.byId('icntab').getItems()[5].setVisible(false);
		else this.byId('icntab').getItems()[5].setVisible(true); if (s) {
			this.setDefaultTabToInfo()
		}
		var m = this.getView().getModel();
		var t = this;
		var U;
		var P = "/AccountCollection('" + d.ProspectNumber + "')";
		var l = "sap-icon://person-placeholder";
		m.read(P, null, ["$expand=Logo"], false, function(o, r) {
			jQuery.sap.log.info("oData account response");
			if (o.Logo && o.Logo.__metadata) {
				var M = o.Logo.__metadata.media_src ? o.Logo.__metadata.media_src : "sap-icon://person-placeholder";
				var U = M;
				l = U.toString()
			}
			d.ImgSrc = l;
			if (a && a.getModel('json')) a.getModel('json').setData(d)
		})
	},
	onDeleteFile: function(e) {
		var P = e.getParameters();
		var U = P.url;
		var r = U.split("(").pop();
		var p = "OpportunityAttachments(";
		var u = p + r;
		this.oModel.remove(u);
		this.byId('fileupload').removeFile(P.fileId)
	},
	detailRouteMatched: function(e) {
		if (e.getParameter("name") === "detail" || e.getParameter("name") === "detailonly") {
			if (this.navToOtherApp) {
				this.navToOtherApp = false;
				return
			}
			var s = this.getS4Controller();
			if (s && s.bCancel) {
				s.bCancel = false;
				this.setDefaultTabToInfo();
				return
			}
			if (s && s.bEmployeeUpdateSuccess) {
				this.oModel.refresh()
			}
			this.byId('opportunityHeader').setIcon("sap-icon://person-placeholder");
			this.sPath = e.getParameter("arguments").contextPath;
			this.getDataForDetailScreen(true)
		}
	},
	onAccountBusCardLaunch: function(e) {
		var a = e.oSource.data("PartnerNumber");
		var I = e.oSource.data("Image");
		var m = this.oModel;
		var b = e.getSource();
		if (a) {
			var p = "AccountCollection(accountID='" + a + "')?$expand=MainAddress,MainContact/WorkAddress,MainContact";
			var B = [];
			B.push(m.createBatchOperation(p, "GET"));
			m.addBatchReadOperations(B);
			m.submitBatch(jQuery.proxy(function(r) {
				var M = {
					Value: ""
				};
				M.Value = r.__batchResponses[0].data;
				var c = jQuery.proxy(function(E) {
					var n = {};
					n.target = {};
					n.target.semanticObject = "Account";
					n.target.action = "MyAccounts";
					n.params = {
						accountID: a
					};
					this.navToOtherApp = true;
					return n
				}, this);
				if (M.Value.MainContact) {
					if (M.Value.MainContact.WorkAddress) {
						if (M.Value.MainAddress) {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
								imgurl: I,
								companyname: M.Value.name1,
								companyphone: M.Value.MainAddress.phone,
								companyaddress: M.Value.MainAddress.address,
								maincontactname: M.Value.MainContact.fullName,
								maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
								maincontactphone: M.Value.MainContact.WorkAddress.phone,
								maincontactemail: M.Value.MainContact.WorkAddress.email,
								maincontactemailsubj: "Automatic Mail for Maincontact",
								beforeExtNav: c,
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b)
						} else {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
								imgurl: I,
								companyname: M.Value.name1,
								maincontactname: M.Value.MainContact.fullName,
								maincontactmobile: M.Value.MainContact.WorkAddress.mobilePhone,
								maincontactphone: M.Value.MainContact.WorkAddress.phone,
								maincontactemail: M.Value.MainContact.WorkAddress.email,
								maincontactemailsubj: "Automatic Mail for Maincontact",
								beforeExtNav: c,
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b)
						}
					} else {
						if (M.Value.MainAddress) {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
								imgurl: I,
								companyname: M.Value.name1,
								companyphone: M.Value.MainAddress.phone,
								companyaddress: M.Value.MainAddress.address,
								maincontactname: M.Value.MainContact.fullName,
								beforeExtNav: c,
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b)
						} else {
							var C = {
								title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
								imgurl: I,
								companyname: M.Value.name1,
								maincontactname: M.Value.MainContact.fullName,
								beforeExtNav: c,
							};
							var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
							o.openBy(b)
						}
					}
				} else {
					if (M.Value.MainAddress) {
						var C = {
							title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
							imgurl: I,
							companyname: M.Value.name1,
							companyphone: M.Value.MainAddress.phone,
							companyaddress: M.Value.MainAddress.address,
							beforeExtNav: c,
						};
						var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
						o.openBy(b)
					} else {
						var C = {
							title: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ACCOUNT'),
							imgurl: I,
							companyname: M.Value.name1,
							beforeExtNav: c,
						};
						var o = new sap.ca.ui.quickoverview.CompanyLaunch(C);
						o.openBy(b)
					}
				}
			}, this), jQuery.proxy(function(E) {
				sap.m.MessageToast.show(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('ERROR'))
			}, this), true)
		}
	}
});