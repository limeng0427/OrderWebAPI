using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderWebAPI.Models
{
    public class Order
    {
        public long OrderId { get; set; }
        public string CustomerName { get; set; }
        public string DeliveryAddress { get; set; }
        public List<OrderItem> OrderItemList { get; set; }
    }
}
