import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  return (
    <div>
      <h2>All Users</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
