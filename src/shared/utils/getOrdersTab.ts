import { TOrderStatusKeys } from "../types/types";

const getOrdersTab = (value: TOrderStatusKeys) => {
    switch(value) {
        case 'pending':
            return {}
    }
}

export default getOrdersTab;