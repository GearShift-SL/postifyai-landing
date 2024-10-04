import { useState } from 'react';

interface Props {
  plans: {
    id: string;
    name: string;
    monthlyPrice: number | string;
    yearlyPrice: number | string;
  }[];
  currency: {
    symbol: string;
    position: 'left' | 'right';
  };
  features: string[];
  defaultPlanId?: string;
}

const PricingCard = ({ plans, currency, features, defaultPlanId }: Props) => {
  defaultPlanId = defaultPlanId || plans[0].id;

  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);
  const [shownPrice, setShownPrice] = useState(plans.find((t) => t.id === defaultPlanId)?.yearlyPrice);

  const getPrice = (planId: string, isYearly: boolean) => {
    const plan = plans.find((t) => t.id === planId);
    if (!plan) {
      return '';
    } else {
      return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    }
  };

  const handlePlanChange = (planId: string) => {
    // Update the selected plan id
    setSelectedPlanId(planId);

    setShownPrice(getPrice(planId, isYearly));
  };

  const handleIsYearlyChange = () => {
    const newIsYearly = !isYearly;
    setIsYearly(newIsYearly);
    setShownPrice(getPrice(selectedPlanId, newIsYearly));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Yearly Toggle */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <span className={`font-semibold ${!isYearly ? 'text-blue-600' : ''}`}>Mensual</span>
        <button
          onClick={() => handleIsYearlyChange()}
          className={`w-14 h-7 flex items-center rounded-full p-1 ${isYearly ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isYearly ? 'translate-x-7' : ''}`}
          ></div>
        </button>
        <span className={`font-semibold ${isYearly ? 'text-blue-600' : ''}`}>Anual</span>
      </div>

      {/* Toggle tagline */}
      <p className="text-center mb-6 mt-4 text-muted text-md">
        <span className="font-semibold"> Ahorra 2 meses</span> al pagar anualmente
      </p>

      <div className="text-center mb-1">
        {/* Crossed price */}
        <div className="flex flex-row justify-center items-baseline">
          {isYearly && typeof getPrice(selectedPlanId, false) === 'number' && (
            <div className="relative mr-6">
              <div className="flex items-center justify-center text-center text-gray-400 text-6xl font-bold">
                <span>
                  {currency.position === 'left' && typeof shownPrice === 'number' && currency.symbol}
                  {getPrice(selectedPlanId, false)}
                  {currency.position === 'right' && typeof shownPrice === 'number' && currency.symbol}
                </span>
              </div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom right, transparent, transparent 48%, var(--aw-color-primary) 48%, var(--aw-color-primary) 52%, transparent 52%, transparent)',
                }}
              />
            </div>
          )}

          {/* Main price */}
          <span className="text-6xl font-bold">
            {/* If the price is a string don't add te currency symbol */}
            {currency.position === 'left' && typeof shownPrice === 'number' && currency.symbol}
            {shownPrice}
            {currency.position === 'right' && typeof shownPrice === 'number' && currency.symbol}
          </span>
          <span className="text-xl">
            {currency.position === 'right' &&
              typeof plans.find((t) => t.id === selectedPlanId)?.monthlyPrice === 'number' &&
              ' / mes'}
          </span>
        </div>
      </div>
      {isYearly && typeof shownPrice === 'number' && (
        <div className="text-center text-muted mb-6">
          <span>
            Una cuota anual de {currency.position === 'left' && currency.symbol}
            {shownPrice * 12}
            {currency.position === 'right' && currency.symbol}
          </span>
        </div>
      )}

      {/* Interactive pricing table */}
      <div className="relative mx-auto mt-8 max-w-sm md:mt-12 md:max-w-4xl">
        {/* Cool backgrouond */}
        <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-75 blur"></div>
        {/* Main component */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="p-6 md:px-10 md:py-9">
            <div className="grid grid-cols-1 items-center gap-y-9 md:grid-cols-[repeat(13,minmax(0,1fr))] md:gap-y-0">
              <div className="space-y-3 md:col-span-7 xl:pr-2">
                <div className="flex justify-center text-md text-muted">
                  <a className="justify-center">Precios por gestión de inmuebles</a>
                </div>
                <div role="radiogroup">
                  <div className="-space-y-px rounded-md bg-white" role="none">
                    {plans &&
                      plans.map((plan, index) => (
                        <div
                          key={plan.id}
                          className={`z-10 border-gray-200 relative space-x-3 flex cursor-pointer border p-4 focus:outline-none  ${selectedPlanId === plan.id ? 'bg-blue-100' : 'hover:bg-gray-50'} ${index === 0 ? 'rounded-tl-md rounded-tr-md' : ''} ${index === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : ''}`}
                          role="radio"
                          aria-checked={selectedPlanId === plan.id}
                          onClick={() => handlePlanChange(plan.id)}
                        >
                          {/* Radio button */}
                          <div>
                            <span
                              className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border ${selectedPlanId === plan.id ? 'border-transparent bg-gray-900' : 'border-gray-300 bg-white'}`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                            </span>
                          </div>

                          {/* Plan name */}
                          <div className="flex flex-grow flex-row justify-between space-x-3">
                            <span
                              className={`text-md block font-medium ${selectedPlanId === plan.id ? 'text-black' : 'text-gray-600'}`}
                              id="headlessui-label-:R39lb4tkp9:"
                            >
                              {plan.name}
                            </span>

                            {/* Plan price */}
                            <div>
                              <p className="text-md" id="headlessui-description-:R59lb4tkp9:">
                                <span className="text-indigo-900 font-medium">
                                  {currency.position === 'left' &&
                                    typeof getPrice(plan.id, isYearly) === 'number' &&
                                    currency.symbol}
                                  {getPrice(plan.id, isYearly)}
                                  {currency.position === 'right' &&
                                    typeof getPrice(plan.id, isYearly) === 'number' &&
                                    currency.symbol}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="col-span-1">
                <div className="hidden md:block">
                  <svg
                    className="mx-auto h-auto w-4 text-gray-300"
                    viewBox="0 0 16 172"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 11)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 46)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 81)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 116)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 151)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 18)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 53)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 88)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 123)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 158)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 25)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 60)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 95)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 130)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 165)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 32)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 67)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 102)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 137)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 172)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 39)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 74)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 109)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.83205 -0.5547 -0.5547 0.83205 15 144)"
                    ></line>
                  </svg>
                </div>
                <div className="block md:hidden">
                  <svg
                    viewBox="0 0 172 16"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-4 w-auto text-gray-300"
                  >
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
                    ></line>
                    <line
                      y1="-0.5"
                      x2="18.0278"
                      y2="-0.5"
                      transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
                    ></line>
                  </svg>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-base font-medium text-gray-900 md:col-span-5 xl:pl-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <form
              method="post"
              action="/pricing"
              data-splitbee-event="Change Plan"
              className="mt-8 flex justify-center"
            >
              <input type="hidden" name="new_plan_id" value="764007" />
              {selectedPlanId === 'custom' ? (
                <a href="/contact/" target="blank" className="btn-primary">
                  Contáctanos ✉️
                </a>
              ) : (
                <a href="/signup/" className="btn-primary">
                  Pruébalo gratis 🚀
                </a>
              )}
            </form>
            <p className="mt-2 text-center text-sm font-medium text-gray-800">Pruébalo gratis durante 7 días</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
