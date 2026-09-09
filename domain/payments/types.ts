export type PaymentMethod="pix"|"credit_card"|"debit_card"|"boleto"|"bank_debit";
export type PaymentStatus="pending"|"paid"|"failed"|"refunded"|"cancelled";
export type BillingCycle="monthly"|"quarterly"|"yearly";
export interface Customer{externalId:string;name:string;email:string;document:string}
export interface ChargeInput{customer:Customer;amountInCents:number;method:PaymentMethod;description:string;dueDate?:string;metadata?:Record<string,string>}
export interface ChargeResult{providerId:string;status:PaymentStatus;checkoutUrl?:string;pixCode?:string;barcode?:string}
export interface SubscriptionInput{customer:Customer;amountInCents:number;cycle:BillingCycle;method:PaymentMethod;description:string}
export interface SubscriptionResult{providerId:string;status:"active"|"pending";nextBillingDate:string}
/** Contrato implementado no servidor por adapters de bancos/gateways. Nunca exponha chaves no cliente. */
export interface PaymentProvider{name:string;createCharge(input:ChargeInput):Promise<ChargeResult>;createSubscription(input:SubscriptionInput):Promise<SubscriptionResult>;cancelSubscription(providerId:string):Promise<void>;refund(providerId:string,amountInCents?:number):Promise<ChargeResult>;verifyWebhook(payload:unknown,signature:string):Promise<boolean>}
