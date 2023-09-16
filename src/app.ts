import Express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import appRouter from "./routes/app.routes";

const app = Express();

app.use(json());
app.use(cors());
app.use(appRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
