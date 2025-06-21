import _filter from 'lodash-es/filter.js'
import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'widgets'

export interface Widget {
    name: unknown
    data: unknown
    visibility: unknown
}

export async function apiWidget(group: string, uri: string = ''): Promise<Widget[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const widgets = (await ApiMain.getInstance().callApi(`${API_PATH}`)) as any[]

    return (_filter(widgets, { group }) || []).filter(({ visibility }) => {
        const { page, negate } = visibility?.request_path || {}

        // Disable
        if (negate && (uri === page || page === '*')) {
            return false
        }

        return true
    })
}
