// Package trino contains trino driver registration for xk6-sql.
package trino

import (
	"github.com/grafana/xk6-sql/sql"

	// Blank import required for initialization of driver.
	_ "github.com/trinodb/trino-go-client/trino"
)

func init() {
	sql.RegisterModule("trino")
}
