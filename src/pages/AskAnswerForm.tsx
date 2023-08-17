import HelpNAskForm from '@src/components/HelpNAskForm'
import { useLocation } from 'react-router'

const AskAnswerForm = () => {
  const location = useLocation()
  return <HelpNAskForm type="ask" questionId={location.state} />
}

export default AskAnswerForm
