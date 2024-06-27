export const Template = Symbol('Template').valueOf();
export interface Template
{
    getWelcomeTemplate(userFirstName: string, userLastName: string, locale: 'en' | 'fa'): string;
    getVerifyEMailTemplate(token: string, mail: string, ip: string, locale: 'en' | 'fa'): string;
    getChangingMailTemplate(token: string, mail: string, ip: string, locale: 'en' | 'fa'): string;
    getForgotPasswordTemplate(token: string, mail: string, ip: string, locale: 'en' | 'fa'): string;
    getYouHaveChangeMailTemplate(latterMail: string, ip: string, changedDate: Date, locale: 'en' | 'fa'): string;
}
