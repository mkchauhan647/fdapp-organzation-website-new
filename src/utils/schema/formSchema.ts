import z from "zod"
import { emailField, passwordField, stringField } from "./commonschema"
import PasswordField from "@/helpers/ui/passwordField"

export const Login = z.object({
  email:emailField("Email"),
  password : passwordField("Password")
})

export const Register = z.object({
  name : stringField('Name'),
  email : emailField('email'),
  confirmPassword : passwordField("confirm password"),
  newPassword : passwordField("new password"),
})

export const EmailValidation = Login.pick({
  email : true
})

export const ChangePasswordSchema = z.object({
  oldPassword : passwordField('old password'),
  confirmPassword : passwordField('confirm password'),
  newPassword : passwordField('new password'),
})

export const ChangeProfileSchema = z.object({
  name : stringField('Name'),
})

export const ResetPasswordSchema = z.object({
  newPassword:passwordField('New Password'),
  confirmPassword : passwordField('Confirm Password')
}).refine(data => data.newPassword === data.confirmPassword,{
  message:'New password and confirm password must match',
  path:['confirmPassword']
})

export const OTP  =  z.object({
  otp : stringField('OTP',4)
})

export const ContactUs = z.object({
  name : stringField('name'),
  email : emailField('email'),
  message : stringField('message')
})