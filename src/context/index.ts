import { createSignal } from 'solid-js';

export const [transactionsListData, setTransactionsListData] = createSignal([]);
export const [bankData, setBankData] = createSignal({
    currency_eur: null,
    currency_gbp: null,
    bankNumber: null,
    currency_usd: null,
    username: null,
});
