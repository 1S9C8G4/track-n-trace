import '../styles/normalize.css'
import skeleton from  '../styles/skeleton.css'
import custom from  '../styles/custom.css'

export default (names) =>  {
  return names.split(' ').map(name => 
    skeleton[name] || custom[name]
  ).join(' ')
}
