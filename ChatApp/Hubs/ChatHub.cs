using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReciveMessage", "admin", $"{conn.Username} has joined");
        }
    }
}
