import { useState } from 'react'
import '../App.css'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/ui/SideBar'
import { useContent } from '../Hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import copy from 'copy-to-clipboard'
import { useParams } from 'react-router-dom'


export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);
  const { shareLink } = useParams();
  const content = useContent(shareLink);


  return (
    <div>
      <SideBar />
      <div className='p-4 ml-60 min-h-screen bg-[#e6e9ed]'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {!shareLink && (
          <div className='flex justify-end gap-4 pt-4 pr-3'>
            <Button
              onClick={() => setModalOpen(true)}
              text='Add Content'
              vairent='primary'
              size='md'
              startIcon={<PlusIcon size="md" />}
            />
            <Button
              text='Share Brain'
              vairent='secondary'
              size='md'
              startIcon={<ShareIcon size='md' />}
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                });
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert("Copied to clipboard");
                copy(shareUrl);
              }}
            />
          </div>
        )}
        <div className='flex gap-2 flex-wrap'>
          {content.map(({ type, title, link }, idx) => (
            <Card key={idx} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}


