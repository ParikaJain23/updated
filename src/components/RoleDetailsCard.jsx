const RoleDetailsCard = ({ img }) => {

return(
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6">
      <img src={img} alt="Role Icon" className="w-160 h-160 mb-4" />
    </div>
)

}

export default RoleDetailsCard;