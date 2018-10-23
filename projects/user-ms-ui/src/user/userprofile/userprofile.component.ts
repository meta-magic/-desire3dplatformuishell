/**
 * Created by Ashwini on 19/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'userprofile',
  template: `
  <amexio-row>
    <amexio-column [size]="12">
        <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
        <amexio-tab-view>
            <amexio-tab title="My Profile" [active]="true" [icon]="'fa fa-user'">
                <amexio-row>
                    <amexio-column [size]="12">
                        <amexio-card [header]="true" [footer]="true" [body-height]="73" [footer-align]="'right'">
                            <amexio-header>
                                My Profile
                            </amexio-header>
                            <amexio-body>
                                <amexio-row>
                                    <amexio-column [size]="1">
                                        <amexio-dropdown [(ngModel)]="userProfileModel.salutationId" [place-holder]="'Select Title'" name="userProfileModel.salutationId"
                                            [data-reader]="'response'" [field-label]="'Title'" [http-url]="'/api/user/salutationQuery/findAll'"
                                            [http-method]="'get'" [display-field]="'label'" [value-field]="'salutationId'"></amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="4">
                                        <amexio-text-input [field-label]="'First Name'" name="userProfileModel.firstName" [place-holder]="'Enter First Name'" [icon-feedback]="true"
                                            [allow-blank]="false" [error-msg]="'Please Enter First Name'" [(ngModel)]="userProfileModel.firstName">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="3">
                                        <amexio-text-input [field-label]="'Middle Name'" name="userProfileModel.middleName" [place-holder]="'Enter Middle Name'"
                                            [icon-feedback]="true" [allow-blank]="false" [error-msg]="'Please Enter Middle Name'"
                                            [(ngModel)]="userProfileModel.middleName">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="4">
                                        <amexio-text-input [field-label]="'Last Name'" name="userProfileModel.lastName" [place-holder]="'Enter Last Name'" [icon-feedback]="true"
                                            [allow-blank]="false" [error-msg]="'Please Enter Last Name'" [(ngModel)]="userProfileModel.lastName">
                                        </amexio-text-input>
                                    </amexio-column>
                                </amexio-row>
                                <amexio-row>
                                    <amexio-column [size]="6">
                                        <amexio-radio-group [field-label]="'Gender'" name="Gender" [data-reader]="'response'" [display-field]="'label'" [value-field]="'genderId'"
                                            [http-url]="'/api/user/genderQuery/findAll'" [http-method]="'get'" [default-value]="userProfileModel.genderId"
                                            [horizontal]="true" (onSelection)="setSelectedGender($event)">
                                        </amexio-radio-group>
                                    </amexio-column>
                                    <amexio-column [size]="6">
                                        <amexio-date-time-picker [field-label]="'DOB'" [time-picker]="false" [date-picker]="true" [(ngModel)]="userProfileModel.dateOfBirth">
                                        </amexio-date-time-picker>
                                    </amexio-column>
                                </amexio-row>
                                <amexio-column [size]="3">
                                    <ng-container *ngIf="!personIdFlag">
                                        <amexio-text-input [field-label]="'personId'" name="userProfileModel.personUUID" [place-holder]="''" [icon-feedback]="true"
                                            [(ngModel)]="userProfileModel.personUUID" [disabled]="personIdFlag">
                                        </amexio-text-input>
                                    </ng-container>
                                </amexio-column>
                            </amexio-body>
                            <amexio-action>                               
                                <amexio-button [label]="'Cancel'" [icon]="'fa fa-close'" [type]="'secondary'" [tooltip]="'Cancel'" [size]="'default'" (onClick)="cancelClick()">
                                </amexio-button>
                                <amexio-button [label]="'Update'" [icon]="'fa fa-pencil'" [type]="'primary'" [tooltip]="'Update'" [loading]="updateFlag" [size]="'default'" (onClick)="updateClick()">
                                </amexio-button>
                            </amexio-action>
                        </amexio-card>
                    </amexio-column>
                </amexio-row>
            </amexio-tab>



            <amexio-tab title="Email" [icon]="'fa fa-envelope'">
                <amexio-row>
                    <amexio-column [size]="3">
                        <amexio-card [header]="true" [footer]="true" [footer-align]="'right'" [body-height]="58">
                            <amexio-header>
                                Emails
                            </amexio-header>
                            <amexio-body>
                                <amexio-row>
                                    <amexio-column [size]="12">
                                        <amexio-dropdown [(ngModel)]="UserEmailModel.commLabelId" [place-holder]="'Select Email Type'" name="UserEmailModel.commLabelId"
                                            [data-reader]="'response'" [field-label]="'Type'" [allow-blank]="false" [error-msg]="'Please Select Email Type'"
                                            [http-url]="'/api/user/communicationLabelQuery/findAll'" [http-method]="'get'" [display-field]="'label'"
                                            [value-field]="'commLabelId'">
                                        </amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-email-input [field-label]="'Email Id'" name="UserEmailModel.emailId" [place-holder]="'Enter Email Id'" [allow-blank]="false"
                                            [error-msg]="'Please Enter Valid Email'" [icon-feedback]="true" [(ngModel)]="UserEmailModel.emailId">
                                        </amexio-email-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <ng-container *ngIf="!emailUUIDflag">
                                            <amexio-text-input [field-label]="'EmailId'" name="UserEmailModel.emailUUID" [place-holder]="''" [icon-feedback]="true" [(ngModel)]="UserEmailModel.emailUUID"
                                                [disabled]="emailUUIDflag">
                                            </amexio-text-input>
                                        </ng-container>
                                    </amexio-column>                                       
                                </amexio-row>
                            </amexio-body>
                            <amexio-action>
                                <amexio-button
                                [label]="emailLabel"
                                [loading]="emailAsync"
                                [type]="'primary'"
                                [tooltip]="'Save'"
                                [icon]="emailIcon"
                                [size]="'default'" 
                                (onClick)="addEmail()">
                                </amexio-button>
                            </amexio-action>

                        </amexio-card>
                    </amexio-column>

                    <amexio-column [size]="9">
                        <amexio-card [header]="true" [footer]="false" [body-height]="67" [footer-align]="'right'">
                            <amexio-header>
                                Email Details
                            </amexio-header>
                            <amexio-body>
                                <amexio-datagrid title="" [page-size]="10" [data]="userEmailData" [enable-data-filter]="false" (rowSelect)="onEmailsRowSelect($event)">
                                    <amexio-data-table-column [width]="25" [data-index]="'label'" [data-type]="'string'" [hidden]="false" [text]="'Type'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'emailId'" [data-type]="'string'" [hidden]="false" [text]="'Email Id'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'emailUUID'" [data-type]="'string'" [hidden]="true" [text]="'emailUUID'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'commLabelId'" [data-type]="'number'" [hidden]="true" [text]="'emailTypeId'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="''" [data-type]="'string'" [hidden]="false" [text]="'Action'">
                                        <ng-template #amexioBodyTmpl let-column let-row="row">
                                            <span>
                                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Remove'" (onClick)="removeEmail(row)">
                                                </amexio-image>
                                            </span>
                                        </ng-template>
                                    </amexio-data-table-column>
                                </amexio-datagrid>
                            </amexio-body>
                        </amexio-card>
                    </amexio-column>
                </amexio-row>
            </amexio-tab>



            <amexio-tab title="Phone" [icon]="'fa fa-phone-square'">
                <amexio-row>
                    <amexio-column [size]="3">
                        <amexio-card [header]="true" [footer]="true" [body-height]="58">
                            <amexio-header>
                                Contact Details
                            </amexio-header>
                            <amexio-body>
                                <amexio-row>
                                    <amexio-column [size]="12">
                                        <amexio-dropdown [(ngModel)]="userPhoneModel.commLabelId" [place-holder]="'Select Phone Number Type'" name="userPhoneModel.commLabelId"
                                            [data-reader]="'response'" [field-label]="'Type'" [allow-blank]="false" [error-msg]="'Please Select PhoneNumber Type'"
                                            [http-url]="'/api/user/communicationLabelQuery/findAll'" [http-method]="'get'" [display-field]="'label'"
                                            [value-field]="'commLabelId'">
                                        </amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-number-input [field-label]="'Number'" name="userPhoneModel.phoneNumber" [place-holder]="'Enter Phone Number'" [allow-blank]="false"
                                            [error-msg]="'Enter valid  Phone Number'"
                                            [icon-feedback]="true" [(ngModel)]="userPhoneModel.phoneNumber">
                                        </amexio-number-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <ng-container *ngIf="!phoneUUIDflag">
                                            <amexio-text-input [field-label]="'phoneId'" name="userPhoneModel.phoneUUID" [place-holder]="''" [icon-feedback]="true" [(ngModel)]="userPhoneModel.phoneUUID"
                                                [disabled]="phoneUUIDflag">
                                            </amexio-text-input>
                                        </ng-container>
                                    </amexio-column>
                                </amexio-row>
                            </amexio-body>
                            <amexio-action>
                            <amexio-button
                            [label]="phoneLabel"
                            [loading]="phoneAsync"
                            [type]="'primary'"
                            [tooltip]="'Save'"
                            [icon]="phoneIcon"
                            [size]="'default'" 
                            (onClick)="addContact()">
                            </amexio-button>
                        </amexio-action>

                        </amexio-card>
                    </amexio-column>

                    <amexio-column [size]="9">
                        <amexio-card [header]="true" [footer]="false" [body-height]="67">
                            <amexio-header>
                                Phone Details
                            </amexio-header>
                            <amexio-body>
                                <amexio-datagrid title="" [page-size]="10" [data]="userPhoneData" [enable-data-filter]="false" (rowSelect)="onPhonesRowSelect($event)">
                                    <amexio-data-table-column [width]="25" [data-index]="'label'" [data-type]="'string'" [hidden]="false" [text]="'Type'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'phoneNumber'" [data-type]="'number'" [hidden]="false" [text]="'Number'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'phoneUUID'" [data-type]="'string'" [hidden]="true" [text]="'emailUUID'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'commLabelId'" [data-type]="'number'" [hidden]="true" [text]="'Phone Number Type Id'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="''" [data-type]="'string'" [hidden]="false" [text]="'Action'">
                                        <ng-template #amexioBodyTmpl let-column let-row="row">
                                            <span>
                                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Remove'" (onClick)="removeContact(row)">
                                                </amexio-image>
                                            </span>
                                        </ng-template>
                                    </amexio-data-table-column>
                                </amexio-datagrid>
                            </amexio-body>
                        </amexio-card>
                    </amexio-column>
                </amexio-row>
            </amexio-tab>


            <amexio-tab title="Address" [icon]="'fa fa-address-card'">
                <amexio-row>
                    <amexio-column [size]="3">
                        <amexio-card [header]="true" [footer]="true" [body-height]="58">
                            <amexio-header>
                                Address
                            </amexio-header>
                            <amexio-body>
                                <amexio-row>
                                    <amexio-column [size]="12">
                                        <amexio-text-input name="userAddressModel.addressLabel" [place-holder]="'Enter Address Label'" [allow-blank]="false" [icon-feedback]="true"
                                            [error-msg]="'Please Enter Address Label'" [has-label]="false" [(ngModel)]="userAddressModel.addressLabel">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-text-input name="userAddressModel.address1" [place-holder]="'Enter Address Line1'" [allow-blank]="false" [icon-feedback]="true"
                                            [has-label]="false" [error-msg]="'Please Enter Address Line1'" [(ngModel)]="userAddressModel.address1">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-text-input [field-label]="'Address Line2'" name="userAddressModel.address2" [place-holder]="'Enter Address Line2'"
                                            [allow-blank]="true" [icon-feedback]="true" [has-label]="false" [(ngModel)]="userAddressModel.address2">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-text-input [field-label]="'Address Line3'" name="userAddressModel.address3" [place-holder]="'Enter Address Line3'"
                                            [allow-blank]="true" [icon-feedback]="true" [has-label]="false" [(ngModel)]="userAddressModel.address3">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="6">
                                        <amexio-dropdown [place-holder]="'Select Country'" name="userAddressModel.countryId" [data-reader]="'response'" [field-label]="''"
                                            [search]="true" [has-label]="false" [allow-blank]="false" [error-msg]="'Please Select Country'"
                                            [http-url]="'/api/user/country/findAll'" [http-method]="'get'" [display-field]="'countryName'"
                                            [value-field]="'countryId'" [(ngModel)]="userAddressModel.countryId" (onSingleSelect)="onCountrySelect($event)">
                                        </amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="6">
                                        <amexio-dropdown [place-holder]="'Select State'" name="userAddressModel.stateId" [field-label]="''" [allow-blank]="false"
                                            [search]="true" [error-msg]="'Please Select State'" [display-field]="'stateName'"
                                            [value-field]="'stateId'" [data]="stateData" [(ngModel)]="userAddressModel.stateId">
                                        </amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="6">
                                        <amexio-text-input [field-label]="'City'" name="userAddressModel.cityName" [place-holder]="'Enter city'" [allow-blank]="false"
                                            [icon-feedback]="true" [error-msg]="'Please Enter City'" [has-label]="false" [(ngModel)]="userAddressModel.cityName">
                                        </amexio-text-input>

                                    </amexio-column>
                                    <amexio-column [size]="6">
                                        <amexio-number-input [field-label]="'ZipCode'" name="userAddressModel.zipCode" [place-holder]="'Enter ZipCode'" [icon-feedback]="true"
                                            [allow-blank]="false" [has-label]="false"
                                             [error-msg]="'Please Enter valid ZipCode'"
                                            [(ngModel)]="userAddressModel.zipCode">
                                        </amexio-number-input>
                                    </amexio-column>

                                    <amexio-column [size]="12">

                                        <ng-container *ngIf="!addressUUIDflag">
                                            <amexio-text-input [field-label]="'addressId'" name="userAddressModel.addressUUID" [place-holder]="''" [icon-feedback]="true"
                                                [has-label]="false" [(ngModel)]="userAddressModel.addressUUID" [disabled]="addressUUIDflag">
                                            </amexio-text-input>
                                        </ng-container>
                                    </amexio-column>
                                   
                                </amexio-row>
                            </amexio-body>
                            <amexio-action>
                            <amexio-button
                            [label]="addressLabel"
                            [loading]="addressAsync"
                            [type]="'primary'"
                            [tooltip]="'Save'"
                            [icon]="addressIcon"
                            [size]="'default'" 
                            (onClick)="addAddress()">
                            </amexio-button>
                        </amexio-action>
                        </amexio-card>
                    </amexio-column>

                    <amexio-column [size]="9">
                        <amexio-card [header]="true" [footer]="false" [body-height]="67" [footer-align]="'right'">
                            <amexio-header>
                                Address Details
                            </amexio-header>
                            <amexio-body>
                                <amexio-datagrid title="" [page-size]="10" [data]="userAddressData" [enable-data-filter]="false" (rowSelect)="onAddressRowSelect($event)">
                                    <amexio-data-table-column [data-index]="'addressLabel'" [width]="15" [data-type]="'string'" [hidden]="false" [text]="' Location'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [data-index]="'address1'" [width]="20" [data-type]="'string'" [hidden]="false" [text]="' Building/Street'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'address2'" [data-type]="'string'" [hidden]="true" [text]="'Address Line 2'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'address3'" [data-type]="'string'" [hidden]="true" [text]="'Address Line 3'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'cityName'" [data-type]="'string'" [hidden]="false" [text]="'City'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'stateName'" [data-type]="'string'" [hidden]="false" [text]="'State'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'countryName'" [data-type]="'string'" [hidden]="false" [text]="'Country'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'countryId'" [data-type]="'string'" [hidden]="true" [text]="'Country Id'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'stateId'" [data-type]="'string'" [hidden]="true" [text]="'State Id'">
                                    </amexio-data-table-column>                                    
                                    <amexio-data-table-column [width]="15" [data-index]="'zipCode'" [data-type]="'string'" [hidden]="false" [text]="'Zipcode'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="'addressUUID'" [data-type]="'number'" [hidden]="true" [text]="'addressUUID'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="''" [data-type]="'string'" [hidden]="false" [text]="'Action'">
                                        <ng-template #amexioBodyTmpl let-column let-row="row">
                                            <span>
                                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Remove'" (onClick)="removeAddress(row)">
                                                </amexio-image>

                                            </span>
                                        </ng-template>
                                    </amexio-data-table-column>
                                </amexio-datagrid>
                            </amexio-body>
                        </amexio-card>
                    </amexio-column>
                </amexio-row>
            </amexio-tab>


            <amexio-tab title="Social Media" [icon]="'fa fa-share-square'">
                <amexio-row>
                    <amexio-column [size]="3">
                        <amexio-card [header]="true" [footer]="true" [body-height]="58">
                            <amexio-header>
                                Social media
                            </amexio-header>
                            <amexio-body>
                                <amexio-row>
                                    <amexio-column [size]="12">
                                        <amexio-dropdown [(ngModel)]="userSocialMediaModel.socialMediaTypeId" [place-holder]="'Select Social Media Type'" name="userSocialMediaModel.socialMediaTypeId"
                                            [data-reader]="'response'" [field-label]="'Type'" [allow-blank]="false" [error-msg]="'Please Select Social Media Type'"
                                            [http-url]="'/api/user/socialMediaTypeQuery/findAll'" [http-method]="'get'" [display-field]="'label'"
                                            [value-field]="'socialMediaTypeId'">
                                        </amexio-dropdown>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <amexio-text-input [field-label]="'Social Media'" name=".userSocialMediaModel.socialMediaId" [place-holder]="'Enter Social Media'"
                                            [allow-blank]="false" [error-msg]="'Enter Social Media ID'" [icon-feedback]="true"
                                            [(ngModel)]="userSocialMediaModel.socialMediaId">
                                        </amexio-text-input>
                                    </amexio-column>
                                    <amexio-column [size]="12">
                                        <ng-container *ngIf="!socialMediaUUIDflag">
                                            <amexio-text-input [field-label]="'socialMediaId'" name="userSocialMediaModel.socialMediaUUID" [place-holder]="''" [icon-feedback]="true"
                                                [(ngModel)]="userSocialMediaModel.socialMediaUUID" [disabled]="socialMediaUUIDflag">
                                            </amexio-text-input>
                                        </ng-container>
                                    </amexio-column>
                                </amexio-row>
                            </amexio-body>
                            <amexio-action>
                            <amexio-button
                            [label]="socialLabel"
                            [loading]="socialAsync"
                            [type]="'primary'"
                            [tooltip]="'Save'"
                            [icon]="socialIcon"
                            [size]="'default'" 
                            (onClick)="addSocialMedia()">
                            </amexio-button>
                        </amexio-action>
                        </amexio-card>
                    </amexio-column>
                    <amexio-column [size]="9">
                        <amexio-card [header]="true" [footer]="false" [body-height]="67" [footer-align]="'right'">
                            <amexio-header>
                                Social Media Details
                            </amexio-header>
                            <amexio-body>
                                <amexio-datagrid title="" [page-size]="10" [data]="userSocialMediaData" [enable-data-filter]="false" (rowSelect)="onSocialRowSelect($event)">
                                    <amexio-data-table-column [width]="25" [data-index]="'label'" [data-type]="'string'" [hidden]="false" [text]="'Type'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'socialMediaId'" [data-type]="'string'" [hidden]="false" [text]="'Social Media'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'socialMediaUUID'" [data-type]="'string'" [hidden]="true" [text]="'socialMediaId'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="25" [data-index]="'socialMediaTypeId'" [data-type]="'string'" [hidden]="true" [text]="'socialMediaTypeId'">
                                    </amexio-data-table-column>
                                    <amexio-data-table-column [width]="15" [data-index]="''" [data-type]="'string'" [hidden]="false" [text]="'Action'">
                                        <ng-template #amexioBodyTmpl let-column let-row="row">
                                            <span>
                                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Remove'" (onClick)="removeSocialMedia(row)">
                                                </amexio-image>

                                            </span>
                                        </ng-template>
                                    </amexio-data-table-column>
                                </amexio-datagrid>
                            </amexio-body>
                        </amexio-card>
                    </amexio-column>
                </amexio-row>
            </amexio-tab>
        </amexio-tab-view>
    </amexio-column>
    <amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'"
        [custom]="true" (close)="isValidateForm = !isValidateForm">
        <amexio-body>
            <ol>
                <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
            </ol>
        </amexio-body>

        <amexio-action>
            <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
            </amexio-button>
        </amexio-action>
    </amexio-dialogue>
    <platform-notification></platform-notification>

</amexio-row>
   
 `
})
export class UserprofileComponent implements OnInit {
  userProfileModel: UserProfileModel;
  UserEmailModel: UserEmailModel;
  userPhoneModel: UserPhoneModel;
  userAddressModel: UserAddressModel;
  userSocialMediaModel: UserSocialMediaModel;

  personIdFlag: boolean;
  emailUUIDflag: boolean;
  phoneUUIDflag: boolean;
  socialMediaUUIDflag: boolean;
  addressUUIDflag: boolean;

  updateFlag: boolean = false;
  emailAsync: boolean = false;
  phoneAsync: boolean = false;
  addressAsync: boolean = false;
  socialAsync: boolean = false;

  emaildisableflag: boolean = false;
  phoneDisableFlag: boolean = false;
  addressDisableFlag: boolean = false;
  socialDisableFlag: boolean = false;

  userEmailData: any;
  userPhoneData: any;
  userAddressData: any;
  userSocialMediaData: any;

  selectedEmailRecords: any;
  selectedPhonesRecords: any;
  selectedSocialRecords: any;
  selectedAddressRecords: any;
  stateData: any;
  cityData: any;

  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  msgData: any[];
  emailLabel: string = 'Save';
  emailIcon: string = 'fa fa-save';
  phoneLabel: string = 'Save';
  phoneIcon: string = 'fa fa-save';
  addressLabel: string = 'Save';
  addressIcon: string = 'fa fa-save';
  socialLabel: string = 'Save';
  socialIcon: string = 'fa fa-save';

  constructor(
    private http: HttpClient,
    public _notificationService: NotificationService,
    public loaderService: LoaderService
  ) {
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

  ngOnInit() {}

  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  validateFormFields(num: number) {
    if (num == 1) {
      debugger;
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (
        this.userProfileModel.salutationId == null ||
        this.userProfileModel.salutationId == ''
      ) {
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
      if (
        this.userProfileModel.genderId == null ||
        this.userProfileModel.genderId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Gender.');
      }
    } else if (num == 2) {
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (
        this.UserEmailModel.commLabelId == null ||
        this.UserEmailModel.commLabelId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Email Type.');
      }
      if (this.UserEmailModel.emailId == '') {
        this.validationMsgArray.push('Invalid (Blank) Email Id');
      }
    } else if (num == 3) {
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (
        this.userPhoneModel.commLabelId == null ||
        this.userPhoneModel.commLabelId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Phone Number Type.');
      }
      if (this.userPhoneModel.phoneNumber == null) {
        this.validationMsgArray.push('Invalid (Blank) Phone Number');
      } else {
        this.validateMobileNumber();
      }
    } else if (num == 4) {
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (
        this.userSocialMediaModel.socialMediaTypeId == null ||
        this.userSocialMediaModel.socialMediaTypeId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Social Media Type.');
      }
      if (this.userSocialMediaModel.socialMediaId == '') {
        this.validationMsgArray.push('Invalid (Blank) Social Media');
      }
    } else if (num == 5) {
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (this.userAddressModel.addressLabel == '') {
        this.validationMsgArray.push('Invalid (Blank)Address Label ');
      }
      if (this.userAddressModel.address1 == '') {
        this.validationMsgArray.push('Invalid (Blank) Address Line1');
      }
      if (
        this.userAddressModel.countryId == null ||
        this.userAddressModel.countryId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Country');
      }
      if (
        this.userAddressModel.stateId == null ||
        this.userAddressModel.stateId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) State');
      }
      if (this.userAddressModel.cityName == '') {
        this.validationMsgArray.push('Invalid (Blank) City Name');
      }
      if (this.userAddressModel.zipCode == '') {
        this.validationMsgArray.push('Invalid (Blank) Zipcode');
      } else {
        this.validateZipcode();
      }
    }
  }
  validateMobileNumber() {
    let number = this.userPhoneModel.phoneNumber;
    let numberStr = number + '';
    if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
      this.validationMsgArray.push(
        'Phone Number must be  7 to 15 digits, country code may required'
      );
    }
  }
  validateZipcode() {
    let zipcode = this.userAddressModel.zipCode;
    let zipcodeStr = zipcode + '';
    if ((zipcodeStr && zipcodeStr.length < 4) || zipcodeStr.length > 10) {
      this.validationMsgArray.push('Zipcode must be  4 to 10 digits');
    }
  }

  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  setSelectedGender(data: any) {}
  getUserProfileData() {
    let profileDetails: any;
    this.userProfileModel = new UserProfileModel();
    this.http.get('/api/user/person/findPersonDetails').subscribe(
      response => {
        profileDetails = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (profileDetails.success) {
          this.userProfileModel = profileDetails.response;
          this.userEmailData = profileDetails.response.emails;
          this.userPhoneData = profileDetails.response.phones;
          this.userSocialMediaData = profileDetails.response.socialMedias;
          this.userAddressData = profileDetails.response.personAddresses;
        } else {
          this.validationMsgArray.push(profileDetails.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }
  updateClick() {
    debugger;
    this.validateFormFields(1);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.onUpdateProfile();
    }
  }

  //To Reset Updated Person Data
  cancelClick() {
    this.userProfileModel = new UserProfileModel();
    this.getUserProfileData();
  }

  onUpdateProfile() {
    this.updateFlag = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let userDataResponse: any;
    const requestJson = this.userProfileModel;
    this.http.post('/api/user/person/updateUser', requestJson).subscribe(
      res => {
        userDataResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.updateFlag = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (userDataResponse.success) {
          this._notificationService.setSuccessData(userDataResponse.successMessage);
          this.updateFlag = false;
          this.loaderService.hideLoader();
        } else {
          this.validationMsgArray.push(userDataResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.updateFlag = false;
          this.loaderService.hideLoader();
        }
      }
    );
  }

  addEmail() {
    this.validateFormFields(2);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      this.createInvalidCompErrorData();
      // return;
    } else {
      // this.isValidateForm = false;
      this.saveEmail();
    }
  }
  saveEmail() {
    if (!this.UserEmailModel.emailUUID || this.UserEmailModel.emailId == '') {
      this.emailAsync = true;
      this.msgData = [];
      this.loaderService.showLoader();
      let emailResponse: any;
      const requestJson = {
        emailId: this.UserEmailModel.emailId,
        commLabelId: this.UserEmailModel.commLabelId
      };

      this.http.post('/api/user/email/save', requestJson).subscribe(
        res => {
          emailResponse = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.emailAsync = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (emailResponse.success) {
            this._notificationService.setSuccessData(emailResponse.successMessage);
            this.resetEmails();
            this.reLoadEmailsData();
            this.emailAsync = false;
            this.loaderService.hideLoader();
          } else {
            this.validationMsgArray.push(emailResponse.errorMessage);
            // this.isValidateForm = true;
            this.emailAsync = false;
            this.loaderService.hideLoader();
            emailResponse.errors.forEach((error: any, index: any) => {
              this.validationMsgArray.push(error);
            });
            this.createErrorData();
          }
        }
      );
    } else if (this.UserEmailModel.emailUUID) {
      this.updateEmail();
    }
  }
  resetEmails() {
    this.UserEmailModel = new UserEmailModel();
  }

  onEmailsRowSelect(data: any) {
    this.emaildisableflag = true;
    this.selectedEmailRecords = data;
    this.UserEmailModel.emailId = this.selectedEmailRecords.emailId;
    this.UserEmailModel.commLabelId = this.selectedEmailRecords.commLabelId;
    this.UserEmailModel.emailUUID = this.selectedEmailRecords.emailUUID;
    this.emailLabel = 'Update';
    this.emailIcon = 'fa fa-pencil';
  }
  updateEmail() {
    this.validateFormFields(2);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.emailUpdate();
    }
  }
  emailUpdate() {
    this.emailAsync = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let emailDetailsResponse: any;
    const requestJson = this.UserEmailModel;

    this.http.post('/api/user/email/update', requestJson).subscribe(
      res => {
        emailDetailsResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.emailAsync = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (emailDetailsResponse.success) {
          this._notificationService.setSuccessData(emailDetailsResponse.successMessage);
          this.resetEmails();
          this.reLoadEmailsData();
          this.emaildisableflag = false;
          this.emailAsync = false;
          this.loaderService.hideLoader();
          this.emailLabel = 'Save';
          this.emailIcon = 'fa fa-save';
        } else {
          this.validationMsgArray.push(emailDetailsResponse.errorMessage);
          // this.isValidateForm = true;
          this.emailAsync = false;
          this.loaderService.hideLoader();
          emailDetailsResponse.errors.forEach((error: any, index: any) => {
            this.validationMsgArray.push(error);
          });
          this.createErrorData();
        }
      }
    );
  }

  removeEmail(row: any) {
    let emailResponse: any;
    this.msgData = [];
    const emailUUID = row.emailUUID;
    this.http.delete('/api/user/email/delete?emailUUID=' + emailUUID).subscribe(
      res => {
        emailResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (emailResponse.success) {
          this._notificationService.setSuccessData(emailResponse.successMessage);
          this.resetEmails();
          this.reLoadEmailsData();
          this.emaildisableflag = false;
          this.emailLabel = 'Save';
          this.emailIcon = 'fa fa-save';
        } else {
          this.validationMsgArray.push(emailResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  reLoadEmailsData() {
    let emailsData: any;
    this.http.get('/api/user/email/findEmailDetails').subscribe(
      response => {
        emailsData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (emailsData.success) {
          this.userEmailData = emailsData.response;
        }
      }
    );
  }

  addContact() {
    this.validateFormFields(3);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.saveContact();
    }
  }
  saveContact() {
    if (!this.userPhoneModel.phoneUUID || this.userPhoneModel.phoneUUID == '') {
      this.phoneAsync = true;
      this.msgData = [];
      this.loaderService.showLoader();
      let phoneresponse: any;
      const requestJson = {
        phoneNumber: this.userPhoneModel.phoneNumber,
        commLabelId: this.userPhoneModel.commLabelId
      };

      this.http.post('/api/user/phone/save', requestJson).subscribe(
        res => {
          phoneresponse = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.phoneAsync = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (phoneresponse.success) {
            this.phoneAsync = false;
            this.loaderService.hideLoader();
            this._notificationService.setSuccessData(phoneresponse.successMessage);
            this.resetContacts();
            this.reloadPhoneData();
          } else {
            this.validationMsgArray.push(phoneresponse.errorMessage);
            // this.isValidateForm = true;
            this.phoneAsync = false;
            this.loaderService.hideLoader();
            phoneresponse.errors.forEach((error: any, index: any) => {
              this.validationMsgArray.push(error);
            });
            this.createErrorData();
          }
        }
      );
    } else if (this.userPhoneModel.phoneUUID) {
      this.updateContact();
    }
  }

  resetContacts() {
    this.userPhoneModel = new UserPhoneModel();
  }
  onPhonesRowSelect(data: any) {
    this.phoneDisableFlag = true;
    this.selectedPhonesRecords = data;
    this.userPhoneModel.phoneNumber = this.selectedPhonesRecords.phoneNumber;
    this.userPhoneModel.commLabelId = this.selectedPhonesRecords.commLabelId;
    this.userPhoneModel.phoneUUID = this.selectedPhonesRecords.phoneUUID;
    this.phoneLabel = 'Update';
    this.phoneIcon = 'fa fa-pencil';
  }
  updateContact() {
    this.validateFormFields(3);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.contactUpdate();
    }
  }
  contactUpdate() {
    this.phoneAsync = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let phoneDetailsResponse: any;
    const requestJson = this.userPhoneModel;
    this.http.post('/api/user/phone/update', requestJson).subscribe(
      res => {
        phoneDetailsResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.phoneAsync = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (phoneDetailsResponse.success) {
          this._notificationService.setSuccessData(phoneDetailsResponse.successMessage);
          this.phoneAsync = false;
          this.loaderService.hideLoader();
          this.phoneDisableFlag = false;
          this.resetContacts();
          this.reloadPhoneData();
          this.phoneLabel = 'Save';
          this.phoneIcon = 'fa fa-save';
        } else {
          this.validationMsgArray.push(phoneDetailsResponse.errorMessage);
          this.isValidateForm = true;
          this.phoneAsync = false;
          this.loaderService.hideLoader();
          phoneDetailsResponse.errors.forEach((error: any, index: any) => {
            this.validationMsgArray.push(error);
          });
          this.createErrorData();
        }
      }
    );
  }

  removeContact(row: any) {
    let phoneResponse: any;
    this.msgData = [];
    const phoneUUID = row.phoneUUID;
    this.http.delete('/api/user/phone/delete?phoneUUID=' + phoneUUID).subscribe(
      res => {
        phoneResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (phoneResponse.success) {
          this._notificationService.setSuccessData(phoneResponse.successMessage);
          this.phoneDisableFlag = false;
          this.resetContacts();
          this.reloadPhoneData();
          this.phoneLabel = 'Save';
          this.phoneIcon = 'fa fa-save';
        } else {
          this.validationMsgArray.push(phoneResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  reloadPhoneData() {
    let phoneresponse: any;
    this.http.get('/api/user/phone/findPhoneDetails').subscribe(
      res => {
        phoneresponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (phoneresponse.success) {
          this.userPhoneData = phoneresponse.response;
        }
      }
    );
  }

  addSocialMedia() {
    this.validateFormFields(4);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.saveSocialMedia();
    }
  }
  saveSocialMedia() {
    if (
      !this.userSocialMediaModel.socialMediaUUID ||
      this.userSocialMediaModel.socialMediaUUID == ''
    ) {
      this.socialAsync = true;
      this.msgData = [];
      this.loaderService.showLoader();
      let response: any;
      const requestJson = {
        socialMediaId: this.userSocialMediaModel.socialMediaId,
        socialMediaTypeId: this.userSocialMediaModel.socialMediaTypeId
      };
      this.http.post('/api/user/socialmedia/save', requestJson).subscribe(
        res => {
          response = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.socialAsync = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (response.success) {
            this.socialAsync = false;
            this.loaderService.hideLoader();
            this._notificationService.setSuccessData(response.successMessage);
            this.resetSocialMedia();
            this.reloadSocialMediaData();
          } else {
            this.socialAsync = false;
            this.loaderService.hideLoader();
            this.validationMsgArray.push(response.errorMessage);
            // this.isValidateForm = true;
            response.errors.forEach((error: any, index: any) => {
              this.validationMsgArray.push(error);
            });
            this.createErrorData();
          }
        }
      );
    } else if (this.userSocialMediaModel.socialMediaUUID) {
      this.updateSocialMedia();
    }
  }

  resetSocialMedia() {
    this.userSocialMediaModel = new UserSocialMediaModel();
  }

  onSocialRowSelect(data: any) {
    this.socialDisableFlag = true;
    this.selectedSocialRecords = data;
    this.userSocialMediaModel.socialMediaId = this.selectedSocialRecords.socialMediaId;
    this.userSocialMediaModel.socialMediaTypeId = this.selectedSocialRecords.socialMediaTypeId;
    this.userSocialMediaModel.socialMediaUUID = this.selectedSocialRecords.socialMediaUUID;
    this.socialLabel = 'Update';
    this.socialIcon = 'fa fa-pencil';
  }
  updateSocialMedia() {
    this.validateFormFields(4);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.socialMediaUpdate();
    }
  }
  socialMediaUpdate() {
    this.socialAsync = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let socialResponse: any;
    const requestJson = this.userSocialMediaModel;

    this.http.post('/api/user/socialmedia/update', requestJson).subscribe(
      res => {
        socialResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.socialAsync = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (socialResponse.success) {
          this.socialAsync = false;
          this.loaderService.hideLoader();
          this.socialDisableFlag = false;
          this._notificationService.setSuccessData(socialResponse.successMessage);
          this.resetSocialMedia();
          this.reloadSocialMediaData();
          this.socialLabel = 'Save';
          this.socialIcon = 'fa fa-save';
        } else {
          this.socialAsync = false;
          this.loaderService.hideLoader();
          this.validationMsgArray.push(socialResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  removeSocialMedia(row: any) {
    let socialResponse: any;
    this.msgData = [];
    const socialMediaUUID = row.socialMediaUUID;
    this.http
      .delete('/api/user/socialmedia/delete?socialMediaUUID=' + socialMediaUUID)
      .subscribe(
        res => {
          socialResponse = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (socialResponse.success) {
            this.socialDisableFlag = false;
            this._notificationService.setSuccessData(socialResponse.successMessage);
            this.resetSocialMedia();
            this.reloadSocialMediaData();
            this.socialLabel = 'Save';
            this.socialIcon = 'fa fa-save';
          } else {
            this.validationMsgArray.push(socialResponse.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
  }

  reloadSocialMediaData() {
    let socialMediaData: any;
    this.http.get('/api/user/socialMedia/findSocialMediaDetails').subscribe(
      res => {
        socialMediaData = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (socialMediaData.success) {
          this.userSocialMediaData = socialMediaData.response;
        }
      }
    );
  }

  onCountrySelect(data: any) {
    if (data.countryId) {
      this.getStateData(data.countryId);
    }
  }

  getStateData(countryId: any) {
    let stateResponse: any;
    this.http
      .get('/api/user/state/findByCountryId?countryId=' + countryId)
      .subscribe(
        response => {
          stateResponse = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          this.stateData = stateResponse.response;
        }
      );
  }

  addAddress() {
    this.validateFormFields(5);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.saveAddress();
    }
  }
  saveAddress() {
    if (
      !this.userAddressModel.addressUUID ||
      this.userAddressModel.addressUUID == ''
    ) {
      this.addressAsync = true;
      this.msgData = [];
      this.loaderService.showLoader();
      let addressresp: any;
      const requestJson = {
        addressLabel: this.userAddressModel.addressLabel,
        address1: this.userAddressModel.address1,
        address2: this.userAddressModel.address2,
        address3: this.userAddressModel.address3,
        countryId: this.userAddressModel.countryId,
        stateId: this.userAddressModel.stateId,
        cityName: this.userAddressModel.cityName,
        zipCode: this.userAddressModel.zipCode
      };

      this.http.post('/api/user/personaddress/save', requestJson).subscribe(
        res => {
          addressresp = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.addressAsync = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (addressresp.success) {
            this.addressAsync = false;
            this.loaderService.hideLoader();
            this.msgData.push(addressresp.successMessage);
            this._notificationService.setSuccessData(addressresp.successMessage);
            this.resetAddress();
            this.reloadAddressData();
          } else {
            this.addressAsync = false;
            this.loaderService.hideLoader();
            this.validationMsgArray.push(addressresp.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
    } else if (this.userAddressModel.addressUUID) {
      this.updateAddress();
    }
  }

  resetAddress() {
    this.userAddressModel = new UserAddressModel();
  }

  onAddressRowSelect(data: any) {
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
  }
  updateAddress() {
    this.validateFormFields(5);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.addressUpdate();
    }
  }
  addressUpdate() {
    this.addressAsync = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let addressData: any;
    const requestJson = this.userAddressModel;
    this.http.post('/api/user/personaddress/update', requestJson).subscribe(
      res => {
        addressData = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.addressAsync = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (addressData.success) {
          this.addressAsync = false;
          this.loaderService.hideLoader();
          this.addressDisableFlag = false;
          this._notificationService.setSuccessData(addressData.successMessage);
          this.resetAddress();
          this.reloadAddressData();
          this.addressLabel = 'Save';
          this.addressIcon = 'fa fa-save';
        } else {
          this.validationMsgArray.push(addressData.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.addressAsync = false;
          this.loaderService.hideLoader();
        }
      }
    );
  }

  removeAddress(row: any) {
    let addressResponse: any;
    this.msgData = [];
    const addressUUID = row.addressUUID;
    this.http
      .delete('/api/user/personaddress/delete?addressUUID=' + addressUUID)
      .subscribe(
        res => {
          addressResponse = res;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (addressResponse.success) {
            this.addressDisableFlag = false;
            this._notificationService.setSuccessData(addressResponse.successMessage);
            this.resetAddress();
            this.reloadAddressData();
            this.addressLabel = 'Save';
            this.addressIcon = 'fa fa-save';
          } else {
            this.validationMsgArray.push(addressResponse.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
  }

  reloadAddressData() {
    let addressData: any;

    this.http.get('/api/user/personaddress/findPersonAddressDetails').subscribe(
      res => {
        addressData = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (addressData.success) {
          this.userAddressData = addressData.response;
        }
      }
    );
  }
}

export class UserProfileModel {
  salutationId: any;
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: string;
  dateOfBirth: any;
  personUUID: string;
  constructor() {
    this.salutationId = null;
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.dateOfBirth = null;
    this.genderId = '';
    this.personUUID = '';
  }
}

export class UserEmailModel {
  commLabelId: string;
  emailId: string;
  emailUUID: string;

  constructor() {
    this.commLabelId = '';
    this.emailId = '';
    this.emailUUID = '';
  }
}

export class UserPhoneModel {
  commLabelId: string;
  phoneNumber: any;
  phoneUUID: string;
  constructor() {
    this.commLabelId = '';
    this.phoneNumber = null;
    this.phoneUUID = '';
  }
}

export class UserSocialMediaModel {
  socialMediaTypeId: string;
  socialMediaId: string;
  socialMediaUUID: string;

  constructor() {
    this.socialMediaTypeId = '';
    this.socialMediaId = '';
    this.socialMediaUUID = '';
  }
}
export class UserAddressModel {
  addressLabel: string;
  address1: string;
  address2: string;
  address3: string;
  countryId: string;
  stateId: string;
  cityName: string;
  zipCode: string;
  addressUUID: string;

  constructor() {
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
}
