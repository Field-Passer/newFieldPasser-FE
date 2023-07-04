interface propsTypes {
  size: string
  color?: string
}

export const SearchIcon = (props: propsTypes) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L16.514 16.506M19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z"
        stroke={props.color ? props.color : 'black'}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const SearchToggleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5554 9.77778C15.5554 10.5142 14.9585 11.1111 14.2221 11.1111C13.4857 11.1111 12.8888 10.5142 12.8888 9.77778C12.8888 9.0414 13.4857 8.44444 14.2221 8.44444C14.9585 8.44444 15.5554 9.0414 15.5554 9.77778Z"
        stroke="black"
        strokeOpacity="0.7"
        strokeWidth="0.888889"
      />
      <line
        x1="8"
        y1="9.77778"
        x2="13.3333"
        y2="9.77778"
        stroke="black"
        strokeOpacity="0.7"
        strokeWidth="0.888889"
      />
      <path
        d="M8.44455 14.2222C8.44455 13.4858 9.04151 12.8889 9.77789 12.8889C10.5143 12.8889 11.1112 13.4858 11.1112 14.2222C11.1112 14.9586 10.5143 15.5556 9.77789 15.5556C9.04151 15.5556 8.44455 14.9586 8.44455 14.2222Z"
        stroke="black"
        strokeOpacity="0.7"
        strokeWidth="0.888889"
      />
      <line
        x1="16"
        y1="14.2222"
        x2="10.6667"
        y2="14.2222"
        stroke="black"
        strokeOpacity="0.7"
        strokeWidth="0.888889"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E3E3E3" />
    </svg>
  )
}

export const CalendarIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V4C1.69779e-06 3.45 0.196002 2.979 0.588002 2.587C0.980002 2.195 1.45067 1.99933 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.021 2.196 17.413 2.588C17.805 2.98 18.0007 3.45067 18 4V10H16V8H2V18H9V20H2ZM19.125 15L17 12.875L17.725 12.15C17.9083 11.9667 18.1417 11.875 18.425 11.875C18.7083 11.875 18.9417 11.9667 19.125 12.15L19.85 12.875C20.0333 13.0583 20.125 13.2917 20.125 13.575C20.125 13.8583 20.0333 14.0917 19.85 14.275L19.125 15ZM11 21V18.875L16.3 13.575L18.425 15.7L13.125 21H11ZM2 6H16V4H2V6Z"
        fill="#AAAAAA"
      />
    </svg>
  )
}
