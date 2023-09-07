// import { useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import { privateApi } from '@src/api/Instance'
// import { removeCookieToken } from '@src/storage/Cookie'
// import store from '@src/store/config'
// import { DELETE_TOKEN } from '@src/store/slices/authSlice'
// import { DELETE_INFO } from '@src/store/slices/infoSlice'
// import CheckAuthorization from '@src/components/CheckAuthorization'
// import { InternalAxiosRequestConfig } from 'axios'
// import { useDispatch } from 'react-redux'

// // type Props = {}

// const useAxiosInterceptor = () => {
//   // const { dispatch } = store
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const requestHandler = async (config: Promise<InternalAxiosRequestConfig | any>) => {
//     const atExpire = store.getState().accessToken.expireTime
//     const curTime = new Date().getTime()

//     if (atExpire < curTime) {
//       console.log(new Date(atExpire) + '/' + new Date(curTime))
//       removeCookieToken()
//       dispatch(DELETE_TOKEN())
//       dispatch(DELETE_INFO())
//       navigate('/login', { replace: true })
//       return console.log('at시간 만료로 스토리지 리셋')
//       // return Promise.resolve()
//     }

//     const newConfig = await CheckAuthorization(config)
//     if (newConfig === 'NoToken') {
//       // console.log(newConfig)
//       console.log('CheckAuthorization === NoToken.')
//       navigate('/login', { replace: true })
//       return alert('토큰이 존재하지 않습니다. 로그인 페이지로 이동합니다.')
//       // return Promise.resolve()
//       // return
//     } else if (newConfig === 'ExpiredToken') {
//       console.log(newConfig)
//       console.log('CheckAuthorization === ExpiredToken.')
//       navigate('/login', { replace: true })
//       return alert('토큰이 만료되어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
//       // return Promise.resolve()
//       // return
//     }
//     return newConfig
//   }

//   const requestInterceptor = privateApi.interceptors.request.use(requestHandler)

//   useEffect(() => {
//     return () => {
//       privateApi.interceptors.request.eject(requestInterceptor)
//       // customAxios.interceptors.response.eject(responseInterceptor);
//     }
//   }, [requestInterceptor])

//   // return (
//   //   <>
//   //     {modalOpen && (
//   //       <Modal
//   //         modalOpen={modalOpen}
//   //         setModalOpen={setModalOpen}
//   //         content={modalText}
//   //         isConfirm={modalIsConfirm}
//   //         navigateOption={modalNavigateOption}
//   //       />
//   //     )}
//   //   </>
//   // )
// }

// export default useAxiosInterceptor
