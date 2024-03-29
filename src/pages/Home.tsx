import { Component, For, createSignal, onMount } from 'solid-js';
import PageWrapper from 'src/components/PageWrapper';
import { banksList, verify_url } from 'src/staticData';
import axios from 'axios';
import { setTransactionsListData, setBankData } from '../context';
import { useNavigate } from '@solidjs/router';
import BounceText from '../components/BounceText';
import toast from 'solid-toast';

const Home: Component = () => {
  const [bank, setBank] = createSignal(-1);
  const navigate = useNavigate();

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('token');

    if (queryParam) {
      localStorage.setItem('token', queryParam);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!banksList[bank()]) {
        toast.error('Please select bank to get data.');
        return;
      }
      const token = localStorage.getItem('token');
      const response = await axios.post(`${verify_url}/auth/verify_user`, { token: token });
      if (response.data.message !== 'success') {
        toast.error('Incorrect token for Open Banking.');
        return;
      }

      const formData = new FormData(event.target);

      const username = formData.get('username');
      const password = formData.get('password');

      await axios
        .post(`${banksList[bank()].url}${banksList[bank()].login}`, {
          username: username,
          password: password,
        })
        .then(async (response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            const user = {
              username: response.data.username,
              bankNumber: response.data.bankNumber,
              balance: response.data.balance,
              currency: response.data.currency,
            };
            setBankData(user);
            const response_tran = await axios.get(
              `${banksList[bank()].url}${banksList[bank()].transactions}?userID=${
                response.data.id
              }`,
            );
            const transactions_temp = response_tran.data.data;
            setTransactionsListData(transactions_temp);
            navigate('/data', { replace: true });
          }
        });
    } catch (e) {
      console.log(e);
      toast.error('Failed to get data.');
    }
  };

  return (
    <PageWrapper>
      <div class="flex h-full w-full  flex-col sm:flex-row">
        <div class="flex w-full items-center  justify-center sm:w-1/2">
          <div class="w-full">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div class="my-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  <BounceText initialDelay={0.1} text="Banks List" class="" />
                </h2>
              </div>
              <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <For each={banksList}>
                  {(each, key) => (
                    <div onClick={() => (bank() === key() ? setBank(-1) : setBank(key))}>
                      <div
                        class={`aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200
                         ${bank() === key() && 'border-2 border-gray-600 shadow-lg shadow-black'}`}
                      >
                        <img
                          src={each.image || 'src/assets/default_bank.png'}
                          alt="Bank Image"
                          class="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <p class="mt-4 text-center text-lg font-medium text-gray-900">{each.title}</p>
                      <h3 class="mt-1 text-center text-sm text-gray-700">{each.url}</h3>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
        <div class="flex h-full  w-full justify-center sm:w-1/2">
          <div class="flex min-h-full w-4/5 flex-col justify-center px-3 py-12 lg:px-4">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <BounceText initialDelay={0.1} text="Sign into the banks" class="" />
              </h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form class="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label for="username" class="block text-sm font-medium leading-6 text-gray-900">
                    <BounceText initialDelay={0.1} text="User Name" class="" />
                  </label>
                  <div class="mt-2">
                    <input
                      id="username"
                      name="username"
                      required
                      class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                      <BounceText initialDelay={0.1} text="Password" class="" />
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <BounceText initialDelay={0.1} text="Credential Info" class="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
