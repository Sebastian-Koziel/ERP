import { Form } from 'react-router-dom'
import './AddNewStage.css'

function AddNewStage() {
  
  return (
    <section>
    <div>
    <Form method='post'>
      <input type="text" name="name"/> 
      <button type="submit">ADD</button>
    </Form>

    </div>
    </section>
  )
}

export default AddNewStage

export async function action({request, params}) {
  const data = await request.formData();
  console.log(`in action`)
  const eventData = {
    name: data.get('name')
  }

  const response = await fetch('http://localhost:5000/stage/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
}