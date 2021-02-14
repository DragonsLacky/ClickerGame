import {
    TInput,
    TTextarea,
    TSelect,
    TRadio,
    TCheckbox,
    TButton,
    TInputGroup,
    TCard,
    TAlert,
    TModal,
    TDropdown,
    TRichSelect,
    TPagination,
    TTag,
    TRadioGroup,
    TCheckboxGroup,
    TTable,
    TDatepicker,
    TToggle,
    TDialog,
  } from 'vue-tailwind/dist/components';
  
  
//   const  components = {
    
//   }

export default {
    't-input1': {
        component: TInput,
        props: {
          classes: 'border-2 block focus:ring-2 rounded-lg shadow-md p-1 focus:border-indigo-300 text-sm text-gray-800'
        }
      },
      't-input': {
        component: TInput,
        props: {
          fixedClasses: 'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
          classes: 'text-black placeholder-gray-400 border-indigo-200 bg-white border-gray-300 focus:border-indigo-300 ',
          variants: {
            danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-500',
            success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-500'
          }
        }
      },
      't-textarea': {
        component: TTextarea,
        props: {
          classes: 'border-2 block w-full rounded text-gray-800'
        }
      },
      't-select': {
        component: TSelect,
        props: {
          classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-radio': {
        component: TRadio,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-checkbox': {
        component: TCheckbox,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-button': {
        component: TButton,
        props: {
            fixedClasses: 'block px-4 py-2 select-none transition duration-100 ease-in-out focus:border-indigo-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gray-500 disabled:bg-gray-500',
          classes: 'text-white bg-indigo-500 border border-transparent shadow-sm rounded-xl hover:bg-indigo-600',
            variants: {
                secondary: 'text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600 focus:ring-opacity-50',
                error: 'text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600 focus:ring-opacity-50',
                success: 'text-white bg-green-500 border border-transparent rounded shadow-sm focus:ring-opacity-50 hover:bg-green-600',
                link: 'text-blue-500 underline hover:text-blue-600 focus:ring-opacity-50',
                tabmenu: 'text-white bg-indigo-400 border border-transparent focus:border-none focus:ring-none shadow-sm rounded-md focus:ring-opacity-0 hover:bg-indigo-500',
                dissabled: 'text-white bg-gray-500 border border-transparent focus:border-none focus:ring-none shadow-sm rounded-md focus:ring-opacity-0 hover:bg-gray-500'
            }
        }
    },
    't-input-group': {
        component: TInputGroup,
        props: {
            fixedClasses: {
                wrapper: '',
                label: 'block',
                body: '',
                feedback: ' text-sm text-sm',
                description: 'text-gray-400 text-sm'
            },
            classes: {
                wrapper: '',
                label: '',
                body: '',
                feedback: 'text-gray-400',
                description: 'text-gray-400'
            },
            variants: {
                danger: {
                label: 'text-red-500',
                feedback: 'text-red-500'
                },
                success: {
                label: 'text-green-500',
                feedback: 'text-green-500'
                }
            }
        }
    },
    't-card': {
        component: TCard,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-alert': {
        component: TAlert,
        props: {
            fixedClasses: {
                wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
                body: 'flex-grow',
                close: 'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                closeIcon: 'fill-current h-4 w-4'
            },
            classes: {
                wrapper: 'bg-blue-50 border-blue-500',
                body: 'text-blue-700',
                close: 'text-blue-500 hover:bg-blue-200'
            },
            variants: {
                danger: {
                wrapper: 'bg-red-50 border-red-500',
                body: 'text-red-700',
                close: 'text-red-500 hover:bg-red-200'
                },
                success: {
                wrapper: 'bg-green-50 border-green-500',
                body: 'text-green-700',
                close: 'text-green-500 hover:bg-green-200'
                }
            }
        }
    },
    't-modal': {
        component: TModal,
        props: {
            fixedClasses: {
            overlay: 'z-40  overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50',
            wrapper: 'relative mx-auto z-50 max-w-lg px-3 py-12',
            modal: 'overflow-visible relative  rounded',
            body: 'p-3',
            header: 'border-b p-3 rounded-t',
            footer: ' p-3 rounded-b',
            close: 'flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50'
            },
            classes: {
                overlay: 'bg-black',
                wrapper: '',
                modal: 'bg-white shadow',
                body: 'p-3',
                header: 'border-gray-100',
                footer: 'bg-gray-100',
                close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                closeIcon: 'fill-current h-4 w-4',
                overlayEnterClass: '',
                overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
                overlayEnterToClass: 'opacity-100',
                overlayLeaveClass: 'transition ease-in opacity-100',
                overlayLeaveActiveClass: '',
                overlayLeaveToClass: 'opacity-0 duration-75',
                enterClass: '',
                enterActiveClass: '',
                enterToClass: '',
                leaveClass: '',
                leaveActiveClass: '',
                leaveToClass: ''
            },
            variants: {
                danger: {
                overlay: 'bg-red-100',
                header: 'border-red-50 text-red-700',
                close: 'bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border',
                modal: 'bg-white border border-red-100 shadow-lg',
                footer: 'bg-red-50'
                }
            }
        }
    
    },
    't-dropdown': {
        component: TDropdown,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-rich-select': {
        component: TRichSelect,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-pagination': {
        component: TPagination,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-tag': {
        component: TTag,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-tadio-group': {
        component: TRadioGroup,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-checkbox-group': {
        component: TCheckboxGroup,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-table': {
        component: TTable,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-datepicker': {
        component: TDatepicker,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-toggle': {
        component: TToggle,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
    't-dialog': {
        component: TDialog,
        props:{
            classes: 'border-2 block w-full rounded text-gray-800'
        }
    },
}