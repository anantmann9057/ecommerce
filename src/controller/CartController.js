import pg from "pg";

const client = new pg.Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "products",
});
client.connect();
export const addToCart = async (req,res)=>{
    console.log(req.query);
    try {
      var item = req.query;
  
      var cart = await client.query(
        "insert into cart( id,title,description, thumbnail, category, price, rating, stock) values($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [
          item.id,
          item.title,
          item.description,
          item.thumbnail,
          item.category,
          item.price,
          item.rating,
          item.stock,
        ]
      );
      response = {
        status: 1,
        data: cart.rows,
        message: "product added to card successfully!",
      };
      res.json(response);
    } catch (e) {
      var response = {
        status: 0,
        data: [],
        message: `${e}`,
      };
      res.json(response);
    }
};
export const deleteFromCart = async (req,res)=>{
    console.log(req.query.id);
    try {
      var cart = await client.query("delete from cart where id = $1", [
        req.query.id,
      ]);
      var response = {
        status: 1,
        data: cart.rows,
        message: "product removec successfully!",
      };
      res.json(response);
    } catch (e) {
      res.sendStatus(500);
      res.json(e);
    }
}
export const cartItems = async (req,res)=>{
    
    try {
        var response = await client.query("select * from cart").then();
        console.log(response.rows);
        res.json(response.rows);
      } catch (e) {
        res.sendStatus(500);
        res.json(e);
      }

}