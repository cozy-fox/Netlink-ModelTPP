import { Component, For } from 'solid-js';
import BounceText from '../components/BounceText';
import PageWrapper from '../components/PageWrapper';
import { transactionsListData, bankData } from '../context';
import { FaSolidArrowLeftLong, FaSolidArrowRightLong } from 'solid-icons/fa';

const bankDataFormat = [
  {
    title: 'Full Name',
    data_id: 'username',
  },
  {
    title: 'Bank Number',
    data_id: 'bankNumber',
  },
  {
    title: 'Currency',
    data_id: 'currency',
  },
  {
    title: 'Balance',
    data_id: 'balance',
  },
];

const Page1: Component = () => {
  return (
    <PageWrapper>
      <div class="flex h-full w-full  flex-col sm:flex-row">
        <div class="flex w-full items-center  justify-center sm:w-1/2">
          <div class="flex min-h-full w-4/5 flex-col justify-center px-3 py-12 lg:px-4">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <BounceText
                initialDelay={0.1}
                text=" Bank Information"
                class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"
              />
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form class="space-y-6">
                <For each={bankDataFormat}>
                  {(each) => (
                    <div>
                      <BounceText
                        initialDelay={0.2}
                        text={each.title}
                        class="text-md block font-bold leading-6 text-gray-900"
                      />
                      <div class="mt-2">
                        <input
                          id={each.data_id + 'forData'}
                          name={each.data_id}
                          value={bankData()[each.data_id]}
                          required
                          readOnly
                          class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                        />
                      </div>
                    </div>
                  )}
                </For>
              </form>
            </div>
          </div>
        </div>
        <div class="flex h-full  w-full justify-center sm:w-1/2">
          <div class="w-full">
            <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div class="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <BounceText
                  initialDelay={0.1}
                  text="Transactions"
                  class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"
                />
              </div>
              <For each={transactionsListData()}>
                {(each, key) => (
                  <div
                    class={`my-2 flex w-full ${
                      each.sender == bankData().bankNumber ? 'text-green-500' : 'text-red-500'
                    }`}
                    key={key}
                  >
                    <div class="w-1/6">
                      {each.sender == bankData().bankNumber ? (
                        <FaSolidArrowRightLong />
                      ) : (
                        <FaSolidArrowLeftLong />
                      )}
                    </div>

                    <div class="w-1/2">
                      <BounceText
                        initialDelay={0.1}
                        text={each.sender == bankData().bankNumber ? each.receiver : each.sender}
                        class=""
                      />
                    </div>
                    <div class="w-1/6">
                      <BounceText initialDelay={0.25} text={String(each.amount)} class="" />
                    </div>
                    <div class="w-1/6">
                      {' '}
                      <BounceText initialDelay={0.31} text={each.currency} class="" />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page1;
