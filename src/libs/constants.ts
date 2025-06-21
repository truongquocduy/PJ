import type { LicenseQuestion } from '~/types/master'

// App
export const APP_DEFAULT_LANGUAGE = 'en'

// Widgets
export const WIDGET_MAIN_MENU = 'main_menu'
export const WIDGET_BEFORE_CONTENT = 'before_content'
export const WIDGET_AFTER_CONTENT = 'after_content'
export const WIDGET_BEFORE_INNER_CONTENT = 'before_inner_content'
export const WIDGET_AFTER_INNER_CONTENT = 'after_inner_content'

export const LICENSE_TYPE_OPTIONS = [
    {
        key: 'A1_2025',
        text: 'Hạng A1',
        description: 'Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW',
        condition: (question: LicenseQuestion) => question.a1 > 0,
    },

    {
        key: 'A_2025',
        text: 'Hạng A',
        description: 'Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW và các loại xe quy định cho giấy phép lái xe hạng A1',
        condition: (question: LicenseQuestion) => question.a2 > 0,
    },

    {
        key: 'B1_2025',
        text: 'Hạng B1',
        description: 'Xe mô tô ba bánh và các loại xe quy định cho giấy phép lái xe hạng A1',
        condition: (question: LicenseQuestion) => question.a34 > 0,
    },

    {
        key: 'B_2025',
        text: 'Hạng B',
        description: 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe hạng B',
        condition: () => true,
    },

    {
        key: 'C1_2025',
        text: 'Hạng C1',
        description: 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe hạng B',
        condition: () => true,
    },

    {
        key: 'C_2025',
        text: 'Hạng C',
        description: 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe hạng B và hạng C1',
        condition: () => true,
    },

    {
        key: 'D1_2025',
        text: 'Hạng D1',
        description: 'Xe ô tô chở người trên 08 chỗ (không kể chỗ của người lái xe) đến 16 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe các hạng B, C1, C',
        condition: () => true,
    },

    {
        key: 'D2_2025',
        text: 'Hạng D2',
        description: 'Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe các hạng B, C1, C, D1',
        condition: () => true,
    },

    {
        key: 'D_2025',
        text: 'Hạng D',
        description: 'Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm; các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg; các loại xe quy định cho giấy phép lái xe các hạng B, C1, C, D1, D2',
        condition: () => true,
    },

    {
        key: 'BE_2025',
        text: 'Hạng BE',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg',
        condition: () => true,
    },

    {
        key: 'C1E_2025',
        text: 'Hạng C1E',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg',
        condition: () => true,
    },

    {
        key: 'CE_2025',
        text: 'Hạng CE',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc',
        condition: () => true,
    },

    {
        key: 'D1E_2025',
        text: 'Hạng D1E',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg',
        condition: () => true,
    },

    {
        key: 'D2E_2025',
        text: 'Hạng D2E',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg',
        condition: () => true,
    },

    {
        key: 'DE_2025',
        text: 'Hạng DE',
        description: 'Xe ô tô quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô chở khách nối toa',
        condition: () => true,
    },
]

export const LEARNING_OPTIONS = [
    {
        key: 1,
        icon: 'i-tabler-certificate',
        text: 'Học lý thuyết',
    },

    {
        key: 2,
        icon: 'i-tabler-devices-question',
        text: 'Thi sát hạch',
    },

    {
        key: 3,
        icon: 'i-tabler-directions',
        text: 'Biển báo đường bộ',
    },

    {
        key: 4,
        icon: 'i-tabler-report-analytics',
        text: 'Mẹo thi kết quả cao',
    },

    {
        key: 5,
        icon: 'i-tabler-gavel',
        text: 'Tra cứu luật nhanh',
    },

    {
        key: 6,
        icon: 'i-tabler-bug',
        text: 'Các câu bạn hay sai',
    },
]
