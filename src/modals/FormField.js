
export default function FormField({ label, name, value, onChange }) {

    return(
        <tr>
            <td className="label">
                <label>{label}</label>
            </td>
            <td>
                <input type="text" name={name} value={value} onChange={onChange} />      
            </td>
        </tr>
    )
}