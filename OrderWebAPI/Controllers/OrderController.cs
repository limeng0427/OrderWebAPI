using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OrderWebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderContext _context;

        public OrderController(OrderContext context)
        {
            _context = context;

            if (_context.Orders.Count() == 0)
            {
                // Create a new order if collection is empty,
                // which means you can't delete all orders.
                _context.Orders.Add(new Order { CustomerName = "Vocus Group", DeliveryAddress = "34 Sale St, Auckland 1010" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Order>> GetAll()
        {
            return _context.Orders.ToList();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public ActionResult<Order> GetById(long id)
        {
            var item = _context.Orders.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public IActionResult Create(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();

            return CreatedAtRoute("GetOrder", new { id = order.OrderId }, order);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, Order order)
        {
            var orderBase = _context.Orders.Find(id);
            if (orderBase == null)
            {
                return NotFound();
            }

            orderBase.CustomerName = order.CustomerName;
            orderBase.DeliveryAddress = order.DeliveryAddress;
            orderBase.OrderItemList = order.OrderItemList;
            _context.Orders.Update(orderBase);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var order = _context.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
