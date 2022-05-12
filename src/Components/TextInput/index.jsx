import './styles.css'

export const TextInput = ({searchValue, handleChange}) => {
    return (
        <input 
        type="search" 
        onChange={handleChange} 
        value={searchValue}
        placeholder='Digite sua busca'
        />
    )
}