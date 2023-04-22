import { Form } from 'react-router-dom'

function TopBar() {
  
  return (
    <section>
        <div>
     Top bar section 
        
    
      <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
      
    
    </div>
    </section>
  )
}

export default TopBar