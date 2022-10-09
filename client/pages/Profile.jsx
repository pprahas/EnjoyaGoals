import { LockClosedIcon } from "@heroicons/react/20/solid";
import Input from "../components/Input";

export default function Profile() {

  return (
    <>
      {/* component */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center z-0">
                    <div className="relative">
                      <img
                        alt="..."
                        src="pfp.png"
                        className="bg-indigo-300 rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px ring-4 ring-white dark:ring-black"
                      />
                    </div>
                    <span class="mt-14 leading-none items-center justify-center text-center flex inset-x-0 w-12 h-12 lg:-ml-3  bg-white 
                    border-4 border-indigo-300 dark:border-gray-800 rounded-full z-10 text-blueGray-500 font-bold uppercase">
                      Lv.<br></br>34</span>

                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        {"{"}Room Name{"}"}
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          3
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Easy
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Medium
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Hard
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {/**    
                   * <a class="flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800" href="#">+99</a> */}
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Firstname Lastname
                  </h3>
                  <div>
                    <input className="mb-2 text-center text-blueGray-300"
                      placeholder="FirstLast@email.com">
                    </input>
                  </div>
                  <div>
                    <input className="mb-2 text-center text-blueGray-300"
                      placeholder="XXX-XXX-XXXX">
                    </input>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-green-600">
                        Completed:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        102
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        Total Points:
                      </span>
                      <span className="text-lg font-bold text-blueGray-400">
                        34985
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-red-600">
                        Pending:
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        98
                      </span>
                    </div>
                      {/*
                    <div className="w-full lg:w-9/12 px-4">

                    
                      <ul className="mt-1 text-lg leading-relaxed text-blueGray-700">
                        {list.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                     
                    </div>
                     */}
                  </div>
                  <div className="mt-10 py-4 border-t border-blueGray-200 text-center">

                  </div>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="About me..."
                      defaultValue={""}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
         
        </section>
      </main>
    </>
  );
}
