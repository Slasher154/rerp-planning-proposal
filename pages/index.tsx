import {Fragment} from 'react'
import {NextPage} from 'next'
import Link from 'next/link'

const HomePage: NextPage = () => {
  return <Fragment>
      <Link href="/projects/add">เพิ่ม Project</Link>
    </Fragment>
}

export default HomePage