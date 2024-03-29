import { createSignal } from 'solid-js';

export const [transactionsListData, setTransactionsListData] = createSignal([]);
export const [bankData, setBankData] = createSignal({
    balance: null,
    bankNumber: null,
    currency: null,
    username: null,
});
