import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'contacts'

export type EstimateData = {
    subject: string
    name: string
    message: string
    email: string
    phone: string
    email_template_key: string

    params: {
        gia_xe: number
        tai_trong: number
        noi_dang_ky: number
        muc_phi: number
        thanh_tien: number
        phi_dang_kiem: number
        bao_hiem: number
        phi_duong_bo: number
        phi_hop_dong: number
        phi_phu_hieu: number
        tong_chi_phi: number
    }
}

export async function apiEstimatePrice(body: EstimateData): Promise<boolean> {
    return (await ApiMain.getInstance().postApi(`${API_PATH}`, body)) || {}
}

export type InstallmentPaymentData = {
    subject: string
    name: string
    message: string
    email: string
    phone: string
    email_template_key: string
    down_payment: number
    interest_rate: number
    loan_term: number
    params: {
        html: string
    }
}
