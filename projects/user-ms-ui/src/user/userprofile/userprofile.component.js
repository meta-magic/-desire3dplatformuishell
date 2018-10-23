"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by Ashwini on 19/2/18.
 */
var core_1 = require("@angular/core");
var UserprofileComponent = (function () {
    function UserprofileComponent(http, cookieService, _notificationService, loaderService) {
        this.http = http;
        this.cookieService = cookieService;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.updateFlag = false;
        this.emailAsync = false;
        this.phoneAsync = false;
        this.addressAsync = false;
        this.socialAsync = false;
        this.emaildisableflag = false;
        this.phoneDisableFlag = false;
        this.addressDisableFlag = false;
        this.socialDisableFlag = false;
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.emailLabel = 'Save';
        this.emailIcon = 'fa fa-save';
        this.phoneLabel = 'Save';
        this.phoneIcon = 'fa fa-save';
        this.addressLabel = 'Save';
        this.addressIcon = 'fa fa-save';
        this.socialLabel = 'Save';
        this.socialIcon = 'fa fa-save';
        this.getUserProfileData();
        this.msgData = [];
        this.emailUUIDflag = true;
        this.personIdFlag = true;
        this.addressUUIDflag = true;
        this.phoneUUIDflag = true;
        this.socialMediaUUIDflag = true;
        this.userProfileModel = new UserProfileModel();
        this.UserEmailModel = new UserEmailModel();
        this.userPhoneModel = new UserPhoneModel();
        this.userSocialMediaModel = new UserSocialMediaModel();
        this.userAddressModel = new UserAddressModel();
        this.userEmailData = [];
        this.userPhoneData = [];
        this.userSocialMediaData = [];
        this.userAddressData = [];
    }
    UserprofileComponent.prototype.ngOnInit = function () { };
    UserprofileComponent.prototype.createInvalidCompErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    UserprofileComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    UserprofileComponent.prototype.validateFormFields = function (num) {
        if (num == 1) {
            debugger;
            var isValid = false;
            this.validationMsgArray = [];
            if (this.userProfileModel.salutationId == null ||
                this.userProfileModel.salutationId == '') {
                this.validationMsgArray.push('Invalid (Blank) Title.');
            }
            if (this.userProfileModel.firstName == '') {
                this.validationMsgArray.push('Invalid (Blank) First Name.');
            }
            if (this.userProfileModel.middleName == '') {
                this.validationMsgArray.push('Invalid (Blank) Middle Name.');
            }
            if (this.userProfileModel.lastName == '') {
                this.validationMsgArray.push('Invalid (Blank) Last Name.');
            }
            if (this.userProfileModel.dateOfBirth == null) {
                this.validationMsgArray.push('Invalid Date Of Birth.');
            }
            if (this.userProfileModel.genderId == null ||
                this.userProfileModel.genderId == '') {
                this.validationMsgArray.push('Invalid (Blank) Gender.');
            }
        }
        else if (num == 2) {
            var isValid = false;
            this.validationMsgArray = [];
            if (this.UserEmailModel.commLabelId == null ||
                this.UserEmailModel.commLabelId == '') {
                this.validationMsgArray.push('Invalid (Blank) Email Type.');
            }
            if (this.UserEmailModel.emailId == '') {
                this.validationMsgArray.push('Invalid (Blank) Email Id');
            }
        }
        else if (num == 3) {
            var isValid = false;
            this.validationMsgArray = [];
            if (this.userPhoneModel.commLabelId == null ||
                this.userPhoneModel.commLabelId == '') {
                this.validationMsgArray.push('Invalid (Blank) Phone Number Type.');
            }
            if (this.userPhoneModel.phoneNumber == null) {
                this.validationMsgArray.push('Invalid (Blank) Phone Number');
            }
            else {
                this.validateMobileNumber();
            }
        }
        else if (num == 4) {
            var isValid = false;
            this.validationMsgArray = [];
            if (this.userSocialMediaModel.socialMediaTypeId == null ||
                this.userSocialMediaModel.socialMediaTypeId == '') {
                this.validationMsgArray.push('Invalid (Blank) Social Media Type.');
            }
            if (this.userSocialMediaModel.socialMediaId == '') {
                this.validationMsgArray.push('Invalid (Blank) Social Media');
            }
        }
        else if (num == 5) {
            var isValid = false;
            this.validationMsgArray = [];
            if (this.userAddressModel.addressLabel == '') {
                this.validationMsgArray.push('Invalid (Blank)Address Label ');
            }
            if (this.userAddressModel.address1 == '') {
                this.validationMsgArray.push('Invalid (Blank) Address Line1');
            }
            if (this.userAddressModel.countryId == null ||
                this.userAddressModel.countryId == '') {
                this.validationMsgArray.push('Invalid (Blank) Country');
            }
            if (this.userAddressModel.stateId == null ||
                this.userAddressModel.stateId == '') {
                this.validationMsgArray.push('Invalid (Blank) State');
            }
            if (this.userAddressModel.cityName == '') {
                this.validationMsgArray.push('Invalid (Blank) City Name');
            }
            if (this.userAddressModel.zipCode == '') {
                this.validationMsgArray.push('Invalid (Blank) Zipcode');
            }
            else {
                this.validateZipcode();
            }
        }
    };
    UserprofileComponent.prototype.validateMobileNumber = function () {
        var number = this.userPhoneModel.phoneNumber;
        var numberStr = number + '';
        if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
            this.validationMsgArray.push('Phone Number must be  7 to 15 digits, country code may required');
        }
    };
    UserprofileComponent.prototype.validateZipcode = function () {
        var zipcode = this.userAddressModel.zipCode;
        var zipcodeStr = zipcode + '';
        if ((zipcodeStr && zipcodeStr.length < 4) || zipcodeStr.length > 10) {
            this.validationMsgArray.push('Zipcode must be  4 to 10 digits');
        }
    };
    UserprofileComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
        this.validationMsgArray = [];
    };
    UserprofileComponent.prototype.setSelectedGender = function (data) { };
    UserprofileComponent.prototype.getUserProfileData = function () {
        var _this = this;
        var profileDetails;
        this.userProfileModel = new UserProfileModel();
        this.http.get('/api/user/person/findPersonDetails').subscribe(function (response) {
            profileDetails = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (profileDetails.success) {
                _this.userProfileModel = profileDetails.response;
                _this.userEmailData = profileDetails.response.emails;
                _this.userPhoneData = profileDetails.response.phones;
                _this.userSocialMediaData = profileDetails.response.socialMedias;
                _this.userAddressData = profileDetails.response.personAddresses;
            }
            else {
                _this.validationMsgArray.push(profileDetails.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.updateClick = function () {
        debugger;
        this.validateFormFields(1);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.onUpdateProfile();
        }
    };
    //To Reset Updated Person Data
    UserprofileComponent.prototype.cancelClick = function () {
        this.userProfileModel = new UserProfileModel();
        this.getUserProfileData();
    };
    UserprofileComponent.prototype.onUpdateProfile = function () {
        var _this = this;
        this.updateFlag = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var userDataResponse;
        var requestJson = this.userProfileModel;
        this.http.post('/api/user/person/updateUser', requestJson).subscribe(function (res) {
            userDataResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.updateFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (userDataResponse.success) {
                _this.msgData.push(userDataResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.updateFlag = false;
                _this.loaderService.hideLoader();
            }
            else {
                _this.validationMsgArray.push(userDataResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.updateFlag = false;
                _this.loaderService.hideLoader();
            }
        });
    };
    UserprofileComponent.prototype.addEmail = function () {
        this.validateFormFields(2);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            this.createInvalidCompErrorData();
            // return;
        }
        else {
            // this.isValidateForm = false;
            this.saveEmail();
        }
    };
    UserprofileComponent.prototype.saveEmail = function () {
        var _this = this;
        if (!this.UserEmailModel.emailUUID || this.UserEmailModel.emailId == '') {
            this.emailAsync = true;
            this.msgData = [];
            this.loaderService.showLoader();
            var emailResponse_1;
            var requestJson = {
                emailId: this.UserEmailModel.emailId,
                commLabelId: this.UserEmailModel.commLabelId
            };
            this.http.post('/api/user/email/save', requestJson).subscribe(function (res) {
                emailResponse_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.emailAsync = false;
                _this.loaderService.hideLoader();
            }, function () {
                if (emailResponse_1.success) {
                    _this.msgData.push(emailResponse_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.resetEmails();
                    _this.reLoadEmailsData();
                    _this.emailAsync = false;
                    _this.loaderService.hideLoader();
                }
                else {
                    _this.validationMsgArray.push(emailResponse_1.errorMessage);
                    // this.isValidateForm = true;
                    _this.emailAsync = false;
                    _this.loaderService.hideLoader();
                    emailResponse_1.errors.forEach(function (error, index) {
                        _this.validationMsgArray.push(error);
                    });
                    _this.createErrorData();
                }
            });
        }
        else if (this.UserEmailModel.emailUUID) {
            this.updateEmail();
        }
    };
    UserprofileComponent.prototype.resetEmails = function () {
        this.UserEmailModel = new UserEmailModel();
    };
    UserprofileComponent.prototype.onEmailsRowSelect = function (data) {
        this.emaildisableflag = true;
        this.selectedEmailRecords = data;
        this.UserEmailModel.emailId = this.selectedEmailRecords.emailId;
        this.UserEmailModel.commLabelId = this.selectedEmailRecords.commLabelId;
        this.UserEmailModel.emailUUID = this.selectedEmailRecords.emailUUID;
        this.emailLabel = 'Update';
        this.emailIcon = 'fa fa-pencil';
    };
    UserprofileComponent.prototype.updateEmail = function () {
        this.validateFormFields(2);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.emailUpdate();
        }
    };
    UserprofileComponent.prototype.emailUpdate = function () {
        var _this = this;
        this.emailAsync = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var emailDetailsResponse;
        var requestJson = this.UserEmailModel;
        this.http.post('/api/user/email/update', requestJson).subscribe(function (res) {
            emailDetailsResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.emailAsync = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (emailDetailsResponse.success) {
                _this.msgData.push(emailDetailsResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.resetEmails();
                _this.reLoadEmailsData();
                _this.emaildisableflag = false;
                _this.emailAsync = false;
                _this.loaderService.hideLoader();
                _this.emailLabel = 'Save';
                _this.emailIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(emailDetailsResponse.errorMessage);
                // this.isValidateForm = true;
                _this.emailAsync = false;
                _this.loaderService.hideLoader();
                emailDetailsResponse.errors.forEach(function (error, index) {
                    _this.validationMsgArray.push(error);
                });
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.removeEmail = function (row) {
        var _this = this;
        var emailResponse;
        this.msgData = [];
        var emailUUID = row.emailUUID;
        this.http["delete"]('/api/user/email/delete?emailUUID=' + emailUUID).subscribe(function (res) {
            emailResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (emailResponse.success) {
                _this.msgData.push(emailResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.resetEmails();
                _this.reLoadEmailsData();
                _this.emaildisableflag = false;
                _this.emailLabel = 'Save';
                _this.emailIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(emailResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.reLoadEmailsData = function () {
        var _this = this;
        var emailsData;
        this.http.get('/api/user/email/findEmailDetails').subscribe(function (response) {
            emailsData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (emailsData.success) {
                _this.userEmailData = emailsData.response;
            }
        });
    };
    UserprofileComponent.prototype.addContact = function () {
        this.validateFormFields(3);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.saveContact();
        }
    };
    UserprofileComponent.prototype.saveContact = function () {
        var _this = this;
        if (!this.userPhoneModel.phoneUUID || this.userPhoneModel.phoneUUID == '') {
            this.phoneAsync = true;
            this.msgData = [];
            this.loaderService.showLoader();
            var phoneresponse_1;
            var requestJson = {
                phoneNumber: this.userPhoneModel.phoneNumber,
                commLabelId: this.userPhoneModel.commLabelId
            };
            this.http.post('/api/user/phone/save', requestJson).subscribe(function (res) {
                phoneresponse_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.phoneAsync = false;
                _this.loaderService.hideLoader();
            }, function () {
                if (phoneresponse_1.success) {
                    _this.phoneAsync = false;
                    _this.loaderService.hideLoader();
                    _this.msgData.push(phoneresponse_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.resetContacts();
                    _this.reloadPhoneData();
                }
                else {
                    _this.validationMsgArray.push(phoneresponse_1.errorMessage);
                    // this.isValidateForm = true;
                    _this.phoneAsync = false;
                    _this.loaderService.hideLoader();
                    phoneresponse_1.errors.forEach(function (error, index) {
                        _this.validationMsgArray.push(error);
                    });
                    _this.createErrorData();
                }
            });
        }
        else if (this.userPhoneModel.phoneUUID) {
            this.updateContact();
        }
    };
    UserprofileComponent.prototype.resetContacts = function () {
        this.userPhoneModel = new UserPhoneModel();
    };
    UserprofileComponent.prototype.onPhonesRowSelect = function (data) {
        this.phoneDisableFlag = true;
        this.selectedPhonesRecords = data;
        this.userPhoneModel.phoneNumber = this.selectedPhonesRecords.phoneNumber;
        this.userPhoneModel.commLabelId = this.selectedPhonesRecords.commLabelId;
        this.userPhoneModel.phoneUUID = this.selectedPhonesRecords.phoneUUID;
        this.phoneLabel = 'Update';
        this.phoneIcon = 'fa fa-pencil';
    };
    UserprofileComponent.prototype.updateContact = function () {
        this.validateFormFields(3);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.contactUpdate();
        }
    };
    UserprofileComponent.prototype.contactUpdate = function () {
        var _this = this;
        this.phoneAsync = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var phoneDetailsResponse;
        var requestJson = this.userPhoneModel;
        this.http.post('/api/user/phone/update', requestJson).subscribe(function (res) {
            phoneDetailsResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.phoneAsync = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (phoneDetailsResponse.success) {
                _this.msgData.push(phoneDetailsResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.phoneAsync = false;
                _this.loaderService.hideLoader();
                _this.phoneDisableFlag = false;
                _this.resetContacts();
                _this.reloadPhoneData();
                _this.phoneLabel = 'Save';
                _this.phoneIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(phoneDetailsResponse.errorMessage);
                _this.isValidateForm = true;
                _this.phoneAsync = false;
                _this.loaderService.hideLoader();
                phoneDetailsResponse.errors.forEach(function (error, index) {
                    _this.validationMsgArray.push(error);
                });
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.removeContact = function (row) {
        var _this = this;
        var phoneResponse;
        this.msgData = [];
        var phoneUUID = row.phoneUUID;
        this.http["delete"]('/api/user/phone/delete?phoneUUID=' + phoneUUID).subscribe(function (res) {
            phoneResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (phoneResponse.success) {
                _this.msgData.push(phoneResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.phoneDisableFlag = false;
                _this.resetContacts();
                _this.reloadPhoneData();
                _this.phoneLabel = 'Save';
                _this.phoneIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(phoneResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.reloadPhoneData = function () {
        var _this = this;
        var phoneresponse;
        this.http.get('/api/user/phone/findPhoneDetails').subscribe(function (res) {
            phoneresponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (phoneresponse.success) {
                _this.userPhoneData = phoneresponse.response;
            }
        });
    };
    UserprofileComponent.prototype.addSocialMedia = function () {
        this.validateFormFields(4);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.saveSocialMedia();
        }
    };
    UserprofileComponent.prototype.saveSocialMedia = function () {
        var _this = this;
        if (!this.userSocialMediaModel.socialMediaUUID ||
            this.userSocialMediaModel.socialMediaUUID == '') {
            this.socialAsync = true;
            this.msgData = [];
            this.loaderService.showLoader();
            var response_1;
            var requestJson = {
                socialMediaId: this.userSocialMediaModel.socialMediaId,
                socialMediaTypeId: this.userSocialMediaModel.socialMediaTypeId
            };
            this.http.post('/api/user/socialmedia/save', requestJson).subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.socialAsync = false;
                _this.loaderService.hideLoader();
            }, function () {
                if (response_1.success) {
                    _this.socialAsync = false;
                    _this.loaderService.hideLoader();
                    _this.msgData.push(response_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.resetSocialMedia();
                    _this.reloadSocialMediaData();
                }
                else {
                    _this.socialAsync = false;
                    _this.loaderService.hideLoader();
                    _this.validationMsgArray.push(response_1.errorMessage);
                    // this.isValidateForm = true;
                    response_1.errors.forEach(function (error, index) {
                        _this.validationMsgArray.push(error);
                    });
                    _this.createErrorData();
                }
            });
        }
        else if (this.userSocialMediaModel.socialMediaUUID) {
            this.updateSocialMedia();
        }
    };
    UserprofileComponent.prototype.resetSocialMedia = function () {
        this.userSocialMediaModel = new UserSocialMediaModel();
    };
    UserprofileComponent.prototype.onSocialRowSelect = function (data) {
        this.socialDisableFlag = true;
        this.selectedSocialRecords = data;
        this.userSocialMediaModel.socialMediaId = this.selectedSocialRecords.socialMediaId;
        this.userSocialMediaModel.socialMediaTypeId = this.selectedSocialRecords.socialMediaTypeId;
        this.userSocialMediaModel.socialMediaUUID = this.selectedSocialRecords.socialMediaUUID;
        this.socialLabel = 'Update';
        this.socialIcon = 'fa fa-pencil';
    };
    UserprofileComponent.prototype.updateSocialMedia = function () {
        this.validateFormFields(4);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.socialMediaUpdate();
        }
    };
    UserprofileComponent.prototype.socialMediaUpdate = function () {
        var _this = this;
        this.socialAsync = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var socialResponse;
        var requestJson = this.userSocialMediaModel;
        this.http.post('/api/user/socialmedia/update', requestJson).subscribe(function (res) {
            socialResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.socialAsync = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (socialResponse.success) {
                _this.socialAsync = false;
                _this.loaderService.hideLoader();
                _this.socialDisableFlag = false;
                _this.msgData.push(socialResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.resetSocialMedia();
                _this.reloadSocialMediaData();
                _this.socialLabel = 'Save';
                _this.socialIcon = 'fa fa-save';
            }
            else {
                _this.socialAsync = false;
                _this.loaderService.hideLoader();
                _this.validationMsgArray.push(socialResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.removeSocialMedia = function (row) {
        var _this = this;
        var socialResponse;
        this.msgData = [];
        var socialMediaUUID = row.socialMediaUUID;
        this.http["delete"]('/api/user/socialmedia/delete?socialMediaUUID=' + socialMediaUUID)
            .subscribe(function (res) {
            socialResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (socialResponse.success) {
                _this.socialDisableFlag = false;
                _this.msgData.push(socialResponse.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.resetSocialMedia();
                _this.reloadSocialMediaData();
                _this.socialLabel = 'Save';
                _this.socialIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(socialResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.reloadSocialMediaData = function () {
        var _this = this;
        var socialMediaData;
        this.http.get('/api/user/socialMedia/findSocialMediaDetails').subscribe(function (res) {
            socialMediaData = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (socialMediaData.success) {
                _this.userSocialMediaData = socialMediaData.response;
            }
        });
    };
    UserprofileComponent.prototype.onCountrySelect = function (data) {
        if (data.countryId) {
            this.getStateData(data.countryId);
        }
    };
    UserprofileComponent.prototype.getStateData = function (countryId) {
        var _this = this;
        var stateResponse;
        this.http
            .get('/api/user/state/findByCountryId?countryId=' + countryId)
            .subscribe(function (response) {
            stateResponse = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.stateData = stateResponse.response;
        });
    };
    UserprofileComponent.prototype.addAddress = function () {
        this.validateFormFields(5);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.saveAddress();
        }
    };
    UserprofileComponent.prototype.saveAddress = function () {
        var _this = this;
        if (!this.userAddressModel.addressUUID ||
            this.userAddressModel.addressUUID == '') {
            this.addressAsync = true;
            this.msgData = [];
            this.loaderService.showLoader();
            var addressresp_1;
            var requestJson = {
                addressLabel: this.userAddressModel.addressLabel,
                address1: this.userAddressModel.address1,
                address2: this.userAddressModel.address2,
                address3: this.userAddressModel.address3,
                countryId: this.userAddressModel.countryId,
                stateId: this.userAddressModel.stateId,
                cityName: this.userAddressModel.cityName,
                zipCode: this.userAddressModel.zipCode
            };
            this.http.post('/api/user/personaddress/save', requestJson).subscribe(function (res) {
                addressresp_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.addressAsync = false;
                _this.loaderService.hideLoader();
            }, function () {
                if (addressresp_1.success) {
                    _this.addressAsync = false;
                    _this.loaderService.hideLoader();
                    _this.msgData.push(addressresp_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.resetAddress();
                    _this.reloadAddressData();
                }
                else {
                    _this.addressAsync = false;
                    _this.loaderService.hideLoader();
                    _this.validationMsgArray.push(addressresp_1.errorMessage);
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }
            });
        }
        else if (this.userAddressModel.addressUUID) {
            this.updateAddress();
        }
    };
    UserprofileComponent.prototype.resetAddress = function () {
        this.userAddressModel = new UserAddressModel();
    };
    UserprofileComponent.prototype.onAddressRowSelect = function (data) {
        this.addressDisableFlag = true;
        this.selectedAddressRecords = data;
        this.userAddressModel.addressLabel = this.selectedAddressRecords.addressLabel;
        this.userAddressModel.address1 = this.selectedAddressRecords.address1;
        this.userAddressModel.address2 = this.selectedAddressRecords.address2;
        this.userAddressModel.address3 = this.selectedAddressRecords.address3;
        this.userAddressModel.countryId = this.selectedAddressRecords.countryId;
        this.userAddressModel.stateId = this.selectedAddressRecords.stateId;
        this.userAddressModel.cityName = this.selectedAddressRecords.cityName;
        this.userAddressModel.zipCode = this.selectedAddressRecords.zipCode;
        this.userAddressModel.addressUUID = this.selectedAddressRecords.addressUUID;
        this.getStateData(this.userAddressModel.countryId);
        this.addressLabel = 'Update';
        this.addressIcon = 'fa fa-pencil';
    };
    UserprofileComponent.prototype.updateAddress = function () {
        this.validateFormFields(5);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.addressUpdate();
        }
    };
    UserprofileComponent.prototype.addressUpdate = function () {
        var _this = this;
        this.addressAsync = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var addressData;
        var requestJson = this.userAddressModel;
        this.http.post('/api/user/personaddress/update', requestJson).subscribe(function (res) {
            addressData = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.addressAsync = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (addressData.success) {
                _this.addressAsync = false;
                _this.loaderService.hideLoader();
                _this.addressDisableFlag = false;
                _this.msgData.push(addressData.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.resetAddress();
                _this.reloadAddressData();
                _this.addressLabel = 'Save';
                _this.addressIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(addressData.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.addressAsync = false;
                _this.loaderService.hideLoader();
            }
        });
    };
    UserprofileComponent.prototype.removeAddress = function (row) {
        var _this = this;
        var addressResponse;
        this.msgData = [];
        var addressUUID = row.addressUUID;
        this.http["delete"]('/api/user/personaddress/delete?addressUUID=' + addressUUID)
            .subscribe(function (res) {
            addressResponse = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (addressResponse.success) {
                _this.addressDisableFlag = false;
                _this.msgData.push(addressResponse.successMessage);
                _this._notificationService.showWarningData(_this.msgData);
                _this.resetAddress();
                _this.reloadAddressData();
                _this.addressLabel = 'Save';
                _this.addressIcon = 'fa fa-save';
            }
            else {
                _this.validationMsgArray.push(addressResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserprofileComponent.prototype.reloadAddressData = function () {
        var _this = this;
        var addressData;
        this.http.get('/api/user/personaddress/findPersonAddressDetails').subscribe(function (res) {
            addressData = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (addressData.success) {
                _this.userAddressData = addressData.response;
            }
        });
    };
    return UserprofileComponent;
}());
UserprofileComponent = __decorate([
    core_1.Component({
        selector: 'userprofile',
        template: "\n  <amexio-row>\n    <amexio-column [size]=\"12\">\n        <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n        <amexio-tab-view>\n            <amexio-tab title=\"My Profile\" [active]=\"true\" [icon]=\"'fa fa-user'\">\n                <amexio-row>\n                    <amexio-column [size]=\"12\">\n                        <amexio-card [header]=\"true\" [footer]=\"true\" [body-height]=\"73\" [footer-align]=\"'right'\">\n                            <amexio-header>\n                                My Profile\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-row>\n                                    <amexio-column [size]=\"1\">\n                                        <amexio-dropdown [(ngModel)]=\"userProfileModel.salutationId\" [place-holder]=\"'Select Title'\" name=\"userProfileModel.salutationId\"\n                                            [data-reader]=\"'response'\" [field-label]=\"'Title'\" [http-url]=\"'/api/user/salutationQuery/findAll'\"\n                                            [http-method]=\"'get'\" [display-field]=\"'label'\" [value-field]=\"'salutationId'\"></amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"4\">\n                                        <amexio-text-input [field-label]=\"'First Name'\" name=\"userProfileModel.firstName\" [place-holder]=\"'Enter First Name'\" [icon-feedback]=\"true\"\n                                            [allow-blank]=\"false\" [error-msg]=\"'Please Enter First Name'\" [(ngModel)]=\"userProfileModel.firstName\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"3\">\n                                        <amexio-text-input [field-label]=\"'Middle Name'\" name=\"userProfileModel.middleName\" [place-holder]=\"'Enter Middle Name'\"\n                                            [icon-feedback]=\"true\" [allow-blank]=\"false\" [error-msg]=\"'Please Enter Middle Name'\"\n                                            [(ngModel)]=\"userProfileModel.middleName\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"4\">\n                                        <amexio-text-input [field-label]=\"'Last Name'\" name=\"userProfileModel.lastName\" [place-holder]=\"'Enter Last Name'\" [icon-feedback]=\"true\"\n                                            [allow-blank]=\"false\" [error-msg]=\"'Please Enter Last Name'\" [(ngModel)]=\"userProfileModel.lastName\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                </amexio-row>\n                                <amexio-row>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-radio-group [field-label]=\"'Gender'\" name=\"Gender\" [data-reader]=\"'response'\" [display-field]=\"'label'\" [value-field]=\"'genderId'\"\n                                            [http-url]=\"'/api/user/genderQuery/findAll'\" [http-method]=\"'get'\" [default-value]=\"userProfileModel.genderId\"\n                                            [horizontal]=\"true\" (onSelection)=\"setSelectedGender($event)\">\n                                        </amexio-radio-group>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-date-time-picker [field-label]=\"'DOB'\" [time-picker]=\"false\" [date-picker]=\"true\" [(ngModel)]=\"userProfileModel.dateOfBirth\">\n                                        </amexio-date-time-picker>\n                                    </amexio-column>\n                                </amexio-row>\n                                <amexio-column [size]=\"3\">\n                                    <ng-container *ngIf=\"!personIdFlag\">\n                                        <amexio-text-input [field-label]=\"'personId'\" name=\"userProfileModel.personUUID\" [place-holder]=\"''\" [icon-feedback]=\"true\"\n                                            [(ngModel)]=\"userProfileModel.personUUID\" [disabled]=\"personIdFlag\">\n                                        </amexio-text-input>\n                                    </ng-container>\n                                </amexio-column>\n                            </amexio-body>\n                            <amexio-action>                               \n                                <amexio-button [label]=\"'Cancel'\" [icon]=\"'fa fa-close'\" [type]=\"'secondary'\" [tooltip]=\"'Cancel'\" [size]=\"'default'\" (onClick)=\"cancelClick()\">\n                                </amexio-button>\n                                <amexio-button [label]=\"'Update'\" [icon]=\"'fa fa-pencil'\" [type]=\"'primary'\" [tooltip]=\"'Update'\" [loading]=\"updateFlag\" [size]=\"'default'\" (onClick)=\"updateClick()\">\n                                </amexio-button>\n                            </amexio-action>\n                        </amexio-card>\n                    </amexio-column>\n                </amexio-row>\n            </amexio-tab>\n\n\n\n            <amexio-tab title=\"Email\" [icon]=\"'fa fa-envelope'\">\n                <amexio-row>\n                    <amexio-column [size]=\"3\">\n                        <amexio-card [header]=\"true\" [footer]=\"true\" [footer-align]=\"'right'\" [body-height]=\"58\">\n                            <amexio-header>\n                                Emails\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-row>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-dropdown [(ngModel)]=\"UserEmailModel.commLabelId\" [place-holder]=\"'Select Email Type'\" name=\"UserEmailModel.commLabelId\"\n                                            [data-reader]=\"'response'\" [field-label]=\"'Type'\" [allow-blank]=\"false\" [error-msg]=\"'Please Select Email Type'\"\n                                            [http-url]=\"'/api/user/communicationLabelQuery/findAll'\" [http-method]=\"'get'\" [display-field]=\"'label'\"\n                                            [value-field]=\"'commLabelId'\">\n                                        </amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-email-input [field-label]=\"'Email Id'\" name=\"UserEmailModel.emailId\" [place-holder]=\"'Enter Email Id'\" [allow-blank]=\"false\"\n                                            [error-msg]=\"'Please Enter Valid Email'\" [icon-feedback]=\"true\" [(ngModel)]=\"UserEmailModel.emailId\">\n                                        </amexio-email-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <ng-container *ngIf=\"!emailUUIDflag\">\n                                            <amexio-text-input [field-label]=\"'EmailId'\" name=\"UserEmailModel.emailUUID\" [place-holder]=\"''\" [icon-feedback]=\"true\" [(ngModel)]=\"UserEmailModel.emailUUID\"\n                                                [disabled]=\"emailUUIDflag\">\n                                            </amexio-text-input>\n                                        </ng-container>\n                                    </amexio-column>                                       \n                                </amexio-row>\n                            </amexio-body>\n                            <amexio-action>\n                                <amexio-button\n                                [label]=\"emailLabel\"\n                                [loading]=\"emailAsync\"\n                                [type]=\"'primary'\"\n                                [tooltip]=\"'Save'\"\n                                [icon]=\"emailIcon\"\n                                [size]=\"'default'\" \n                                (onClick)=\"addEmail()\">\n                                </amexio-button>\n                            </amexio-action>\n\n                        </amexio-card>\n                    </amexio-column>\n\n                    <amexio-column [size]=\"9\">\n                        <amexio-card [header]=\"true\" [footer]=\"false\" [body-height]=\"67\" [footer-align]=\"'right'\">\n                            <amexio-header>\n                                Email Details\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-datagrid title=\"\" [page-size]=\"10\" [data]=\"userEmailData\" [enable-data-filter]=\"false\" (rowSelect)=\"onEmailsRowSelect($event)\">\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'label'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Type'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'emailId'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Email Id'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'emailUUID'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'emailUUID'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'commLabelId'\" [data-type]=\"'number'\" [hidden]=\"true\" [text]=\"'emailTypeId'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"''\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Action'\">\n                                        <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                            <span>\n                                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Remove'\" (onClick)=\"removeEmail(row)\">\n                                                </amexio-image>\n                                            </span>\n                                        </ng-template>\n                                    </amexio-data-table-column>\n                                </amexio-datagrid>\n                            </amexio-body>\n                        </amexio-card>\n                    </amexio-column>\n                </amexio-row>\n            </amexio-tab>\n\n\n\n            <amexio-tab title=\"Phone\" [icon]=\"'fa fa-phone-square'\">\n                <amexio-row>\n                    <amexio-column [size]=\"3\">\n                        <amexio-card [header]=\"true\" [footer]=\"true\" [body-height]=\"58\">\n                            <amexio-header>\n                                Contact Details\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-row>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-dropdown [(ngModel)]=\"userPhoneModel.commLabelId\" [place-holder]=\"'Select Phone Number Type'\" name=\"userPhoneModel.commLabelId\"\n                                            [data-reader]=\"'response'\" [field-label]=\"'Type'\" [allow-blank]=\"false\" [error-msg]=\"'Please Select PhoneNumber Type'\"\n                                            [http-url]=\"'/api/user/communicationLabelQuery/findAll'\" [http-method]=\"'get'\" [display-field]=\"'label'\"\n                                            [value-field]=\"'commLabelId'\">\n                                        </amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-number-input [field-label]=\"'Number'\" name=\"userPhoneModel.phoneNumber\" [place-holder]=\"'Enter Phone Number'\" [allow-blank]=\"false\"\n                                            [error-msg]=\"'Enter valid  Phone Number'\"\n                                            [icon-feedback]=\"true\" [(ngModel)]=\"userPhoneModel.phoneNumber\">\n                                        </amexio-number-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <ng-container *ngIf=\"!phoneUUIDflag\">\n                                            <amexio-text-input [field-label]=\"'phoneId'\" name=\"userPhoneModel.phoneUUID\" [place-holder]=\"''\" [icon-feedback]=\"true\" [(ngModel)]=\"userPhoneModel.phoneUUID\"\n                                                [disabled]=\"phoneUUIDflag\">\n                                            </amexio-text-input>\n                                        </ng-container>\n                                    </amexio-column>\n                                </amexio-row>\n                            </amexio-body>\n                            <amexio-action>\n                            <amexio-button\n                            [label]=\"phoneLabel\"\n                            [loading]=\"phoneAsync\"\n                            [type]=\"'primary'\"\n                            [tooltip]=\"'Save'\"\n                            [icon]=\"phoneIcon\"\n                            [size]=\"'default'\" \n                            (onClick)=\"addContact()\">\n                            </amexio-button>\n                        </amexio-action>\n\n                        </amexio-card>\n                    </amexio-column>\n\n                    <amexio-column [size]=\"9\">\n                        <amexio-card [header]=\"true\" [footer]=\"false\" [body-height]=\"67\">\n                            <amexio-header>\n                                Phone Details\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-datagrid title=\"\" [page-size]=\"10\" [data]=\"userPhoneData\" [enable-data-filter]=\"false\" (rowSelect)=\"onPhonesRowSelect($event)\">\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'label'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Type'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'phoneNumber'\" [data-type]=\"'number'\" [hidden]=\"false\" [text]=\"'Number'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'phoneUUID'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'emailUUID'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'commLabelId'\" [data-type]=\"'number'\" [hidden]=\"true\" [text]=\"'Phone Number Type Id'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"''\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Action'\">\n                                        <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                            <span>\n                                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Remove'\" (onClick)=\"removeContact(row)\">\n                                                </amexio-image>\n                                            </span>\n                                        </ng-template>\n                                    </amexio-data-table-column>\n                                </amexio-datagrid>\n                            </amexio-body>\n                        </amexio-card>\n                    </amexio-column>\n                </amexio-row>\n            </amexio-tab>\n\n\n            <amexio-tab title=\"Address\" [icon]=\"'fa fa-address-card'\">\n                <amexio-row>\n                    <amexio-column [size]=\"3\">\n                        <amexio-card [header]=\"true\" [footer]=\"true\" [body-height]=\"58\">\n                            <amexio-header>\n                                Address\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-row>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-text-input name=\"userAddressModel.addressLabel\" [place-holder]=\"'Enter Address Label'\" [allow-blank]=\"false\" [icon-feedback]=\"true\"\n                                            [error-msg]=\"'Please Enter Address Label'\" [has-label]=\"false\" [(ngModel)]=\"userAddressModel.addressLabel\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-text-input name=\"userAddressModel.address1\" [place-holder]=\"'Enter Address Line1'\" [allow-blank]=\"false\" [icon-feedback]=\"true\"\n                                            [has-label]=\"false\" [error-msg]=\"'Please Enter Address Line1'\" [(ngModel)]=\"userAddressModel.address1\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-text-input [field-label]=\"'Address Line2'\" name=\"userAddressModel.address2\" [place-holder]=\"'Enter Address Line2'\"\n                                            [allow-blank]=\"true\" [icon-feedback]=\"true\" [has-label]=\"false\" [(ngModel)]=\"userAddressModel.address2\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-text-input [field-label]=\"'Address Line3'\" name=\"userAddressModel.address3\" [place-holder]=\"'Enter Address Line3'\"\n                                            [allow-blank]=\"true\" [icon-feedback]=\"true\" [has-label]=\"false\" [(ngModel)]=\"userAddressModel.address3\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-dropdown [place-holder]=\"'Select Country'\" name=\"userAddressModel.countryId\" [data-reader]=\"'response'\" [field-label]=\"''\"\n                                            [search]=\"true\" [has-label]=\"false\" [allow-blank]=\"false\" [error-msg]=\"'Please Select Country'\"\n                                            [http-url]=\"'/api/user/country/findAll'\" [http-method]=\"'get'\" [display-field]=\"'countryName'\"\n                                            [value-field]=\"'countryId'\" [(ngModel)]=\"userAddressModel.countryId\" (onSingleSelect)=\"onCountrySelect($event)\">\n                                        </amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-dropdown [place-holder]=\"'Select State'\" name=\"userAddressModel.stateId\" [field-label]=\"''\" [allow-blank]=\"false\"\n                                            [search]=\"true\" [error-msg]=\"'Please Select State'\" [display-field]=\"'stateName'\"\n                                            [value-field]=\"'stateId'\" [data]=\"stateData\" [(ngModel)]=\"userAddressModel.stateId\">\n                                        </amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-text-input [field-label]=\"'City'\" name=\"userAddressModel.cityName\" [place-holder]=\"'Enter city'\" [allow-blank]=\"false\"\n                                            [icon-feedback]=\"true\" [error-msg]=\"'Please Enter City'\" [has-label]=\"false\" [(ngModel)]=\"userAddressModel.cityName\">\n                                        </amexio-text-input>\n\n                                    </amexio-column>\n                                    <amexio-column [size]=\"6\">\n                                        <amexio-number-input [field-label]=\"'ZipCode'\" name=\"userAddressModel.zipCode\" [place-holder]=\"'Enter ZipCode'\" [icon-feedback]=\"true\"\n                                            [allow-blank]=\"false\" [has-label]=\"false\"\n                                             [error-msg]=\"'Please Enter valid ZipCode'\"\n                                            [(ngModel)]=\"userAddressModel.zipCode\">\n                                        </amexio-number-input>\n                                    </amexio-column>\n\n                                    <amexio-column [size]=\"12\">\n\n                                        <ng-container *ngIf=\"!addressUUIDflag\">\n                                            <amexio-text-input [field-label]=\"'addressId'\" name=\"userAddressModel.addressUUID\" [place-holder]=\"''\" [icon-feedback]=\"true\"\n                                                [has-label]=\"false\" [(ngModel)]=\"userAddressModel.addressUUID\" [disabled]=\"addressUUIDflag\">\n                                            </amexio-text-input>\n                                        </ng-container>\n                                    </amexio-column>\n                                   \n                                </amexio-row>\n                            </amexio-body>\n                            <amexio-action>\n                            <amexio-button\n                            [label]=\"addressLabel\"\n                            [loading]=\"addressAsync\"\n                            [type]=\"'primary'\"\n                            [tooltip]=\"'Save'\"\n                            [icon]=\"addressIcon\"\n                            [size]=\"'default'\" \n                            (onClick)=\"addAddress()\">\n                            </amexio-button>\n                        </amexio-action>\n                        </amexio-card>\n                    </amexio-column>\n\n                    <amexio-column [size]=\"9\">\n                        <amexio-card [header]=\"true\" [footer]=\"false\" [body-height]=\"67\" [footer-align]=\"'right'\">\n                            <amexio-header>\n                                Address Details\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-datagrid title=\"\" [page-size]=\"10\" [data]=\"userAddressData\" [enable-data-filter]=\"false\" (rowSelect)=\"onAddressRowSelect($event)\">\n                                    <amexio-data-table-column [data-index]=\"'addressLabel'\" [width]=\"15\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"' Location'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [data-index]=\"'address1'\" [width]=\"20\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"' Building/Street'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'address2'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Address Line 2'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'address3'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Address Line 3'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'cityName'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'City'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'stateName'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'State'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'countryName'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Country'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'countryId'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Country Id'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'stateId'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'State Id'\">\n                                    </amexio-data-table-column>                                    \n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'zipCode'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Zipcode'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"'addressUUID'\" [data-type]=\"'number'\" [hidden]=\"true\" [text]=\"'addressUUID'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"''\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Action'\">\n                                        <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                            <span>\n                                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Remove'\" (onClick)=\"removeAddress(row)\">\n                                                </amexio-image>\n\n                                            </span>\n                                        </ng-template>\n                                    </amexio-data-table-column>\n                                </amexio-datagrid>\n                            </amexio-body>\n                        </amexio-card>\n                    </amexio-column>\n                </amexio-row>\n            </amexio-tab>\n\n\n            <amexio-tab title=\"Social Media\" [icon]=\"'fa fa-share-square'\">\n                <amexio-row>\n                    <amexio-column [size]=\"3\">\n                        <amexio-card [header]=\"true\" [footer]=\"true\" [body-height]=\"58\">\n                            <amexio-header>\n                                Social media\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-row>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-dropdown [(ngModel)]=\"userSocialMediaModel.socialMediaTypeId\" [place-holder]=\"'Select Social Media Type'\" name=\"userSocialMediaModel.socialMediaTypeId\"\n                                            [data-reader]=\"'response'\" [field-label]=\"'Type'\" [allow-blank]=\"false\" [error-msg]=\"'Please Select Social Media Type'\"\n                                            [http-url]=\"'/api/user/socialMediaTypeQuery/findAll'\" [http-method]=\"'get'\" [display-field]=\"'label'\"\n                                            [value-field]=\"'socialMediaTypeId'\">\n                                        </amexio-dropdown>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <amexio-text-input [field-label]=\"'Social Media'\" name=\".userSocialMediaModel.socialMediaId\" [place-holder]=\"'Enter Social Media'\"\n                                            [allow-blank]=\"false\" [error-msg]=\"'Enter Social Media ID'\" [icon-feedback]=\"true\"\n                                            [(ngModel)]=\"userSocialMediaModel.socialMediaId\">\n                                        </amexio-text-input>\n                                    </amexio-column>\n                                    <amexio-column [size]=\"12\">\n                                        <ng-container *ngIf=\"!socialMediaUUIDflag\">\n                                            <amexio-text-input [field-label]=\"'socialMediaId'\" name=\"userSocialMediaModel.socialMediaUUID\" [place-holder]=\"''\" [icon-feedback]=\"true\"\n                                                [(ngModel)]=\"userSocialMediaModel.socialMediaUUID\" [disabled]=\"socialMediaUUIDflag\">\n                                            </amexio-text-input>\n                                        </ng-container>\n                                    </amexio-column>\n                                </amexio-row>\n                            </amexio-body>\n                            <amexio-action>\n                            <amexio-button\n                            [label]=\"socialLabel\"\n                            [loading]=\"socialAsync\"\n                            [type]=\"'primary'\"\n                            [tooltip]=\"'Save'\"\n                            [icon]=\"socialIcon\"\n                            [size]=\"'default'\" \n                            (onClick)=\"addSocialMedia()\">\n                            </amexio-button>\n                        </amexio-action>\n                        </amexio-card>\n                    </amexio-column>\n                    <amexio-column [size]=\"9\">\n                        <amexio-card [header]=\"true\" [footer]=\"false\" [body-height]=\"67\" [footer-align]=\"'right'\">\n                            <amexio-header>\n                                Social Media Details\n                            </amexio-header>\n                            <amexio-body>\n                                <amexio-datagrid title=\"\" [page-size]=\"10\" [data]=\"userSocialMediaData\" [enable-data-filter]=\"false\" (rowSelect)=\"onSocialRowSelect($event)\">\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'label'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Type'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'socialMediaId'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Social Media'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'socialMediaUUID'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'socialMediaId'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"25\" [data-index]=\"'socialMediaTypeId'\" [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'socialMediaTypeId'\">\n                                    </amexio-data-table-column>\n                                    <amexio-data-table-column [width]=\"15\" [data-index]=\"''\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Action'\">\n                                        <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                            <span>\n                                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Remove'\" (onClick)=\"removeSocialMedia(row)\">\n                                                </amexio-image>\n\n                                            </span>\n                                        </ng-template>\n                                    </amexio-data-table-column>\n                                </amexio-datagrid>\n                            </amexio-body>\n                        </amexio-card>\n                    </amexio-column>\n                </amexio-row>\n            </amexio-tab>\n        </amexio-tab-view>\n    </amexio-column>\n    <amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\"\n        [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n        <amexio-body>\n            <ol>\n                <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n            </ol>\n        </amexio-body>\n\n        <amexio-action>\n            <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n            </amexio-button>\n        </amexio-action>\n    </amexio-dialogue>\n     <app-notification></app-notification>\n\n</amexio-row>\n   \n "
    })
], UserprofileComponent);
exports.UserprofileComponent = UserprofileComponent;
var UserProfileModel = (function () {
    function UserProfileModel() {
        this.salutationId = null;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.dateOfBirth = null;
        this.genderId = '';
        this.personUUID = '';
    }
    return UserProfileModel;
}());
exports.UserProfileModel = UserProfileModel;
var UserEmailModel = (function () {
    function UserEmailModel() {
        this.commLabelId = '';
        this.emailId = '';
        this.emailUUID = '';
    }
    return UserEmailModel;
}());
exports.UserEmailModel = UserEmailModel;
var UserPhoneModel = (function () {
    function UserPhoneModel() {
        this.commLabelId = '';
        this.phoneNumber = null;
        this.phoneUUID = '';
    }
    return UserPhoneModel;
}());
exports.UserPhoneModel = UserPhoneModel;
var UserSocialMediaModel = (function () {
    function UserSocialMediaModel() {
        this.socialMediaTypeId = '';
        this.socialMediaId = '';
        this.socialMediaUUID = '';
    }
    return UserSocialMediaModel;
}());
exports.UserSocialMediaModel = UserSocialMediaModel;
var UserAddressModel = (function () {
    function UserAddressModel() {
        this.addressLabel = '';
        this.address1 = '';
        this.address2 = '';
        this.address3 = '';
        this.countryId = '';
        this.stateId = '';
        this.cityName = '';
        this.zipCode = '';
        this.addressUUID = '';
    }
    return UserAddressModel;
}());
exports.UserAddressModel = UserAddressModel;
