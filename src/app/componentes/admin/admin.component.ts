import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BaseFormComponent } from '../baseComponent';
import { MenuService } from 'src/app/servicios/menu.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CrearComponent } from '../admin/crear-usuario/crear.component';
import { EditarComponent } from '../admin/editar-usuario/editar.component';
import { Usuario } from '../../modelos/user';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseFormComponent implements OnInit {

  usuarios: Usuario[] = null;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private us: UsuarioService,
    private m: MenuService,
    public dialog: MatDialog
  ) {
    super();
    this.m.titulo = "Administrar Usuarios"

  }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios() {
    this.loanding = true;
    this.us.consultarUsuarios()
      .subscribe(req => {
        this.usuarios = req;
        this.loanding = false;

        this.dataSource = new MatTableDataSource(req);
        this.dataSource.paginator = this.paginator;

      }, error => {
        this.loanding = false;
        this.error(error);
      }
      )

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editar(guid: string) {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '400px',
      data: guid
    });

    dialogRef.afterClosed().subscribe((result: Usuario) => {
      if (result != null) {
        this.consultarUsuarios();
        //const i = this.usuarios.findIndex(_item => _item.guid === guid);
        //this.usuarios[i] = result;
        this.table.renderRows();
      }
    });
  }

  bloquear(guid: string) {
    this.us.bloquearUsuario(guid)
      .subscribe(result => {
        this.loanding = false;
        //const i = this.usuarios.findIndex(_item => _item.guid === guid);
        //this.usuarios[i] = result;
        
        this.consultarUsuarios();
        this.table.renderRows();
      }, error => {
        this.loanding = false;
        this.error(error);
      }
      )

  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearComponent, {
      width: '400px',
      data: { correo: '', guid: '', usuario: '', bloquedo: '', }
    });

    dialogRef.afterClosed().subscribe((result: Usuario) => {
      if (result != null) {
        this.consultarUsuarios();
        //this.usuarios.push(result);
        this.table.renderRows();
      }
    });
  }
}
